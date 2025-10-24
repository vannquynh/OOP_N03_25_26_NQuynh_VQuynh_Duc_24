package com.example.WebTimViecLam.Service.Impl;

import com.example.WebTimViecLam.Entity.LinhVuc;
import com.example.WebTimViecLam.Reponse.LinhVucDTO;
import com.example.WebTimViecLam.Repository.LinhVucRepository;
import com.example.WebTimViecLam.Repository.ViecLamRepository;
import com.example.WebTimViecLam.Service.LinhVucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class LinhVucServiceImpl implements LinhVucService {

    @Autowired
    private LinhVucRepository linhVucRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ViecLamRepository viecLamRepository;

    @Override
    public List<LinhVuc> getAll() {
        return linhVucRepository.findAll();
    }

    @Override
    public LinhVuc getById(Integer id) {
        return linhVucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lĩnh vực với id " + id));
    }

    @Override
    public LinhVuc create(String tenLinhVuc, MultipartFile icon) throws IOException {
        LinhVuc linhVuc = new LinhVuc();
        linhVuc.setTen_linh_vuc(tenLinhVuc);
        if (icon != null && !icon.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(icon);
            linhVuc.setIcon(imageUrl);
        }
        return linhVucRepository.save(linhVuc);
    }

    @Override
    public LinhVuc update(Integer id, String tenLinhVuc, MultipartFile icon) throws IOException {
        LinhVuc linhVuc = getById(id);
        linhVuc.setTen_linh_vuc(tenLinhVuc);
        if (icon != null && !icon.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(icon);
            linhVuc.setIcon(imageUrl);
        }
        return linhVucRepository.save(linhVuc);
    }

    @Override
    public void delete(Integer id) {
        linhVucRepository.deleteById(id);
    }
    @Override
    public List<LinhVucDTO> getAllWithJobCount() {
        List<LinhVuc> linhVucs = linhVucRepository.findAll();
        List<LinhVucDTO> dtos = linhVucs.stream().map(lv -> {
            Long count = viecLamRepository.countByMaLinhVuc(lv.getMa_linh_vuc());
            return new LinhVucDTO(
                    lv.getMa_linh_vuc(),
                    lv.getTen_linh_vuc(),
                    lv.getIcon(),
                    count
            );
        }).toList();
        return dtos;
    }

}
