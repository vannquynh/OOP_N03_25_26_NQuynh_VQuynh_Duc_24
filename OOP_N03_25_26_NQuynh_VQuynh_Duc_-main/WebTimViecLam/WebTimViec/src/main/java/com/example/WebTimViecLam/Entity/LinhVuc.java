package com.example.WebTimViecLam.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "linhvuc")
@Getter
@Setter
@NoArgsConstructor
public class LinhVuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ma_linh_vuc;

    private String ten_linh_vuc;

    @Lob
    private String icon; // link ảnh Cloudinary
}
