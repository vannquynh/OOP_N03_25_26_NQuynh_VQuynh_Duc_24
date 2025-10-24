package com.example.WebTimViecLam.Reponse;

import lombok.Data;

import java.util.Date;

@Data
public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String role;
    private String phone;
    private Date createdAt;
    private Date updatedAt;
}