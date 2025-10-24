package com.example.WebTimViecLam.Controller;
import com.example.WebTimViecLam.Entity.DoanhNghiep;
import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Reponse.AuthDoanhNghiep;
import com.example.WebTimViecLam.Reponse.AuthResponse;
import com.example.WebTimViecLam.Reponse.RegisterCompanyRequest;
import com.example.WebTimViecLam.Repository.DoanhNghiepRepository;
import com.example.WebTimViecLam.Repository.UserRepository;
import com.example.WebTimViecLam.Request.AuthRequest;
import com.example.WebTimViecLam.Service.Impl.AuthCompanyService;
import com.example.WebTimViecLam.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private DoanhNghiepRepository doanhNghiepRepository;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private  AuthCompanyService authCompanyService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return ResponseEntity.ok(userRepo.save(user));
    }


    @PostMapping("/register-company")
    public ResponseEntity<?> registerCompany(@RequestBody RegisterCompanyRequest req) {
        User user = authCompanyService.registerCompany(req);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!new BCryptPasswordEncoder().matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token));
    }
    @PostMapping("/login-doanhnghiep")
    public ResponseEntity<AuthDoanhNghiep> loginDoanhNghiep(@RequestBody AuthRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!new BCryptPasswordEncoder().matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Kiểm tra role doanh nghiệp
        if (!"DOANHNGHIEP".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("User is not a doanh nghiep" + user.getRole());
        }
        String token = jwtUtil.generateToken(user.getEmail());
        Optional<DoanhNghiep> doanhNghiep = doanhNghiepRepository.findByUserId(user.getId());
        return ResponseEntity.ok(new AuthDoanhNghiep(doanhNghiep.get().getMa_doanh_nghiep(), token));
    }

}