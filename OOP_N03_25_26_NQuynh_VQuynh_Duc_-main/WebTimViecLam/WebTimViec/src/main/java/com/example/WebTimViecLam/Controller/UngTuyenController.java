package com.example.WebTimViecLam.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.WebTimViecLam.Entity.UngTuyen;
import com.example.WebTimViecLam.Service.UngTuyenService;
import com.example.WebTimViecLam.Service.Impl.CloudinaryService;

@RestController
@RequestMapping("/api/ungtuyen")
@CrossOrigin
public class UngTuyenController {

    @Autowired
    private UngTuyenService ungTuyenService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Lấy danh sách tất cả ứng tuyển
    @GetMapping
    public ResponseEntity<List<UngTuyen>> getAll() {
        List<UngTuyen> list = ungTuyenService.getAll();
        return ResponseEntity.ok(list);
    }
    @GetMapping("getByUser")
    public ResponseEntity<List<UngTuyen>> getByUser(@RequestParam("token") String token) {
        List<UngTuyen> list = ungTuyenService.getByToken(token);
        return ResponseEntity.ok(list);
    }

    // Lấy thông tin ứng tuyển theo id
    @GetMapping("/{id}")
    public ResponseEntity<UngTuyen> getById(@PathVariable Integer id) {
        UngTuyen ungTuyen = ungTuyenService.getById(id);
        return ResponseEntity.ok(ungTuyen);
    }

    // Tạo mới ứng tuyển
    @PostMapping
    public ResponseEntity<UngTuyen> create(
            @RequestParam("full_name") String full_name,
            @RequestParam("email") String email,
            @RequestParam("cau_hoi") String cau_hoi,
            @RequestParam(value = "ghi_chu", required = false) String ghi_chu,
            @RequestParam(value = "tep_dinh_kem", required = false) MultipartFile file,
            @RequestParam("status") String status,
            @RequestParam("ma_viec_lam") Integer ma_viec_lam,
            @RequestParam("emailUser") String emailUsers) {

        UngTuyen ungTuyen = new UngTuyen();
        ungTuyen.setFull_name(full_name);
        ungTuyen.setEmail(email);
        ungTuyen.setCau_hoi(cau_hoi);
        ungTuyen.setGhi_chu(ghi_chu);
        ungTuyen.setStatus(status);

        if (file != null && !file.isEmpty()) {
            try {
                String fileUrl = cloudinaryService.uploadFile(file);  // Upload file lên Cloudinary
                ungTuyen.setTep_dinh_kem(fileUrl);  // Lưu URL file vào database
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(null);  // Nếu có lỗi upload, trả về lỗi
            }
        }

        UngTuyen created = ungTuyenService.save(ungTuyen, ma_viec_lam, emailUsers);
        return ResponseEntity.ok(created);
    }

    // Cập nhật ứng tuyển
    @PutMapping("/{id}")
    public ResponseEntity<UngTuyen> update(
            @PathVariable Integer id,
            @RequestParam("full_name") String full_name,
            @RequestParam("email") String email,
            @RequestParam("cau_hoi") String cau_hoi,
            @RequestParam(value = "ghi_chu", required = false) String ghi_chu,
            @RequestParam(value = "tep_dinh_kem", required = false) MultipartFile file,
            @RequestParam("status") String status,
            @RequestParam("ma_viec_lam") Integer ma_viec_lam,
            @RequestParam("user_id") String user_id) {

        UngTuyen ungTuyen = new UngTuyen();
        ungTuyen.setFull_name(full_name);
        ungTuyen.setEmail(email);
        ungTuyen.setCau_hoi(cau_hoi);
        ungTuyen.setGhi_chu(ghi_chu);
        ungTuyen.setStatus(status);

        if (file != null && !file.isEmpty()) {
            try {
                String fileUrl = cloudinaryService.uploadFile(file);  // Upload file lên Cloudinary
                ungTuyen.setTep_dinh_kem(fileUrl);  // Lưu URL file vào database
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(null);  // Nếu có lỗi upload, trả về lỗi
            }
        }

        UngTuyen updated = ungTuyenService.update(id, ungTuyen, ma_viec_lam, user_id);
        return ResponseEntity.ok(updated);
    }

    // Xóa ứng tuyển theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        ungTuyenService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/by-viec-lam/{ma_viec_lam}")
    public ResponseEntity<List<UngTuyen>> getUngTuyenByViecLam(@PathVariable("ma_viec_lam") Integer ma_viec_lam) {
        List<UngTuyen> listUngTuyen = ungTuyenService.getByViecLamId(ma_viec_lam);
        return ResponseEntity.ok(listUngTuyen);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Integer id,
                                          @RequestParam("status") String status) {
        try {
            if (status == null || status.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Vui lòng cung cấp giá trị status hợp lệ");
            }
            UngTuyen updatedUngTuyen = ungTuyenService.updateStatus(id, status);
            return ResponseEntity.ok(updatedUngTuyen);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}
