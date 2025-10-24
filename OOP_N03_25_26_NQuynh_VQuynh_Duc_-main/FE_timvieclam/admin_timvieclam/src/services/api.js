async function fetchDashboardStats() {
  try {
    const response = await fetch('http://localhost:8080/api/dashboard/stats');
    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }
    const stats = await response.json();
    console.log('Dashboard stats:', stats);
    return stats;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu dashboard:', error);
  }
}
export { fetchDashboardStats };