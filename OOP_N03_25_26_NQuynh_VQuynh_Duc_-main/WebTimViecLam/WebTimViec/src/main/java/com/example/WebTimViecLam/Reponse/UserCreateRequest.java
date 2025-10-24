package com.example.WebTimViecLam.Reponse;



import lombok.Data;

@Data
public class UserCreateRequest {

    private String username;


    private String email;


    private String password;

    private String role;
    private String phone;
}