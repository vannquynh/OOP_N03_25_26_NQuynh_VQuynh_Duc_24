import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiX, FiImage, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FormField from '../../components/ui/FormField';

const API_BASE = 'http://localhost:8080';

const LinhVucForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    tenLinhVuc: '',
  });

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  // cleanup object URL
  useEffect(() => {
    return () => {
      if (iconPreview?.startsWith('blob:')) URL.revokeObjectURL(iconPreview);
    };
  }, [iconPreview]);

  useEffect(() => {
    const fetchLinhVuc = async () => {
      if (!isEditMode) return;
      try {
        setFetchLoading(true);
        const res = await fetch(`${API_BASE}/api/linhvuc/${id}`);
        if (!res.ok) throw new Error('Load failed');
        const data = await res.json();

        // cố gắng map các field phổ biến; nếu khác bạn chỉnh lại tên field ở đây
        setForm({
          tenLinhVuc: data.tenLinhVuc ?? data.ten_linh_vuc ?? data.ten ?? '',
        });

        // nếu backend trả về url/icon path, gán vào preview để hiển thị
        const preview =
          data.iconUrl ??
          data.icon_url ??
          data.iconPath ??
          data.icon ??
          '';
        if (preview) setIconPreview(preview);
      } catch (e) {
        toast.error('Không tải được dữ liệu lĩnh vực');
        navigate('/linhvuc');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchLinhVuc();
  }, [id, isEditMode, navigate]);

  const handleChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ví dụ giới hạn 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Icon tối đa 2MB');
      return;
    }

    setIconFile(file);

    // revoke url cũ nếu là blob
    if (iconPreview?.startsWith('blob:')) URL.revokeObjectURL(iconPreview);
    setIconPreview(URL.createObjectURL(file));
  };

  const clearIcon = () => {
    setIconFile(null);
    if (iconPreview?.startsWith('blob:')) URL.revokeObjectURL(iconPreview);
    setIconPreview('');
    // cũng nên clear input file (nếu dùng ref), ở đây giữ đơn giản
  };

  const validateForm = () => {
    const errs = {};
    if (!form.tenLinhVuc.trim()) errs.tenLinhVuc = 'Tên lĩnh vực là bắt buộc';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Vui lòng sửa lỗi trong form');
      return;
    }

    setLoading(true);

    try {
      const url = isEditMode
        ? `${API_BASE}/api/linhvuc/${id}`
        : `${API_BASE}/api/linhvuc`;

      const fd = new FormData();
      fd.append('tenLinhVuc', form.tenLinhVuc);
      if (iconFile) fd.append('icon', iconFile);

      const res = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        body: fd, // KHÔNG set Content-Type, để trình duyệt tự thêm boundary
      });

      if (!res.ok) throw new Error('Save failed');

      toast.success(isEditMode ? 'Cập nhật thành công' : 'Tạo mới thành công');
      navigate('/linhvuc');
    } catch (e) {
      toast.error(isEditMode ? 'Cập nhật thất bại' : 'Tạo mới thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? 'Sửa Lĩnh vực' : 'Tạo Lĩnh vực'}
          </h1>
          <p className="text-gray-500">
            {isEditMode ? 'Cập nhật thông tin lĩnh vực' : 'Thêm lĩnh vực mới vào hệ thống'}
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Tên lĩnh vực"
            name="tenLinhVuc"
            value={form.tenLinhVuc}
            onChange={handleChange}
            placeholder="Nhập tên lĩnh vực"
            error={errors.tenLinhVuc}
            required
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon (tùy chọn)
            </label>
            <div className="flex items-center gap-4">
              <label className="btn btn-secondary cursor-pointer flex items-center">
                <FiImage className="mr-2" />
                Chọn ảnh
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {iconPreview ? (
                <div className="flex items-center gap-3">
                  <img
                    src={iconPreview}
                    alt="icon preview"
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                  <button
                    type="button"
                    className="btn btn-danger flex items-center"
                    onClick={clearIcon}
                  >
                    <FiTrash2 className="mr-1" /> Xóa icon
                  </button>
                </div>
              ) : (
                <span className="text-gray-400">Chưa chọn ảnh</span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <Link to="/linhvuc" className="btn btn-secondary flex items-center">
              <FiX className="mr-1" /> Hủy
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <FiSave className="mr-1" />
              )}
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinhVucForm;
