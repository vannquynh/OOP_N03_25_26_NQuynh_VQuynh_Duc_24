package com.example.WebTimViecLam.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.WebTimViecLam.Repository.DoanhNghiepRepository;
import com.example.WebTimViecLam.Repository.LoaiViecRepository;
import com.example.WebTimViecLam.Repository.UngTuyenRepository;
import com.example.WebTimViecLam.Repository.UserRepository;
import com.example.WebTimViecLam.Repository.ViecLamRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoaiViecRepository loaiViecRepository;

    @Autowired
    private ViecLamRepository viecLamRepository;

    @Autowired
    private DoanhNghiepRepository doanhNghiepRepository;

    @Autowired
    private UngTuyenRepository ungTuyenRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        // Lấy tổng số lượng dữ liệu cho từng bảng
        Long totalUsers = userRepository.count();
        Long totalJobTypes = loaiViecRepository.count();
        Long totalViecLam = viecLamRepository.count();
        Long totalDoanhNghiep = doanhNghiepRepository.count();
        Long totalDonUngTuyen = ungTuyenRepository.count();

        // Tạo map kết quả trả về
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalJobTypes", totalJobTypes);
        stats.put("totalViecLam", totalViecLam);
        stats.put("totalDoanhNghiep", totalDoanhNghiep);
        stats.put("totalDonUngTuyen", totalDonUngTuyen);

        return ResponseEntity.ok(stats);
    }
}
