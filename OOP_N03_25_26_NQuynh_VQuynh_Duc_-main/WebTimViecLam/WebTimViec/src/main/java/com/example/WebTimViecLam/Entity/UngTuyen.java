package com.example.WebTimViecLam.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ung_tuyen")
public class UngTuyen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ma_ung_tuyen;

    private String full_name;
    private String email;
    private String cau_hoi;
    private String ghi_chu;
    private String tep_dinh_kem;
    private String status;
    @Column(name = "createAt")
    private LocalDateTime createAt;

    @Column(name = "updateAt")
    private LocalDateTime updateAt;
    // Ánh xạ quan hệ với ViecLam (một ứng tuyển thuộc 1 việc làm)
    @ManyToOne
    @JoinColumn(name = "ma_viec_lam", referencedColumnName = "ma_viec_lam")
    private ViecLam viecLam;

    // Ánh xạ quan hệ với User (người ứng tuyển)
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
