package com.example.WebTimViecLam.Controller;

import java.io.IOException;
import java.util.List;

import com.example.WebTimViecLam.Service.Impl.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.WebTimViecLam.Entity.DoanhNghiep;
import com.example.WebTimViecLam.Service.DoanhNghiepService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/doanhnghiep")
@CrossOrigin
public class DoanhNghiepController {

    @Autowired
    private DoanhNghiepService doanhNghiepService;
    @Autowired
    private CloudinaryService cloudinaryService;
    // Lấy danh sách tất cả doanh nghiệp
    @GetMapping
    public ResponseEntity<List<DoanhNghiep>> getAll() {
        List<DoanhNghiep> list = doanhNghiepService.getAll();
        return ResponseEntity.ok(list);
    }

    // Lấy thông tin doanh nghiệp theo id
    @GetMapping("/{id}")
    public ResponseEntity<DoanhNghiep> getById(@PathVariable Integer id) {
        DoanhNghiep dn = doanhNghiepService.getById(id);
        return ResponseEntity.ok(dn);
    }

    // Tạo mới doanh nghiệp
    @PostMapping
    public ResponseEntity<DoanhNghiep> create(@RequestBody DoanhNghiep doanhNghiep) {
        DoanhNghiep created = doanhNghiepService.save(doanhNghiep);
        return ResponseEntity.ok(created);
    }

    // Cập nhật doanh nghiệp theo id
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<DoanhNghiep> update(
            @PathVariable Integer id,
            @RequestParam("ten_doanh_nghiep") String tenDoanhNghiep,
            @RequestParam("tinh") String tinh,
            @RequestParam("dia_chi") String diaChi,
            @RequestParam("website") String website,
            @RequestParam("quy_mo_nhan_su") String quyMoNhanSu,
            @RequestParam(value = "avt", required = false) MultipartFile avtFile,  // Nhận ảnh từ MultipartFile
            @RequestParam("gioi_thieu") String gioiThieu
    ) throws IOException {
        DoanhNghiep doanhNghiep = new DoanhNghiep();
        doanhNghiep.setTen_doanh_nghiep(tenDoanhNghiep);
        doanhNghiep.setTinh(tinh);
        doanhNghiep.setDia_chi(diaChi);
        doanhNghiep.setWebsite(website);
        doanhNghiep.setQuy_mo_nhan_su(quyMoNhanSu);
        doanhNghiep.setGioi_thieu(gioiThieu);

        // Nếu có file ảnh, tiến hành upload
        if (avtFile != null && !avtFile.isEmpty()) {
            String avtUrl = cloudinaryService.uploadImage(avtFile);
            doanhNghiep.setAvt(avtUrl);
        }

        DoanhNghiep updated = doanhNghiepService.update(id, doanhNghiep);
        return ResponseEntity.ok(updated);
    }


    // Xóa doanh nghiệp theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        doanhNghiepService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
