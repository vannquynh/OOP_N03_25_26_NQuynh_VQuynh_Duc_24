package com.example.WebTimViecLam.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "doanhnghiep")
public class DoanhNghiep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ma_doanh_nghiep;

    private String ten_doanh_nghiep;
    private String tinh;
    private String dia_chi;
    private String website;
    private String quy_mo_nhan_su;

    // Có thể dùng kiểu String cho trường longtext
    private String avt;
    private String gioi_thieu;

    // Đây là liên kết với bảng users, ứng dụng có thể định nghĩa quan hệ nếu cần
    private String user_id;
}
