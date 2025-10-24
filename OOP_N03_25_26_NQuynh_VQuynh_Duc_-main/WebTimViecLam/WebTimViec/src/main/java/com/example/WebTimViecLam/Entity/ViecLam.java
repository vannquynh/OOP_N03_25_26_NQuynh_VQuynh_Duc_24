package com.example.WebTimViecLam.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "vieclam")
public class ViecLam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ma_viec_lam;

    private String ten_viec_lam;
    private String avt;
    private String muc_luong;
    @Column(name = "mo_ta", columnDefinition = "LONGTEXT")
    private String mo_ta;
    @Column(name = "yeu_cau_cong_viec", columnDefinition = "LONGTEXT")
    private String yeu_cau_cong_viec;
    private Integer so_luong_tuyen;
    private String dia_chi;
    private String status;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    // Thiết lập quan hệ với bảng loaiviec
    @ManyToOne
    @JoinColumn(name = "ma_loai_viec", referencedColumnName = "ma_loai_viec")
    private LoaiViec loaiViec;

    // Thiết lập quan hệ với bảng doanhnghiep
    @ManyToOne
    @JoinColumn(name = "ma_doanh_nghiep", referencedColumnName = "ma_doanh_nghiep")
    private DoanhNghiep doanhNghiep;
    @ManyToOne
    @JoinColumn(name = "ma_linh_vuc", referencedColumnName = "ma_linh_vuc")
    private LinhVuc linhVuc;
}
