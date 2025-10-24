package com.example.WebTimViecLam.Service.Impl;

import java.util.List;
import java.util.Optional;

import com.example.WebTimViecLam.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WebTimViecLam.Entity.UngTuyen;
import com.example.WebTimViecLam.Entity.ViecLam;
import com.example.WebTimViecLam.Entity.User;
import com.example.WebTimViecLam.Repository.UngTuyenRepository;
import com.example.WebTimViecLam.Repository.ViecLamRepository;
import com.example.WebTimViecLam.Repository.UserRepository;
import com.example.WebTimViecLam.Service.UngTuyenService;

@Service
public class UngTuyenServiceImpl implements UngTuyenService {

    @Autowired
    private UngTuyenRepository ungTuyenRepository;

    @Autowired
    private ViecLamRepository viecLamRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<UngTuyen> getAll() {
        return ungTuyenRepository.findAll();
    }

    @Override
    public UngTuyen getById(Integer id) {
        return ungTuyenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ứng tuyển với id: " + id));
    }

    @Override
    public UngTuyen save(UngTuyen ungTuyen, Integer ma_viec_lam, String email) {
        // Lấy đối tượng ViecLam từ database
        ViecLam viecLam = viecLamRepository.findById(ma_viec_lam)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy việc làm với id: " + ma_viec_lam));
        // Lấy đối tượng User từ database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + email));
        // Ánh xạ các đối tượng cho ứng tuyển
        ungTuyen.setViecLam(viecLam);
        ungTuyen.setUser(user);
        // Đảm bảo id là null để tạo mới
        ungTuyen.setMa_ung_tuyen(null);
        return ungTuyenRepository.save(ungTuyen);
    }

    @Override
    public UngTuyen update(Integer id, UngTuyen ungTuyen, Integer ma_viec_lam, String user_id) {
        UngTuyen exist = getById(id);
        // Cập nhật các trường dữ liệu
        exist.setFull_name(ungTuyen.getFull_name());
        exist.setEmail(ungTuyen.getEmail());
        exist.setCau_hoi(ungTuyen.getCau_hoi());
        exist.setGhi_chu(ungTuyen.getGhi_chu());
        exist.setTep_dinh_kem(ungTuyen.getTep_dinh_kem());
        exist.setStatus(ungTuyen.getStatus());

        // Cập nhật lại đối tượng ViecLam nếu có thay đổi
        ViecLam viecLam = viecLamRepository.findById(ma_viec_lam)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy việc làm với id: " + ma_viec_lam));
        // Cập nhật lại đối tượng User nếu có thay đổi
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với id: " + user_id));

        exist.setViecLam(viecLam);
        exist.setUser(user);
        return ungTuyenRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        ungTuyenRepository.deleteById(id);
    }

    @Override
    public List<UngTuyen> getByToken(String token) {
        Optional<User> userOpt = userRepository.findByEmail(jwtUtil.extractEmail(token));
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return ungTuyenRepository.findByUserId(user.getId());
        }else{
            return null;
        }
    }
    @Override
    public List<UngTuyen> getByViecLamId(Integer ma_viec_lam) {
        return ungTuyenRepository.findAllByViecLamMaViecLam(ma_viec_lam);
    }
    @Override
    public UngTuyen updateStatus(Integer id, String status) {
        // Gọi repository cập nhật status
        int updated = ungTuyenRepository.updateStatus(id, status);
        if (updated == 0) {
            throw new RuntimeException("Không tìm thấy ứng tuyển với id: " + id);
        }
        // Lấy lại đối tượng sau khi update
        Optional<UngTuyen> updatedObj = ungTuyenRepository.findById(id);
        return updatedObj.orElseThrow(() -> new RuntimeException("Lỗi khi lấy lại thông tin sau khi cập nhật"));
    }
}
