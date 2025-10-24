package com.example.WebTimViecLam.Service;

import com.example.WebTimViecLam.Entity.LinhVuc;
import com.example.WebTimViecLam.Reponse.LinhVucDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LinhVucService {
    List<LinhVuc> getAll();
    LinhVuc getById(Integer id);
    LinhVuc create(String tenLinhVuc, MultipartFile icon) throws IOException;
    LinhVuc update(Integer id, String tenLinhVuc, MultipartFile icon) throws IOException;
    void delete(Integer id);
    List<LinhVucDTO> getAllWithJobCount();

}
