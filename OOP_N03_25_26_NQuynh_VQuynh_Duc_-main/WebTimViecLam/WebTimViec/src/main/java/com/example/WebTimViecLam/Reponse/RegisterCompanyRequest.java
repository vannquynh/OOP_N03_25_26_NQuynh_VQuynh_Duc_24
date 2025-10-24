package com.example.WebTimViecLam.Reponse;

import lombok.Data;

@Data
public class RegisterCompanyRequest {
    // user
    private String username;
    private String email;
    private String password;
    private String phone;

    // doanh nghiệp
    private String ten_doanh_nghiep;
    private String tinh;
    private String dia_chi;
    private String website;
    private String quy_mo_nhan_su;
    private String avt;
    private String gioi_thieu;
}