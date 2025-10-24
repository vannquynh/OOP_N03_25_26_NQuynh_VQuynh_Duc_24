package com.example.WebTimViecLam.Service.Impl;

import com.example.WebTimViecLam.Entity.Profile;
import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Reponse.ProfileDTO;
import com.example.WebTimViecLam.Repository.ProfileRepository;
import com.example.WebTimViecLam.Repository.UserRepository;
import com.example.WebTimViecLam.Service.ProfileService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Profile getProfileByEmail(String email) {
        // Tìm kiếm Profile dựa trên email của người dùng
        return profileRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public Profile createOrUpdateProfile(ProfileDTO profileDTO, String email) {
        // Tìm user theo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Tìm profile theo user_id
        Optional<Profile> existingProfile = profileRepository.findByUserId(user.getId());

        Profile profile;

        if (existingProfile.isPresent()) {
            // Nếu đã có profile thì cập nhật
            profile = existingProfile.get();
        } else {
            // Nếu chưa có profile thì tạo mới
            profile = new Profile();
            profile.setId(UUID.randomUUID().toString()); // Tự tạo ID
            profile.setUser(user);
        }

        // Gán dữ liệu từ DTO vào Profile
        profile.setFullName(profileDTO.getFullName());
        profile.setProfessionalTitle(profileDTO.getProfessionalTitle());
        profile.setPhone(profileDTO.getPhone());
        profile.setLocation(profileDTO.getLocation());
        profile.setSkills(profileDTO.getSkills());
        profile.setWebsite(profileDTO.getWebsite());
        profile.setBio(profileDTO.getBio());

        return profileRepository.save(profile);
    }


}
