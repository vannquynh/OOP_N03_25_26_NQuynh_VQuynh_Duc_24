package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.DoanhNghiep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoanhNghiepRepository extends JpaRepository<DoanhNghiep, Integer> {
    // Nếu cần, có thể định nghĩa thêm các phương thức tìm kiếm theo tên, địa chỉ, v.v.
    @Query("SELECT d FROM DoanhNghiep d WHERE d.user_id = :userId")
    Optional<DoanhNghiep> findByUserId(String userId);
}
