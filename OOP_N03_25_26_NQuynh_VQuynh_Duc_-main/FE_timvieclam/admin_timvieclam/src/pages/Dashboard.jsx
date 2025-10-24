import { useState, useEffect } from 'react';
import { FiUsers, FiList, FiBriefcase, FiHome, FiMail } from 'react-icons/fi';
import StatCard from '../components/ui/StatCard';
import { fetchDashboardStats } from '../services/api';
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardStats = await fetchDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        setError(err.message || 'Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center text-error-600 p-8">
        <FiList className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Lỗi khi tải Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">
          Tổng quan dữ liệu và thống kê ứng dụng của bạn
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Tổng Users"
          value={stats.totalUsers}
          icon={<FiUsers className="h-5 w-5" />}
          color="blue"
          percentage="0"
          trend="up"
        />
        
        <StatCard
          title="Tổng Jobs Type"
          value={stats.totalJobTypes}
          icon={<FiList className="h-5 w-5" />}
          color="purple"
          percentage="0"
          trend="up"
        />
        
        <StatCard
          title="Tổng Việc Làm"
          value={stats.totalViecLam}
          icon={<FiBriefcase className="h-5 w-5" />}
          color="green"
          percentage="0"
          trend="up"
        />
        
        <StatCard
          title="Tổng Doanh Nghiệp"
          value={stats.totalDoanhNghiep}
          icon={<FiHome className="h-5 w-5" />}
          color="orange"
          percentage="0"
          trend="up"
        />
        
        <StatCard
          title="Tổng Đơn Ứng Tuyển"
          value={stats.totalDonUngTuyen}
          icon={<FiMail className="h-5 w-5" />}
          color="red"
          percentage="0"
          trend="up"
        />
      </div>
    </div>
  );
};

export default Dashboard;
