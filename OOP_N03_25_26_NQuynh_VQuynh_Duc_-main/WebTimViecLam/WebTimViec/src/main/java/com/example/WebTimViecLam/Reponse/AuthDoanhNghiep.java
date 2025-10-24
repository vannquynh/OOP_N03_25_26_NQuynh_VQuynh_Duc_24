package com.example.WebTimViecLam.Reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthDoanhNghiep {
    private Integer companyId;
    private String token;
}
