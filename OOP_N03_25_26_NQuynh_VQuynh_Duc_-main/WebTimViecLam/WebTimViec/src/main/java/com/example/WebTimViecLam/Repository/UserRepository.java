package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByPhone(String phone);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
