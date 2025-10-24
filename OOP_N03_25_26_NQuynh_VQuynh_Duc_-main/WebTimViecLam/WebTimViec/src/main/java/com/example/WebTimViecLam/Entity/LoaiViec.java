package com.example.WebTimViecLam.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "loaiviec")
public class LoaiViec {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ma_loai_viec;

    private String ten_loai_viec;
}
