package com.example.WebTimViecLam.Service.Impl;

import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Reponse.UserCreateRequest;
import com.example.WebTimViecLam.Reponse.UserResponse;
import com.example.WebTimViecLam.Reponse.UserUpdateRequest;
import com.example.WebTimViecLam.Repository.UserRepository;
import com.example.WebTimViecLam.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User register(User user) {
        // Check existing, hash password, validate
        return userRepo.save(user);
    }

    @Override
    public User login(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check hashed password match
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }

    private UserResponse map(User u) {
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setUsername(u.getUsername());
        r.setEmail(u.getEmail());
        r.setRole(u.getRole());
        r.setPhone(u.getPhone());
        r.setCreatedAt(u.getCreatedAt());
        r.setUpdatedAt(u.getUpdatedAt());
        return r;
    }

    @Override
    public Page<UserResponse> findAll(Pageable pageable, String keyword) {
        Page<User> page;
        if (keyword != null && !keyword.isBlank()) {
            // simple contains filter in memory (nhanh gọn); có thể viết query custom nếu cần
            page = userRepo.findAll(pageable)
                    .map(Function.identity());
            var filtered = page.getContent().stream().filter(u ->
                    (u.getUsername() != null && u.getUsername().toLowerCase().contains(keyword.toLowerCase())) ||
                            (u.getEmail() != null && u.getEmail().toLowerCase().contains(keyword.toLowerCase())) ||
                            (u.getPhone() != null && u.getPhone().toLowerCase().contains(keyword.toLowerCase()))
            ).toList();
            return new PageImpl<>(filtered.stream().map(this::map).toList(), pageable, filtered.size());
        } else {
            page = userRepo.findAll(pageable);
            return page.map(this::map);
        }
    }

    @Override
    public UserResponse findById(String id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User không tồn tại"));
        return map(u);
    }

    @Override
    public UserResponse create(UserCreateRequest req) {
        if (userRepo.existsByEmail(req.getEmail()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã tồn tại");
        if (userRepo.existsByUsername(req.getUsername()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username đã tồn tại");

        User u = new User();
        u.setId(UUID.randomUUID().toString());
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        u.setRole(req.getRole() != null ? req.getRole() : "USER");
        u.setPhone(req.getPhone());
        u.setCreatedAt(new Date());
        u.setUpdatedAt(new Date());

        userRepo.save(u);
        return map(u);
    }

    @Override
    public UserResponse update(String id, UserUpdateRequest req) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User không tồn tại"));

        if (req.getUsername() != null && !req.getUsername().isBlank()) {
            if (!req.getUsername().equals(u.getUsername()) && userRepo.existsByUsername(req.getUsername()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username đã tồn tại");
            u.setUsername(req.getUsername());
        }
        if (req.getEmail() != null && !req.getEmail().isBlank()) {
            if (!req.getEmail().equals(u.getEmail()) && userRepo.existsByEmail(req.getEmail()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã tồn tại");
            u.setEmail(req.getEmail());
        }
        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            u.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        }
        if (req.getRole() != null && !req.getRole().isBlank()) {
            u.setRole(req.getRole());
        }
        if (req.getPhone() != null) {
            u.setPhone(req.getPhone());
        }
        u.setUpdatedAt(new Date());

        userRepo.save(u);
        return map(u);
    }

    @Override
    public void delete(String id) {
        if (!userRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User không tồn tại");
        }
        userRepo.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
