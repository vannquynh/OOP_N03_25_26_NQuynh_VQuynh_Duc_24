package com.example.WebTimViecLam.Service;

import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Reponse.UserCreateRequest;
import com.example.WebTimViecLam.Reponse.UserResponse;
import com.example.WebTimViecLam.Reponse.UserUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User register(User user);
    User login(String email, String password);

    List<User> getAllUsers();

    Page<UserResponse> findAll(Pageable pageable, String keyword);
    UserResponse findById(String id);
    UserResponse create(UserCreateRequest req);
    UserResponse update(String id, UserUpdateRequest req);
    void delete(String id);
}
