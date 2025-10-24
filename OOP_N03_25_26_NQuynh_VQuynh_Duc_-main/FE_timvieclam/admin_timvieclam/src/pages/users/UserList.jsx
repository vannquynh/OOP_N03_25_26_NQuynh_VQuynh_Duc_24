import { useEffect, useMemo, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import UserFormModal from './UserFormModal';
import { deleteUser, fetchUsers } from '../../services/userApi';
import Modal from '../../components/ui/Modal';

export default function UserList() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('createdAt,desc');
  const [kw, setKw] = useState('');
  const [kwInput, setKwInput] = useState('');

  const [data, setData] = useState({ content: [], totalElements: 0, totalPages: 0, number: 0 });
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers({ page, size, sort, kw });
      setData(res);
    } catch {
      toast.error('Không tải được danh sách user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, size, sort, kw]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setKw(kwInput.trim());
  };

  const onCreate = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const onEdit = (id) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const onDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const doDelete = async () => {
    try {
      await deleteUser(deleteId);
      toast.success('Xoá user thành công');
      setConfirmOpen(false);
      setDeleteId(null);
      // nếu xoá hết trang, lùi về trang trước
      if (data.content.length === 1 && page > 0) setPage((p) => p - 1);
      else load();
    } catch {
      toast.error('Xoá thất bại');
    }
  };

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < (data.totalPages || 0); i++) arr.push(i);
    return arr;
  }, [data.totalPages]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Người dùng</h1>
          <p className="text-gray-500">Quản lý người dùng hệ thống</p>
        </div>
        <button className="btn btn-primary flex items-center" onClick={onCreate}>
          <FiPlus className="mr-1" /> Thêm user
        </button>
      </div>

      {/* Search & page size */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <form onSubmit={onSearch} className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={kwInput}
              onChange={(e) => setKwInput(e.target.value)}
              placeholder="Tìm username/email/phone"
              className="pl-9 pr-3 py-2 rounded border border-neutral-300 text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="btn btn-secondary" type="submit">Tìm</button>
        </form>

        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Hiển thị</span>
          <select
            value={size}
            onChange={(e) => { setPage(0); setSize(Number(e.target.value)); }}
            className="rounded border px-2 py-1 text-sm border-neutral-300"
          >
            {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-neutral-50">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2 cursor-pointer" onClick={() => setSort(sort.startsWith('username') ? 'username,' + (sort.endsWith('asc') ? 'desc' : 'asc') : 'username,asc')}>Username</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-3 py-6 text-center"><span className="loader" /></td></tr>
            ) : data.content.length === 0 ? (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-neutral-500">Không có dữ liệu</td></tr>
            ) : (
              data.content.map((u, idx) => (
                <tr key={u.id} className="border-t">
                  <td className="px-3 py-2">{page * size + idx + 1}</td>
                  <td className="px-3 py-2 font-medium">{u.username}</td>
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2">{u.phone || '-'}</td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 rounded bg-primary-50 text-primary-700 text-xs border border-primary-100">{u.role}</span>
                  </td>
                  <td className="px-3 py-2">{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn btn-light" onClick={() => onEdit(u.id)}><FiEdit2 /></button>
                      <button className="btn btn-danger" onClick={() => onDelete(u.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-neutral-500">
          Tổng: {data.totalElements || 0}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="btn btn-light"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            «
          </button>
          {pages.slice(Math.max(0, page - 2), page + 3).map((p) => (
            <button
              key={p}
              className={`btn ${p === page ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="btn btn-light"
            disabled={page >= (data.totalPages || 1) - 1}
            onClick={() => setPage((p) => Math.min((data.totalPages || 1) - 1, p + 1))}
          >
            »
          </button>
        </div>
      </div>

      {/* Modal tạo/sửa */}
      <UserFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={editingId}
        onSuccess={load}
      />

      {/* Confirm xoá */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Xác nhận xoá user"
        maxWidth="sm"
      >
        <div className="p-2">
          <p>Hành động này không thể hoàn tác. Bạn có chắc chắn?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button className="btn btn-secondary" onClick={() => setConfirmOpen(false)}>Huỷ</button>
            <button className="btn btn-danger" onClick={doDelete}>Xoá</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
