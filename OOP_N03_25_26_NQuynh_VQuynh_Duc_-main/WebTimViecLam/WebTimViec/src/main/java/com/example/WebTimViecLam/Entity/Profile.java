package com.example.WebTimViecLam.Entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
public class Profile {

    @Id

    private String id;

    private String fullName;

    private String professionalTitle;

    private String phone;

    private String website;
    private String location;
    private String skills;

    private String bio;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // getters and setters
}
