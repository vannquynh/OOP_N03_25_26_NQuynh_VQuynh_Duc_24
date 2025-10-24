package com.example.WebTimViecLam.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.example.WebTimViecLam.Entity.ViecLam;

public interface ViecLamService {
    List<ViecLam> getAll();
    List<ViecLam> getAllAdmin();
    ViecLam getById(Integer id);
    ViecLam save(ViecLam viecLam, Integer ma_loai_viec, Integer ma_doanh_nghiep, Integer ma_linh_vuc, MultipartFile file) throws IOException;
    ViecLam update(Integer id, ViecLam viecLam, Integer ma_loai_viec, Integer ma_linh_vuc, MultipartFile file) throws IOException;
    void delete(Integer id);
    List<ViecLam> getByCompanyId(Integer maDoanhNghiep);
     List<ViecLam> searchJobs(String keyword, String location, List<String> jobType, String category) ;
    boolean checkUserApplied(Integer maViecLam, String token);
    ViecLam updateStatus(Integer id, String status);

}
