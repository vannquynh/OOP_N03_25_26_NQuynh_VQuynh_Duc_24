import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FormField from '../../components/ui/FormField';

const LoaiViecForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loaiViec, setLoaiViec] = useState({
    ten_loai_viec: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    const fetchLoaiViec = async () => {
      if (isEditMode) {
        try {
          setFetchLoading(true);
          const response = await fetch(`http://localhost:8080/api/loaiviec/${id}`);
          const data = await response.json();
          setLoaiViec(data);
        } catch (error) {
          toast.error('Failed to load job type data');
          navigate('/loaiviec');
        } finally {
          setFetchLoading(false);
        }
      }
    };

    fetchLoaiViec();
  }, [id, isEditMode, navigate]);

  const handleChange = ({ name, value }) => {
    setLoaiViec((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loaiViec.ten_loai_viec.trim()) {
      newErrors.ten_loai_viec = 'Job type name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const url = isEditMode 
        ? `http://localhost:8080/api/loaiviec/${id}`
        : 'http://localhost:8080/api/loaiviec';
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loaiViec),
      });

      if (response.ok) {
        toast.success(isEditMode ? 'Job type updated successfully' : 'Job type created successfully');
        navigate('/loaiviec');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update job type' : 'Failed to create job type');
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
            {isEditMode ? 'Edit Job Type' : 'Create Job Type'}
          </h1>
          <p className="text-gray-500">
            {isEditMode ? 'Update job type information' : 'Add a new job type to the system'}
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <FormField
            label="Job Type Name"
            name="ten_loai_viec"
            value={loaiViec.ten_loai_viec}
            onChange={handleChange}
            placeholder="Enter job type name"
            error={errors.ten_loai_viec}
            required
          />

          <div className="flex justify-end space-x-3 mt-8">
            <Link to="/loaiviec" className="btn btn-secondary flex items-center">
              <FiX className="mr-1" /> Cancel
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
              {isEditMode ? 'Update Job Type' : 'Create Job Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoaiViecForm;