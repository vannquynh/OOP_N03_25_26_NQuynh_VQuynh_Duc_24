package com.example.WebTimViecLam.Service;

import com.example.WebTimViecLam.Entity.Profile;
import com.example.WebTimViecLam.Reponse.ProfileDTO;

public interface ProfileService {
    Profile getProfileByEmail(String email);
    Profile createOrUpdateProfile(ProfileDTO profileDTO, String email);
}
