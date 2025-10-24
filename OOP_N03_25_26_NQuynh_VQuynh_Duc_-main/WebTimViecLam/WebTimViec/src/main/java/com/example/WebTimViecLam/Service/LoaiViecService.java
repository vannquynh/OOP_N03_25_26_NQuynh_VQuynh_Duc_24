package com.example.WebTimViecLam.Service;

import java.util.List;
import com.example.WebTimViecLam.Entity.LoaiViec;

public interface LoaiViecService {
    List<LoaiViec> getAll();
    LoaiViec getById(Integer id);
    LoaiViec save(LoaiViec loaiViec);
    LoaiViec update(Integer id, LoaiViec loaiViec);
    void delete(Integer id);
}
