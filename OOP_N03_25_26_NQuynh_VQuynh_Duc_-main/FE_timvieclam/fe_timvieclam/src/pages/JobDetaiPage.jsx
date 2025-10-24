import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiBookmark, FiStar } from 'react-icons/fi';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useJob } from '../hooks/useJob';
import axios from 'axios';

const JobDetailPage = () => {
  const { id } = useParams();
  const { getJobById, toggleSavedJob, isJobSaved } = useJob();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isApplied, setIsApplied] = useState(false); // Thêm state để lưu trạng thái đã ứng tuyển

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const { data: jobData } = await axios.get(`http://localhost:8080/api/vieclam/${id}`);
        setJob(jobData);
        setIsSaved(isJobSaved(jobData.ma_viec_lam));
  
        // Kiểm tra nếu người dùng đã ứng tuyển cho công việc này
        if (token) {
          // Thay vì gửi token trong headers, gửi nó qua query parameter
          const response = await axios.get(`http://localhost:8080/api/vieclam/${id}/check-applied`, {
            params: { token: token }, // Token truyền qua query params
          });
          setIsApplied(response.data); // Nếu trả về true, người dùng đã ứng tuyển
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Job not found');
        } else {
          setError('Failed to load job details');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchJob();
  }, [id, isJobSaved]);
  

  const handleSaveJob = () => {
    toggleSavedJob(job.id);
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    setShowApplyForm(true);
  };

  const handleApplySubmit = async (event) => {
    event.preventDefault(); // Ngừng reload trang khi submit form
    const emailFromSession = sessionStorage.getItem('email');
    const formData = new FormData();
    formData.append("full_name", event.target.name.value);
    formData.append("email", event.target.email.value);
    formData.append("cau_hoi", event.target.question.value);
    formData.append("ghi_chu", event.target.coverLetter.value || "");
    formData.append("status", "PENDING");  // Ví dụ status, có thể thay đổi tùy theo yêu cầu
    formData.append("ma_viec_lam", job.ma_viec_lam); // Gửi mã việc làm
    formData.append("emailUser", emailFromSession); // Thay "someUserId" bằng ID thực tế của người dùng

    const resumeFile = event.target.resume.files[0];
    if (resumeFile) {
      formData.append("tep_dinh_kem", resumeFile);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/ungtuyen", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Xử lý thành công, ví dụ như thông báo cho người dùng
        alert("Application submitted successfully!");
        setIsApplied(true); // Đánh dấu là đã ứng tuyển
      } else {
        alert("Failed to submit the application.");
      }
    } catch (err) {
      console.error("Error submitting application", err);
      alert("An error occurred while submitting the application.");
    } finally {
      setShowApplyForm(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center md:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{error}</h2>
        <Link to="/jobs">
          <Button variant="primary">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="mb-8">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-primary-600 hover:underline dark:text-primary-400"
        >
          <FiArrowLeft />
          <span>Back to Jobs</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card mb-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <img
                    src={job.doanhNghiep.avt}
                    alt={`${job.doanhNghiep.ten_doanh_nghiep} logo`}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                <div>
                  <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                    {job.ten_viec_lam}
                  </h1>

                  <Link
                    to={`/companies/${job.doanhNghiep.ma_doanh_nghiep}`}
                    className="text-lg font-medium text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {job.doanhNghiep.ten_doanh_nghiep}
                  </Link>
                </div>
              </div>

              <button
                onClick={handleSaveJob}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isSaved
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={isSaved ? 'Unsave job' : 'Save job'}
              >
                {isSaved ? <FiStar className="fill-current" size={20} /> : <FiBookmark size={20} />}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiMapPin />
                <span>{job.dia_chi}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiClock />
                <span>{job.loaiViec.ten_loai_viec}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiDollarSign />
                <span>{job.muc_luong}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card mb-8"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Job Description</h2>
            <div
              className="mb-6 text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: job.mo_ta }}
            />

            <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Requirements:</h3>
            <div
              className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: job.yeu_cau_cong_viec }}
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24 space-y-6"
          >
            {/* Actions Card */}
            <div className="card">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Apply for this job</h3>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleApply}
                  disabled={isApplied} // Disable button nếu đã ứng tuyển
                >
                  {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
              </div>
            </div>

            {/* Company Card */}
            <div className="card">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">About the Company</h3>

              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <img
                    src={job.doanhNghiep.avt}
                    alt={`${job.doanhNghiep.ten_doanh_nghiep} logo`}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{job.doanhNghiep.ten_doanh_nghiep}</h4>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-800 dark:text-gray-400">
                <div className="flex flex-wrap">
                  <span className="font-medium mr-1">Giới thiệu:</span>
                  <span
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: job.doanhNghiep.gioi_thieu }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Application Form Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Apply for {job.title}</h2>
            
            <form className="space-y-4" onSubmit={handleApplySubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="input mt-1" 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="input mt-1" 
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question
                </label>
                <input 
                  type="text" 
                  id="question" 
                  className="input mt-1" 
                  placeholder="Enter your question"
                />
              </div>
              
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resume
                </label>
                <input 
                  type="file" 
                  id="resume" 
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:file:bg-primary-900/30 dark:file:text-primary-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Letter
                </label>
                <textarea 
                  id="coverLetter" 
                  rows="4" 
                  className="input mt-1" 
                  placeholder="Write your cover letter"
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="primary" 
                  type="submit"
                
                >
                  Submit Application
                
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
