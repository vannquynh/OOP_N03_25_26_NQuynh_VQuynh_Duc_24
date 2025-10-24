import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormField from '../../components/ui/FormField';

/* ---------- state mặc định ---------- */
const initialState = {
  ten_doanh_nghiep: '',
  tinh: '',
  dia_chi: '',
  website: '',
  quy_mo_nhan_su: '',
  avt: '',
  gioi_thieu: '',
  user_id: '',
};

const DoanhNghiepForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  /* -------- fetch khi chỉnh sửa -------- */
  useEffect(() => {
    const fetchDN = async () => {
      if (!isEdit) return;
      try {
        setFetching(true);
        const res = await fetch(`http://localhost:8080/api/doanhnghiep/${id}`);
        const data = await res.json();
        setForm(data); // fill form bằng dữ liệu trả về từ API
      } catch {
        toast.error('Không lấy được dữ liệu doanh nghiệp');
        navigate('/doanhnghiep');
      } finally {
        setFetching(false);
      }
    };
    fetchDN();
  }, [id, isEdit, navigate]);

  /* ---------- handleChange ---------- */
  const handleChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ---------- validate ---------- */
  const validate = () => {
    const newErrors = {};
    if (!form.ten_doanh_nghiep.trim()) newErrors.ten_doanh_nghiep = 'Bắt buộc';
    if (!form.user_id.trim()) newErrors.user_id = 'Bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Vui lòng kiểm tra lỗi trên form');
      return;
    }

    setLoading(true);
    try {
      const url = isEdit
        ? `http://localhost:8080/api/doanhnghiep/${id}`
        : 'http://localhost:8080/api/doanhnghiep';

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();

      toast.success(isEdit ? 'Cập nhật doanh nghiệp thành công' : 'Tạo doanh nghiệp thành công');
      navigate('/doanhnghiep');
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
            {isEdit ? 'Sửa doanh nghiệp' : 'Tạo doanh nghiệp'}
          </h1>
          <p className="text-gray-500">
            {isEdit ? 'Chỉnh sửa thông tin doanh nghiệp' : 'Thêm doanh nghiệp mới'}
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Tên doanh nghiệp"
            name="ten_doanh_nghiep"
            value={form.ten_doanh_nghiep}
            onChange={handleChange}
            error={errors.ten_doanh_nghiep}
            required
          />
          <FormField
            label="Tỉnh/Thành phố"
            name="tinh"
            value={form.tinh}
            onChange={handleChange}
          />
          <FormField
            label="Địa chỉ"
            name="dia_chi"
            value={form.dia_chi}
            onChange={handleChange}
          />
          <FormField
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />
          <FormField
            label="Quy mô nhân sự"
            name="quy_mo_nhan_su"
            value={form.quy_mo_nhan_su}
            onChange={handleChange}
          />
          <FormField
            label="Ảnh đại diện (URL)"
            name="avt"
            value={form.avt}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="gioi_thieu" className="form-label">
              Giới thiệu
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={form.gioi_thieu}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleChange({ name: 'gioi_thieu', value: data });
              }}
            />
            {errors.gioi_thieu && <p className="text-red-500 text-sm">{errors.gioi_thieu}</p>}
          </div>
          <FormField
            label="User ID"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            error={errors.user_id}
            required
          />

          <div className="flex justify-end gap-3 mt-8">
            <Link to="/doanhnghiep" className="btn btn-secondary flex items-center">
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

export default DoanhNghiepForm;
