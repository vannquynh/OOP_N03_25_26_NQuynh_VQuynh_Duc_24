package com.example.WebTimViecLam.Reponse;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String username;
    private String email;
    private String password;
    private String role;
    private String phone;
}