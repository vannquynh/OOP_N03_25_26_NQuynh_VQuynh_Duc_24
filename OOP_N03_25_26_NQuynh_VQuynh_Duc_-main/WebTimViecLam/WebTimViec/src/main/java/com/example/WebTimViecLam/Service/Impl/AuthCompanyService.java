package com.example.WebTimViecLam.Service.Impl;

import com.example.WebTimViecLam.Entity.DoanhNghiep;
import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Reponse.RegisterCompanyRequest;
import com.example.WebTimViecLam.Repository.DoanhNghiepRepository;
import com.example.WebTimViecLam.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthCompanyService {

    private final UserRepository userRepo;
    private final DoanhNghiepRepository dnRepo;


    @Transactional
    public User registerCompany(RegisterCompanyRequest req) {
        // Validate cơ bản
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username đã tồn tại");
        }

        // 1) Tạo user
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        user.setRole("DOANHNGHIEP");
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setPhone(req.getPhone());
        userRepo.save(user);

        // 2) Tạo doanh nghiệp
        DoanhNghiep dn = new DoanhNghiep();
        dn.setTen_doanh_nghiep(req.getTen_doanh_nghiep());
        dn.setTinh(req.getTinh());
        dn.setDia_chi(req.getDia_chi());
        dn.setWebsite(req.getWebsite());
        dn.setQuy_mo_nhan_su(req.getQuy_mo_nhan_su());
        dn.setAvt(req.getAvt());
        dn.setGioi_thieu(req.getGioi_thieu());
        dn.setUser_id(user.getId());
        dnRepo.save(dn);

        return user; // có thể trả thêm info DN nếu muốn
    }
}