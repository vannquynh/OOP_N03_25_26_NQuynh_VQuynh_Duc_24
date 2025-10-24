package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.UngTuyen;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UngTuyenRepository extends JpaRepository<UngTuyen, Integer> {
    @Query(value = "SELECT COUNT(*) > 0 FROM ung_tuyen WHERE ma_viec_lam = :maViecLam AND user_id = :userId", nativeQuery = true)
    Object existsByMaViecLamAndUserId(Integer maViecLam, String userId);
    @Query("SELECT u FROM UngTuyen u WHERE u.user.id = :userId")
    List<UngTuyen> findByUserId(String userId);

    @Query("SELECT u FROM UngTuyen u WHERE u.viecLam.ma_viec_lam = :ma_viec_lam")
    List<UngTuyen> findAllByViecLamMaViecLam(@Param("ma_viec_lam") Integer ma_viec_lam);

    @Modifying
    @Transactional
    @Query("UPDATE UngTuyen u SET u.status = :status WHERE u.ma_ung_tuyen = :id")
    int updateStatus(@Param("id") Integer id, @Param("status") String status);
}
