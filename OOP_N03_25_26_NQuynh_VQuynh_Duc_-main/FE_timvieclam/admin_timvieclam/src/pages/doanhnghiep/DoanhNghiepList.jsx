import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const DoanhNghiepList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const navigate = useNavigate();

  /* fetch */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/doanhnghiep');
      const data = await res.json();
      setList(data);
    } catch {
      toast.error('Không tải được danh sách doanh nghiệp');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchAll(); }, []);

  /* delete */
  const confirmDelete = (id) => setModal({ open: true, id });
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/doanhnghiep/${modal.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      toast.success('Đã xoá doanh nghiệp');
      setModal({ open: false, id: null });
      fetchAll();
    } catch {
      toast.error('Xoá thất bại');
    }
  };

  /* columns */
  const columns = [
    { field: 'ma_doanh_nghiep', header: 'ID' },
    { field: 'ten_doanh_nghiep', header: 'Tên DN' },
    { field: 'dia_chi', header: 'Địa chỉ' },
    { field: 'website', header: 'Website' },
    { field: 'quy_mo_nhan_su', header: 'Quy mô nhân sự' },
    { field: 'avt', header: 'Ảnh' },
    { field: 'gioi_thieu', header: 'Giới thiệu' },
    {
      body: (row) => (
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-outline-primary"
            onClick={() => navigate(`/doanhnghiep/edit/${row.ma_doanh_nghiep}`)}
          >
            <FiEdit2 />
          </button>
          <button
            className="btn btn-xs btn-outline-danger"
            onClick={() => confirmDelete(row.ma_doanh_nghiep)}
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Doanh nghiệp</h1>
          <p className="text-gray-500">Quản lý thông tin doanh nghiệp</p>
        </div>
        <Link to="/doanhnghiep/create" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Thêm DN
        </Link>
      </div>

      <DataTable data={list} columns={columns} isLoading={loading} resourceName="doanhnghiep"/>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, id: null })}
        title="Xác nhận xoá"
      >
        <div className="p-4 mb-4 bg-error-50 text-error-800 rounded-md flex items-start">
          <FiTrash2 className="mr-3 mt-0.5 w-5 h-5" />
          <p>Bạn chắc chắn muốn xoá doanh nghiệp này?</p>
        </div>
        <div className="flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={() => setModal({ open: false, id: null })}>
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

export default DoanhNghiepList;
