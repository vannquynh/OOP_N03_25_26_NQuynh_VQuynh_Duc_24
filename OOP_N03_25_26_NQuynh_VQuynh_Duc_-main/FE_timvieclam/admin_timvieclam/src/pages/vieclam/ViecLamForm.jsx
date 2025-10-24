import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormField from '../../components/ui/FormField';

const initialState = {
  ten_viec_lam: '',
  muc_luong: '',
  mo_ta: '',
  yeu_cau_cong_viec: '',
  so_luong_tuyen: '',
  dia_chi: '',
  ma_loai_viec: '',
  ma_doanh_nghiep: '',
  avt: null,
};

const ViecLamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  /* -------- fetch when edit -------- */
  useEffect(() => {
    const fetchJob = async () => {
      if (!isEdit) return;
      try {
        setFetching(true);
        const res = await fetch(`http://localhost:8080/api/vieclam/${id}`);
        const data = await res.json();
        setForm({ ...data, avt: null }); // không load file
      } catch {
        toast.error('Không lấy được dữ liệu');
        navigate('/vieclam');
      } finally {
        setFetching(false);
      }
    };
    fetchJob();
  }, [id, isEdit, navigate]);

  /* ---------- helpers ---------- */
  const handleChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newE = {};
    if (!form.ten_viec_lam.trim()) newE.ten_viec_lam = 'Bắt buộc';
    if (!form.muc_luong.trim()) newE.muc_luong = 'Bắt buộc';
    if (!form.ma_loai_viec) newE.ma_loai_viec = 'Bắt buộc';
    if (!form.ma_doanh_nghiep) newE.ma_doanh_nghiep = 'Bắt buộc';
    setErrors(newE);
    return Object.keys(newE).length === 0;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Vui lòng kiểm tra lỗi');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'avt') {
          if (v) fd.append('avt', v);
        } else {
          fd.append(k, v);
        }
      });

      const url = isEdit
        ? `http://localhost:8080/api/vieclam/${id}`
        : 'http://localhost:8080/api/vieclam';
      const opts = { method: isEdit ? 'PUT' : 'POST', body: fd };
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error();

      toast.success(isEdit ? 'Cập nhật thành công' : 'Tạo mới thành công');
      navigate('/vieclam');
    } catch {
      toast.error(isEdit ? 'Cập nhật thất bại' : 'Tạo mới thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="h-full flex items-center justify-center">
        <span className="loader" />
      </div>
    );

  /* ---------- UI ---------- */
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEdit ? 'Sửa việc làm' : 'Tạo việc làm'}
          </h1>
          <p className="text-gray-500">
            {isEdit ? 'Chỉnh sửa thông tin' : 'Thêm tin tuyển dụng mới'}
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* tên, lương, mô tả, yêu cầu … */}
          <FormField
            label="Tên việc làm"
            name="ten_viec_lam"
            value={form.ten_viec_lam}
            onChange={handleChange}
            error={errors.ten_viec_lam}
            required
          />
          <FormField
            label="Mức lương"
            name="muc_luong"
            value={form.muc_luong}
            onChange={handleChange}
            placeholder="VD: 10‑15 triệu"
            error={errors.muc_luong}
            required
          />
          <div className="form-group">
            <label className="form-label">Mô tả</label>
            <CKEditor
              editor={ClassicEditor}
              data={form.mo_ta}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleChange({ name: 'mo_ta', value: data });
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Yêu cầu công việc</label>
            <CKEditor
              editor={ClassicEditor}
              data={form.yeu_cau_cong_viec}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleChange({ name: 'yeu_cau_cong_viec', value: data });
              }}
            />
          </div>
          <FormField
            label="Số lượng tuyển"
            name="so_luong_tuyen"
            value={form.so_luong_tuyen}
            onChange={handleChange}
            type="number"
          />
          <FormField
            label="Địa chỉ"
            name="dia_chi"
            value={form.dia_chi}
            onChange={handleChange}
          />
          <FormField
            label="Mã loại việc"
            name="ma_loai_viec"
            value={form.ma_loai_viec}
            onChange={handleChange}
            type="number"
            error={errors.ma_loai_viec}
            required
          />
          <FormField
            label="Mã doanh nghiệp"
            name="ma_doanh_nghiep"
            value={form.ma_doanh_nghiep}
            onChange={handleChange}
            type="number"
            error={errors.ma_doanh_nghiep}
            required
          />

          {/* upload ảnh */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ảnh đại diện (tùy chọn)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm((p) => ({ ...p, avt: e.target.files[0] }))}
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Link to="/vieclam" className="btn btn-secondary flex items-center">
              <FiX className="mr-1" /> Huỷ
            </Link>
            <button type="submit" className="btn btn-primary flex items-center" disabled={loading}>
              {loading ? (
                <span className="loader-small mr-2" />
              ) : (
                <FiSave className="mr-1" />
              )}
              {isEdit ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViecLamForm;
