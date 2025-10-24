import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const UngTuyenList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const navigate = useNavigate();

  /* ---------- fetch danh sách ---------- */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/ungtuyen');
      const data = await res.json();
      setList(data);
    } catch {
      toast.error('Không tải được danh sách ứng tuyển');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ---------- xử lý xoá ---------- */
  const confirmDelete = (id) => setModal({ open: true, id });
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/ungtuyen/${modal.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      toast.success('Đã xoá ứng tuyển');
      setModal({ open: false, id: null });
      fetchAll();
    } catch {
      toast.error('Xoá thất bại');
    }
  };

  /* ---------- định nghĩa cột hiển thị ---------- */
  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'full_name', header: 'Họ và Tên' },
    { field: 'email', header: 'Email' },
    { field: 'cau_hoi', header: 'Câu hỏi' },
    { field: 'status', header: 'Trạng thái' },
    // Bạn có thể thêm cột ghi chú, đính kèm nếu muốn hiển thị:
    { field: 'ghi_chu', header: 'Ghi chú' },
    { field: 'tep_dinh_kem', header: 'Tệp đính kèm' },
    {
      header: 'Hành động',
      body: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/ungtuyen/edit/${row.id}`}
            className="btn btn-xs btn-outline-primary"
          >
            <FiEdit2 />
          </Link>
          <button
            className="btn btn-xs btn-outline-danger"
            onClick={() => confirmDelete(row.id)}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  /* ---------- giao diện ---------- */
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Ứng tuyển</h1>
          <p className="text-gray-500">Quản lý thông tin ứng tuyển</p>
        </div>
        <Link to="/ungtuyen/create" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Thêm ứng tuyển
        </Link>
      </div>

      <DataTable
        data={list}
        columns={columns}
        isLoading={loading}
        resourceName="ungtuyen" // Prop này để DataTable tạo liên kết đúng
      />

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, id: null })}
        title="Xác nhận xoá"
      >
        <div className="p-4 mb-4 bg-error-50 text-error-800 rounded-md flex items-start">
          <FiTrash2 className="mr-3 mt-0.5 w-5 h-5" />
          <p>Bạn chắc chắn muốn xoá ứng tuyển này?</p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-secondary"
            onClick={() => setModal({ open: false, id: null })}
          >
            Huỷ
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xoá
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UngTuyenList;
