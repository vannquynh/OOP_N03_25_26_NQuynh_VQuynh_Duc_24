package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.ViecLam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViecLamRepository extends JpaRepository<ViecLam, Integer> {

    // Sử dụng @Query với JPQL để lấy danh sách việc làm theo mã doanh nghiệp
    @Query("SELECT v FROM ViecLam v WHERE v.doanhNghiep.ma_doanh_nghiep = :maDoanhNghiep")
    List<ViecLam> findAllByDoanhNghiepMaDoanhNghiep(@Param("maDoanhNghiep") Integer maDoanhNghiep);
    @Query("SELECT v FROM ViecLam v WHERE " +
            "(LOWER(v.ten_viec_lam) LIKE CONCAT('%', LOWER(:keyword), '%') " +
            "OR LOWER(v.mo_ta) LIKE CONCAT('%', LOWER(:keyword), '%')) " +
            "AND LOWER(v.dia_chi) LIKE CONCAT('%', LOWER(:location), '%') " +
            "AND (:jobTypes IS NULL OR LOWER(v.loaiViec.ten_loai_viec) IN :jobTypes) " +
            "AND (:category IS NULL OR v.loaiViec.ma_loai_viec = :category)")
    List<ViecLam> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("jobTypes") List<String> jobTypes,
            @Param("category") String category
    );

    @Query("SELECT COUNT(v) FROM ViecLam v WHERE v.linhVuc.ma_linh_vuc = :maLinhVuc")
    Long countByMaLinhVuc(@Param("maLinhVuc") Integer maLinhVuc);

    List<ViecLam> findByStatus(String status);

}
