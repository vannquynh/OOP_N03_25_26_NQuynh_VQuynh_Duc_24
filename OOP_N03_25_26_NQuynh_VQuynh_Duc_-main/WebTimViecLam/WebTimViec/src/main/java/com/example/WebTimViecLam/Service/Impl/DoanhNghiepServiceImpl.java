package com.example.WebTimViecLam.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WebTimViecLam.Entity.DoanhNghiep;
import com.example.WebTimViecLam.Repository.DoanhNghiepRepository;
import com.example.WebTimViecLam.Service.DoanhNghiepService;

@Service
public class DoanhNghiepServiceImpl implements DoanhNghiepService {

    @Autowired
    private DoanhNghiepRepository doanhNghiepRepository;


    @Override
    public List<DoanhNghiep> getAll() {
        return doanhNghiepRepository.findAll();
    }

    @Override
    public DoanhNghiep getById(Integer id) {
        Optional<DoanhNghiep> opt = doanhNghiepRepository.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new RuntimeException("Không tìm thấy doanh nghiệp với id: " + id);
    }

    @Override
    public DoanhNghiep save(DoanhNghiep doanhNghiep) {
        // Đảm bảo khi tạo mới không có id
        doanhNghiep.setMa_doanh_nghiep(null);
        return doanhNghiepRepository.save(doanhNghiep);
    }

    @Override
    public DoanhNghiep update(Integer id, DoanhNghiep doanhNghiep) {
        DoanhNghiep exist = getById(id);
        // Cập nhật các trường cần thiết
        exist.setTen_doanh_nghiep(doanhNghiep.getTen_doanh_nghiep());
        exist.setTinh(doanhNghiep.getTinh());
        exist.setDia_chi(doanhNghiep.getDia_chi());
        exist.setWebsite(doanhNghiep.getWebsite());
        exist.setQuy_mo_nhan_su(doanhNghiep.getQuy_mo_nhan_su());
        if (doanhNghiep.getAvt() != null && !doanhNghiep.getAvt().isEmpty()) {
            exist.setAvt(doanhNghiep.getAvt());
        }
        exist.setGioi_thieu(doanhNghiep.getGioi_thieu());
        return doanhNghiepRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        doanhNghiepRepository.deleteById(id);
    }
}
