package com.example.WebTimViecLam.Reponse;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LinhVucDTO {
    private Integer ma_linh_vuc;
    private String ten_linh_vuc;
    private String icon;
    private Long soLuongViecLam;
}
