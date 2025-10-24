package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, String> {
    // Thêm các phương thức truy vấn nếu cần, ví dụ: tìm Profile theo user_id

    @Query("SELECT p FROM Profile p WHERE p.user.email = :email")
    Profile findByEmail(String email);
    Optional<Profile> findByUserId(String userId);

}

