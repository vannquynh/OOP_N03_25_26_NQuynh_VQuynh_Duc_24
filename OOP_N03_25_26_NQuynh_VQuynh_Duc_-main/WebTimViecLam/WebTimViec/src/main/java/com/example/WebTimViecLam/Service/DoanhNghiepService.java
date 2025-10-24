package com.example.WebTimViecLam.Service;

import java.util.List;
import com.example.WebTimViecLam.Entity.DoanhNghiep;

public interface DoanhNghiepService {
    List<DoanhNghiep> getAll();
    DoanhNghiep getById(Integer id);
    DoanhNghiep save(DoanhNghiep doanhNghiep);
    DoanhNghiep update(Integer id, DoanhNghiep doanhNghiep);
    void delete(Integer id);
}