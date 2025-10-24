package com.example.WebTimViecLam.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Table(name = "users")
@Getter
@Setter
@Entity
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String role;
    private Date createdAt;
    private Date updatedAt;
    private String phone;
}
