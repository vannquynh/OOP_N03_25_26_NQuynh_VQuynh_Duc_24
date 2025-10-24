import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const JobDetailModal = ({ isOpen, onClose, job, loading }) => {
  if (!isOpen) return null;

  const Badge = ({ children }) => (
    <span className="px-2 py-0.5 rounded text-xs bg-primary-50 text-primary-700">
      {children}
    </span>
  );

  const Row = ({ label, children }) => (
    <div className="grid grid-cols-12 gap-3 py-2 border-b border-neutral-100">
      <div className="col-span-4 md:col-span-3 text-neutral-500">{label}</div>
      <div className="col-span-8 md:col-span-9">{children}</div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết việc làm" size="5xl">
      <div className="p-4">
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <span className="loader" />
          </div>
        ) : !job ? (
          <div className="text-center text-neutral-500">Không tìm thấy dữ liệu</div>
        ) : (
          <div>
            {/* header */}
            <div className="flex items-start gap-4 mb-4">
              {job.avt ? (
                <img
                  src={typeof job.avt === 'string' ? job.avt : URL.createObjectURL(job.avt)}
                  alt="avt"
                  className="w-20 h-20 object-cover rounded"
                />
              ) : (
                <div className="w-20 h-20 rounded bg-neutral-100 flex items-center justify-center text-neutral-400">
                  No Img
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{job.ten_viec_lam}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge>{job?.loaiViec?.ten_loai_viec || 'N/A'}</Badge>
                  <Badge>{job?.linhVuc?.ten_linh_vuc || 'N/A'}</Badge>
                  <Badge>{job.status || 'N/A'}</Badge>
                </div>
                <div className="text-neutral-500 text-sm mt-1">
                  Tạo lúc: {job.createdAt ? new Date(job.createdAt).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* body */}
            <div className="rounded border border-neutral-200">
              <Row label="Mức lương">
                {job.muc_luong || 'N/A'}
              </Row>
              <Row label="Số lượng tuyển">
                {job.so_luong_tuyen ?? 'N/A'}
              </Row>
              <Row label="Địa chỉ">
                {job.dia_chi || 'N/A'}
              </Row>
              <Row label="Doanh nghiệp">
                <div>
                  <div className="font-medium">{job?.doanhNghiep?.ten_doanh_nghiep || 'N/A'}</div>
                  <div className="text-sm text-neutral-500">
                    {job?.doanhNghiep?.dia_chi || ''} {job?.doanhNghiep?.tinh ? `(${job.doanhNghiep.tinh})` : ''}
                  </div>
                  {job?.doanhNghiep?.website && (
                    <a
                      href={job.doanhNghiep.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-600 text-sm underline"
                    >
                      {job.doanhNghiep.website}
                    </a>
                  )}
                </div>
              </Row>
              <Row label="Mô tả">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.mo_ta || '' }}
                />
              </Row>
              <Row label="Yêu cầu công việc">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.yeu_cau_cong_viec || '' }}
                />
              </Row>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const ViecLamList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // NEW: state cho xem chi tiết
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/vieclam/admin');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      toast.error('Không tải được danh sách việc làm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/vieclam/${deleteModal.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      toast.success('Xoá việc làm thành công');
      setDeleteModal({ isOpen: false, id: null });
      fetchJobs();
    } catch {
      toast.error('Xoá thất bại');
    }
  };

  const handleUpdateStatus = async (id) => {
    const status = 'ACCEPTED';
    try {
      const res = await fetch(`http://localhost:8080/api/vieclam/${id}/status?status=${status}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        toast.error(errorMessage || 'Cập nhật trạng thái thất bại');
        return;
      }
      toast.success('Cập nhật trạng thái thành công');
      fetchJobs();
    } catch (error) {
      toast.error('Lỗi khi gọi API: ' + error.message);
    }
  };

  // NEW: mở modal xem chi tiết
  const openDetail = async (row) => {
    // nếu hàng đã có đủ dữ liệu thì mở trực tiếp
    if (row?.mo_ta && row?.yeu_cau_cong_viec && row?.doanhNghiep) {
      setSelectedJob(row);
      setDetailModalOpen(true);
      return;
    }
    // nếu thiếu, fetch chi tiết
    try {
      setLoadingDetail(true);
      setDetailModalOpen(true);
      const res = await fetch(`http://localhost:8080/api/vieclam/${row.ma_viec_lam}`);
      if (!res.ok) throw new Error();
      const full = await res.json();
      setSelectedJob(full);
    } catch {
      toast.error('Không tải được chi tiết việc làm');
      setSelectedJob(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const columns = [
    { field: 'ma_viec_lam', header: 'ID' },
    { field: 'ten_viec_lam', header: 'Tên việc' },
    { field: 'muc_luong', header: 'Lương' },
    { field: 'so_luong_tuyen', header: 'Số lượng' },
    { field: 'dia_chi', header: 'Địa chỉ' },
    {
      field: 'status',
      header: 'Trạng thái',
      render: (row) =>
        row.status === 'PENDING' ? (
          <button onClick={() => handleUpdateStatus(row.ma_viec_lam)} className="btn btn-success">
            ACCEPT
          </button>
        ) : (
          <button className="btn btn-muted" disabled>ACCEPTED</button>
        ),
    },
    // NEW: cột xem chi tiết
    {
      field: 'actions',
      header: 'Xem',
      render: (row) => (
        <button
          type="button"
          className="btn btn-light flex items-center gap-1"
          onClick={() => openDetail(row)}
          title="Xem chi tiết"
        >
          <FiEye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Việc làm</h1>
          <p className="text-gray-500">Quản lý tin tuyển dụng</p>
        </div>
        <Link to="/vieclam/create" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Thêm việc làm
        </Link>
      </div>

      <DataTable
        data={jobs}
        columns={columns}
        resourceName="vieclam"
        onDelete={(row) => confirmDelete(row.ma_viec_lam)}
        isLoading={loading}
      />

      {/* Modal xác nhận xoá */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        title="Xác nhận xoá"
      >
        <div className="p-4 mb-4 bg-error-50 text-error-800 rounded-md flex items-start">
          <FiTrash2 className="mr-3 mt-0.5 w-5 h-5" />
          <p>Bạn chắc chắn muốn xoá? Hành động này không thể hoàn tác.</p>
        </div>
        <div className="flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={() => setDeleteModal({ isOpen: false, id: null })}>
            Huỷ
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xoá
          </button>
        </div>
      </Modal>

      {/* Modal chi tiết việc làm */}
      <JobDetailModal
        isOpen={detailModalOpen}
        onClose={() => { setDetailModalOpen(false); setSelectedJob(null); }}
        job={selectedJob}
        loading={loadingDetail}
      />
    </div>
  );
};

export default ViecLamList;
