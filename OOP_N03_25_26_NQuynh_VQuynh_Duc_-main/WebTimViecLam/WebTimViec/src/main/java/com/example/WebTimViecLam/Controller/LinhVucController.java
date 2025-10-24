package com.example.WebTimViecLam.Controller;

import com.example.WebTimViecLam.Entity.LinhVuc;
import com.example.WebTimViecLam.Reponse.LinhVucDTO;
import com.example.WebTimViecLam.Service.LinhVucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/linhvuc")
@CrossOrigin(origins = "*")
public class LinhVucController {

    @Autowired
    private LinhVucService linhVucService;

    @GetMapping
    public ResponseEntity<List<LinhVucDTO>> getAll() {
        return ResponseEntity.ok(linhVucService.getAllWithJobCount());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LinhVuc> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(linhVucService.getById(id));
    }

    @PostMapping
    public ResponseEntity<LinhVuc> create(
            @RequestParam("tenLinhVuc") String tenLinhVuc,
            @RequestParam(value = "icon", required = false) MultipartFile icon) throws IOException {
        return ResponseEntity.ok(linhVucService.create(tenLinhVuc, icon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LinhVuc> update(
            @PathVariable Integer id,
            @RequestParam("tenLinhVuc") String tenLinhVuc,
            @RequestParam(value = "icon", required = false) MultipartFile icon) throws IOException {
        return ResponseEntity.ok(linhVucService.update(id, tenLinhVuc, icon));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        linhVucService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
