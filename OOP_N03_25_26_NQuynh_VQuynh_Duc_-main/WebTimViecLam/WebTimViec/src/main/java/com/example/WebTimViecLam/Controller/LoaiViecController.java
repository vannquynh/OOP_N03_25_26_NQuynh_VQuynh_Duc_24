package com.example.WebTimViecLam.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.WebTimViecLam.Entity.LoaiViec;
import com.example.WebTimViecLam.Service.LoaiViecService;

@RestController
@RequestMapping("/api/loaiviec")
@CrossOrigin
public class LoaiViecController {

    @Autowired
    private LoaiViecService loaiViecService;

    // Lấy danh sách tất cả LoaiViec
    @GetMapping
    public ResponseEntity<List<LoaiViec>> getAll() {
        List<LoaiViec> list = loaiViecService.getAll();
        return ResponseEntity.ok(list);
    }

    // Lấy thông tin 1 LoaiViec theo id
    @GetMapping("/{id}")
    public ResponseEntity<LoaiViec> getById(@PathVariable Integer id) {
        LoaiViec loaiViec = loaiViecService.getById(id);
        return ResponseEntity.ok(loaiViec);
    }

    // Tạo mới LoaiViec
    @PostMapping
    public ResponseEntity<LoaiViec> create(@RequestBody LoaiViec loaiViec) {
        LoaiViec created = loaiViecService.save(loaiViec);
        return ResponseEntity.ok(created);
    }

    // Cập nhật LoaiViec theo id
    @PutMapping("/{id}")
    public ResponseEntity<LoaiViec> update(@PathVariable Integer id, @RequestBody LoaiViec loaiViec) {
        LoaiViec updated = loaiViecService.update(id, loaiViec);
        return ResponseEntity.ok(updated);
    }

    // Xóa LoaiViec theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        loaiViecService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
