import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const LoaiViecList = () => {
  const [loaiViecs, setLoaiViecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchLoaiViecs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/loaiviec');
      const data = await response.json();
      setLoaiViecs(data);
    } catch (error) {
      toast.error('Failed to load job types');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoaiViecs();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/loaiviec/${deleteModal.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Job type deleted successfully');
        setDeleteModal({ isOpen: false, id: null });
        // Reload the data after successful deletion
        fetchLoaiViecs();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete job type');
      console.error(error);
    }
  };

  const columns = [
    { field: 'ma_loai_viec', header: 'ID' },
    { field: 'ten_loai_viec', header: 'Job Type Name' },
  ];

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id: id.ma_loai_viec });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Job Types</h1>
          <p className="text-gray-500">Manage job types and categories</p>
        </div>
        <Link to="/loaiviec/create" className="btn btn-primary flex items-center">
          <FiPlus className="mr-1" /> Add Job Type
        </Link>
      </div>

      <DataTable
        data={loaiViecs}
        columns={columns}
        resourceName="loaiviec"
        onDelete={confirmDelete}
        isLoading={loading}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        title="Confirm Delete"
      >
        <div>
          <div className="p-4 mb-4 bg-error-50 text-error-800 rounded-md flex items-start">
            <FiTrash2 className="mr-3 mt-0.5 w-5 h-5" />
            <p>Are you sure you want to delete this job type? This action cannot be undone.</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoaiViecList;