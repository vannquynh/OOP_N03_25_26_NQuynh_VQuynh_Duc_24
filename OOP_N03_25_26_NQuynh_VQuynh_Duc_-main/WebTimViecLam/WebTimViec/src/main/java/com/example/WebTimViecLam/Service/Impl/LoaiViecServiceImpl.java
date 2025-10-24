package com.example.WebTimViecLam.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WebTimViecLam.Entity.LoaiViec;
import com.example.WebTimViecLam.Repository.LoaiViecRepository;
import com.example.WebTimViecLam.Service.LoaiViecService;

@Service
public class LoaiViecServiceImpl implements LoaiViecService {

    @Autowired
    private LoaiViecRepository loaiViecRepository;

    @Override
    public List<LoaiViec> getAll() {
        return loaiViecRepository.findAll();
    }

    @Override
    public LoaiViec getById(Integer id) {
        Optional<LoaiViec> loaiViec = loaiViecRepository.findById(id);
        if (loaiViec.isPresent()) {
            return loaiViec.get();
        }
        throw new RuntimeException("Không tìm thấy LoaiViec với id: " + id);
    }

    @Override
    public LoaiViec save(LoaiViec loaiViec) {
        return loaiViecRepository.save(loaiViec);
    }

    @Override
    public LoaiViec update(Integer id, LoaiViec loaiViec) {
        LoaiViec exist = getById(id);
        exist.setTen_loai_viec(loaiViec.getTen_loai_viec());
        return loaiViecRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        loaiViecRepository.deleteById(id);
    }
}
