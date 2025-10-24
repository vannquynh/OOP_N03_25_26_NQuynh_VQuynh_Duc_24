package com.example.WebTimViecLam.Service;

import java.util.List;
import com.example.WebTimViecLam.Entity.UngTuyen;

public interface UngTuyenService {
    List<UngTuyen> getAll();
    UngTuyen getById(Integer id);
    UngTuyen save(UngTuyen ungTuyen, Integer ma_viec_lam, String user_id);
    UngTuyen update(Integer id, UngTuyen ungTuyen, Integer ma_viec_lam, String user_id);
    void delete(Integer id);
    List<UngTuyen> getByToken(String token);
    List<UngTuyen> getByViecLamId(Integer ma_viec_lam);
    UngTuyen updateStatus(Integer id, String status);
}
