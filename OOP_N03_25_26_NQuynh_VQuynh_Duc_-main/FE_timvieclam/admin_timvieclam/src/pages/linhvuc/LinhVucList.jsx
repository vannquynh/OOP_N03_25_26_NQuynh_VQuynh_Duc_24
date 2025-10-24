// src/pages/linhvuc/LinhVucList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const API_BASE = 'http://localhost:8080';

const LinhVucList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/linhvuc`);
      if (!res.ok) throw new Error('Fetch failed');
      const raw = await res.json();

      // ✅ Normalize để DataTable có key hợp lệ:
      // DataTable đang dùng item.id || item.ma_loai_viec
      // API trả ma_linh_vuc ⇒ ta thêm id & ma_loai_viec = ma_linh_vuc
      const normalized = raw.map((r) => ({
        ...r,
        id: r.ma_linh_vuc,
        ma_loai_viec: r.ma_linh_vuc,
      }));

      setRows(normalized);
    } catch (e) {
      toast.error('Không tải được danh sách lĩnh vực');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/linhvuc/${deleteModal.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Xóa lĩnh vực thành công');
      setDeleteModal({ isOpen: false, id: null });
      fetchData();
    } catch (e) {
      toast.error('Xóa lĩnh vực thất bại');
    }
  };

  // Hiển thị theo field gốc của API (không cần đổi)
  const columns = [
    { field: 'ma_linh_vuc', header: 'ID' },
    { field: 'ten_linh_vuc', header: 'Tên lĩnh vực' },
    {
      field: 'icon',
      header: 'Icon',
      render: (row) =>
        row.icon ? (
          <img
            src={row.icon}
            alt="icon"
            className="w-10 h-10 object-cover rounded border"
          />
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    { field: 'soLuongViecLam', header: 'Số việc' },
  ];

  const confirmDelete = (row) => {
    // do đã normalize, row.id luôn tồn tại
    setDeleteModal({ isOpen: true, id: row.id });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Lĩnh vực</h1>
          <p className="text-gray-500">Quản lý các lĩnh vực và số lượng việc làm</p>
        </div>
        <Link to="/linhvuc/create" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Thêm Lĩnh vực
        </Link>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        resourceName="linhvuc"
        onDelete={confirmDelete}
        isLoading={loading}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        title="Xác nhận xóa"
      >
        <div>
          <div className="p-4 mb-4 bg-error-50 text-error-800 rounded-md flex items-start">
            <FiTrash2 className="mr-3 mt-0.5 w-5 h-5" />
            <p>Bạn có chắc muốn xóa lĩnh vực này? Hành động không thể hoàn tác.</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
            >
              Hủy
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Xóa
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LinhVucList;
