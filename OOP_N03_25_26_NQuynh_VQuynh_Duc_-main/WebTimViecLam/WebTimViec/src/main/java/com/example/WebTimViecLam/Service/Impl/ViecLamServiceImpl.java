package com.example.WebTimViecLam.Service.Impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.example.WebTimViecLam.Entity.*;
import com.example.WebTimViecLam.Repository.*;
import com.example.WebTimViecLam.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.WebTimViecLam.Service.ViecLamService;

@Service
public class ViecLamServiceImpl implements ViecLamService {

    @Autowired
    private ViecLamRepository viecLamRepository;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private LoaiViecRepository loaiViecRepository;

    @Autowired
    private DoanhNghiepRepository doanhNghiepRepository;

    @Autowired
    private LinhVucRepository linhVucRepository;
    @Autowired
    private UngTuyenRepository ungTuyenRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<ViecLam> getAll() {
        return viecLamRepository.findByStatus("ACTIVE");
    }

    @Override
    public List<ViecLam> getAllAdmin() {
        return viecLamRepository.findAll();
    }

    @Override
    public ViecLam getById(Integer id) {
        return viecLamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy việc làm với id: " + id));
    }

    @Override
    public ViecLam save(ViecLam viecLam, Integer ma_loai_viec, Integer ma_doanh_nghiep, Integer ma_linh_vuc, MultipartFile file) throws IOException {
        // Gán quan hệ
        LoaiViec loaiViec = loaiViecRepository.findById(ma_loai_viec)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy loại việc với id: " + ma_loai_viec));
        DoanhNghiep doanhNghiep = doanhNghiepRepository.findById(ma_doanh_nghiep)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy doanh nghiệp với id: " + ma_doanh_nghiep));
        LinhVuc linhVuc = linhVucRepository.findById(ma_linh_vuc)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lĩnh vực với id: " + ma_linh_vuc));

        viecLam.setLoaiViec(loaiViec);
        viecLam.setDoanhNghiep(doanhNghiep);
        viecLam.setLinhVuc(linhVuc);
        viecLam.setStatus("PENDING");
        if (file != null && !file.isEmpty()) {
            String avtUrl = cloudinaryService.uploadImage(file);
            viecLam.setAvt(avtUrl);
        }

        viecLam.setMa_viec_lam(null); // Để Hibernate tự insert
        return viecLamRepository.save(viecLam);
    }

    @Override
    public ViecLam update(Integer id, ViecLam viecLam, Integer ma_loai_viec, Integer ma_linh_vuc, MultipartFile file) throws IOException {
        // Lấy thông tin ViecLam hiện tại từ cơ sở dữ liệu
        ViecLam exist = getById(id);

        // Cập nhật thông tin ViecLam
        exist.setTen_viec_lam(viecLam.getTen_viec_lam());
        exist.setMuc_luong(viecLam.getMuc_luong());
        exist.setMo_ta(viecLam.getMo_ta());
        exist.setYeu_cau_cong_viec(viecLam.getYeu_cau_cong_viec());
        exist.setSo_luong_tuyen(viecLam.getSo_luong_tuyen());
        exist.setDia_chi(viecLam.getDia_chi());

        // Nếu có file mới thì cập nhật ảnh đại diện (avt)
        if (file != null && !file.isEmpty()) {
            String avtUrl = cloudinaryService.uploadImage(file);
            exist.setAvt(avtUrl);
        }

        // Cập nhật quan hệ LoaiViec nếu ma_loai_viec có giá trị
        if (ma_loai_viec != null) {
            LoaiViec loaiViec = loaiViecRepository.findById(ma_loai_viec)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy loại việc với id: " + ma_loai_viec));
            exist.setLoaiViec(loaiViec);
        }

        // Cập nhật quan hệ LinhVuc nếu ma_linh_vuc có giá trị
        if (ma_linh_vuc != null) {
            LinhVuc linhVuc = linhVucRepository.findById(ma_linh_vuc)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lĩnh vực với id: " + ma_linh_vuc));
            exist.setLinhVuc(linhVuc);
        }

        // Lưu lại thông tin ViecLam đã cập nhật
        return viecLamRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        viecLamRepository.deleteById(id);
    }

    @Override
    public List<ViecLam> getByCompanyId(Integer maDoanhNghiep) {
        return viecLamRepository.findAllByDoanhNghiepMaDoanhNghiep(maDoanhNghiep);
    }

    @Override
    public List<ViecLam> searchJobs(String keyword, String location, List<String> jobType, String category) {
        return viecLamRepository.searchJobs(keyword, location, jobType, category);
    }

    @Override
    public boolean checkUserApplied(Integer maViecLam, String token) {
        // Trả về giá trị từ câu truy vấn, chuyển nó thành Boolean
        Optional<User> userOpt = userRepo.findByEmail(jwtUtil.extractEmail(token));
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Object result = ungTuyenRepository.existsByMaViecLamAndUserId(maViecLam, user.getId());
            return result != null && ((Long) result) > 0;
        }else{
            return false;
        }

    }
    @Override
    public ViecLam updateStatus(Integer id, String status) {
        // Lấy thông tin việc làm từ id, nếu không tìm thấy sẽ ném ngoại lệ
        ViecLam exist = getById(id);

        // Kiểm tra trạng thái hiện tại và trạng thái mới
        String currentStatus = exist.getStatus();

        if ("ACTIVE".equals(status)) {
            // Trạng thái chỉ có thể chuyển thành ACTIVE khi hiện tại là CLOSE hoặc ACCEPT
            if (!"CLOSED".equals(currentStatus) && !"ACCEPTED".equals(currentStatus)) {
                throw new RuntimeException("Trạng thái hiện tại không thể chuyển sang ACTIVE");
            }
        } else if ("CLOSED".equals(status)) {
            // Trạng thái chỉ có thể chuyển thành CLOSE khi hiện tại là ACTIVE
            if (!"ACTIVE".equals(currentStatus)) {
                throw new RuntimeException("Trạng thái hiện tại không thể chuyển sang CLOSE");
            }
        }

        // Cập nhật trạng thái mới cho việc làm
        exist.setStatus(status);

        // Lưu lại việc làm đã cập nhật trạng thái
        return viecLamRepository.save(exist);
    }


}
