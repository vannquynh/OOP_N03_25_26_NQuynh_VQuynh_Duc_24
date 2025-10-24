// UserFormModal.jsx
import React, { useEffect, useState } from 'react';
import { createUser, updateUser, getUser } from '../../services/userApi';
import { toast } from 'react-toastify';
import Modal from '../../components/ui/Modal';

// ---- Input tách ra ngoài + memo để tránh remount làm mất focus
const Input = React.memo(
  React.forwardRef(function InputBase(
    { className = '', ...props },
    ref
  ) {
    return (
      <input
        ref={ref}
        className={
          `w-full rounded border px-3 py-2 text-sm outline-none
           focus:ring-2 focus:ring-primary-500 border-neutral-300 ` + className
        }
        {...props}
      />
    );
  })
);

// ---- Form rỗng
const emptyForm = {
  username: '',
  email: '',
  password: '',
  role: 'USER',
  phone: ''
};

export default function UserFormModal({ isOpen, onClose, userId, onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const isEdit = !!userId;

  // Chỉ phụ thuộc isOpen + userId để tránh reset khi đang gõ
  useEffect(() => {
    if (!isOpen) return;
    setErrors({});

    if (userId) {
      (async () => {
        try {
          setFetching(true);
          const data = await getUser(userId);
          // Không fill password lên UI
          setForm({ ...emptyForm, ...data, password: '' });
        } catch {
          toast.error('Không lấy được dữ liệu user');
          onClose?.();
        } finally {
          setFetching(false);
        }
      })();
    } else {
      // create mode
      setForm(emptyForm);
    }
  }, [isOpen, userId]); // <-- không để các deps khác làm re-run ngoài ý muốn

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Bắt buộc';
    if (!form.email.trim()) e.email = 'Bắt buộc';
    if (!isEdit && !form.password.trim()) e.password = 'Bắt buộc';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error('Vui lòng kiểm tra lỗi');
      return;
    }
    try {
      setLoading(true);
      if (isEdit) {
        const payload = {
          username: form.username,
          email: form.email,
          role: form.role,
          phone: form.phone
        };
        if (form.password?.trim()) payload.password = form.password;
        await updateUser(userId, payload);
        toast.success('Cập nhật user thành công');
      } else {
        const payload = {
          username: form.username,
          email: form.email,
          role: form.role,
          phone: form.phone,
          password: form.password
        };
        await createUser(payload);
        toast.success('Tạo user thành công');
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Thao tác thất bại';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Sửa người dùng' : 'Tạo người dùng'}
      maxWidth="xl"
    >
      {fetching ? (
        <div className="h-40 flex items-center justify-center">
          <span className="loader" />
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="username">Username *</label>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                placeholder="vd: john"
              />
              {errors.username && <p className="text-error-600 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email *</label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-error-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="password">
                {isEdit ? 'Mật khẩu (để trống nếu giữ nguyên)' : 'Mật khẩu *'}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder={isEdit ? '•••••••• (tùy chọn)' : '••••••••'}
                autoComplete={isEdit ? 'new-password' : 'new-password'}
              />
              {errors.password && <p className="text-error-600 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="phone">Số điện thoại</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => {
                  // Không strip ký tự để tránh nhảy caret; validate khi submit
                  setForm((p) => ({ ...p, phone: e.target.value }));
                }}
                placeholder="0987xxx..."
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="role">Vai trò</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="w-full rounded border px-3 py-2 text-sm border-neutral-300 focus:ring-2 focus:ring-primary-500"
              >
                <option value="USER">USER</option>
                <option value="DOANHNGHIEP">DOANHNGHIEP</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Huỷ</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loader-small" /> : (isEdit ? 'Lưu thay đổi' : 'Tạo mới')}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
