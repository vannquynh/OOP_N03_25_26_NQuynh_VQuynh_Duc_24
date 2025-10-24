package com.example.WebTimViecLam.Controller;

import com.example.WebTimViecLam.Entity.Profile;
import com.example.WebTimViecLam.Reponse.ProfileDTO;
import com.example.WebTimViecLam.Service.ProfileService;
import com.example.WebTimViecLam.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/me")
    public ResponseEntity<Profile> getProfile(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token"); // Lấy token từ body

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Lấy email từ token
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        Profile profile = profileService.getProfileByEmail(email);

        if (profile == null) {
            return ResponseEntity.ok(null);
        }

        return ResponseEntity.ok(profile);
    }

    // API tạo hoặc cập nhật profile
    @PostMapping("/create-or-update")
    public ResponseEntity<Profile> createOrUpdateProfile(@RequestHeader("Authorization") String token, @RequestBody ProfileDTO profile) {
        // Lấy email từ token
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));

        Profile updatedProfile = profileService.createOrUpdateProfile(profile, email);

        return ResponseEntity.ok(updatedProfile);
    }
}
