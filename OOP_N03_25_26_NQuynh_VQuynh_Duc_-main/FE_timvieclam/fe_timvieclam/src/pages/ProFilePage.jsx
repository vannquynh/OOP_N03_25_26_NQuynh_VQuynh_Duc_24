import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiEdit, FiMail, FiPhone, FiMapPin, FiFileText, FiGlobe, FiList, FiBookmark, FiBriefcase } from 'react-icons/fi'
import Button from '../components/common/Button'
import JobCard from '../components/jobs/JobCard'
import { useJob } from '../hooks/useJob'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfilePage = () => {
  const { getSavedJobs } = useJob()
  const [activeTab, setActiveTab] = useState('profile')
  const [editMode, setEditMode] = useState(false)
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    skills: []
  });


  const navigate = useNavigate(); 
  // Lấy token từ sessionStorage
  const token = sessionStorage.getItem('token');

  // Nếu không có token, chuyển hướng về trang login
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Chuyển hướng về trang login
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/profiles/me', {
            token: token // Gửi token trong body
          });
  
          // Lấy email từ sessionStorage và set vào formData
          const emailFromSession = sessionStorage.getItem('email'); // Lấy email từ session
          console.log('Email from session:', emailFromSession);
          setFormData({
            fullName: response.data.fullName,
            title: response.data.professionalTitle,
            email: emailFromSession || response.data.email,
            phone: response.data.phone,
            location: response.data.location,
            bio: response.data.bio,
            website: response.data.website,
            skills: response.data.skills 
              ? response.data.skills.split(',').map(skill => skill.trim()) 
              : [] 
          });
           // Gọi API để lấy danh sách ứng tuyển của người dùng
           const applicationsResponse = await axios.get('http://localhost:8080/api/ungtuyen/getByUser', {
            params: { token: token } // Truyền token dưới dạng query parameter
          });

          setApplications(applicationsResponse.data); // Gán dữ liệu ứng tuyển vào state
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
  
      fetchProfileData();
    }
  }, [token, navigate]);
  



  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  
  const handleEditToggle = async () => {
    if (editMode) {
      // Save changes by calling API
      try {
        const response = await axios.post('http://localhost:8080/api/profiles/create-or-update', 
          {
            fullName: formData.fullName,
            professionalTitle : formData.title,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            bio: formData.bio,
            website: formData.website,
            skills: formData.skills.join(', ') 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
  
        // Handle the response if necessary (update formData or show success message)
        setFormData({
          fullName: response.data.fullName,
          title: response.data.professionalTitle,
          email: emailFromSession || response.data.email,
          phone: response.data.phone,
          location: response.data.location,
          bio: response.data.bio,
          website: response.data.website,
          skills: response.data.skills 
            ? response.data.skills.split(',').map(skill => skill.trim()) 
            : [] 
        });
  
        // Optionally show a success message
        alert("Profile updated successfully!");
      } catch (error) {
        console.error('Error saving profile changes:', error);
      
      }
    }
    setEditMode(!editMode);
  }
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim())
    setFormData(prev => ({ ...prev, skills }))
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            {/* Personal Information */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={handleEditToggle}
                >
                  <FiEdit size={16} />
                  <span>{editMode ? 'Save Changes' : 'Edit Profile'}</span>
                </Button>
              </div>
              
              {editMode ? (
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="input mt-1"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="input mt-1"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white">{formData.email}</p>
                  </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input mt-1"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="input mt-1"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        className="input mt-1"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      className="input mt-1"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Skills (Mỗi skill cách nhau bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      className="input mt-1"
                      value={formData.skills.join(', ')}
                      onChange={handleSkillsChange}
                    />
                  </div>
                </form>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  <ProfileItem icon={<FiUser />} label="Full Name" value={formData.fullName} />
                  <ProfileItem icon={<FiBriefcase />} label="Professional Title" value={formData.title} />
                  <ProfileItem icon={<FiMail />} label="Email" value={formData.email} />
                  <ProfileItem icon={<FiPhone />} label="Phone" value={formData.phone} />
                  <ProfileItem icon={<FiMapPin />} label="Location" value={formData.location} />
                  <ProfileItem icon={<FiGlobe />} label="Website" value={formData.website} isLink />
                  <div className="md:col-span-2">
                    <ProfileItem icon={<FiFileText />} label="Bio" value={formData.bio} />
                  </div>
                </div>
              )}
            </section>
            
            {/* Skills */}
            {!editMode && (
              <section>
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
          </div>
        )
      case 'applications':
        return (
          <div>
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Job Applications</h3>
            
            <div className="space-y-4">
              {applications.map((application, index) => {
          const formattedDate = new Date(application.createAt).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return (
            <ApplicationItem 
              key={index}
              title={application.viecLam.ten_viec_lam}
              company={application.viecLam.doanhNghiep.ten_doanh_nghiep}
              status={application.status}
              date={formattedDate}
            />
          );
              })}
            </div>
          </div>
        )
      default:
        return null
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        My Profile
      </h1>
      
      <div className="mb-8 rounded-lg bg-white shadow-md dark:bg-gray-800">
        <nav className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
          <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => handleTabChange('profile')}
            icon={<FiUser />}
            label="Profile"
          />
          <TabButton 
            active={activeTab === 'applications'} 
            onClick={() => handleTabChange('applications')}
            icon={<FiList />}
            label="Applications"
          />
          
        </nav>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium md:px-6 md:text-base ${
        active 
          ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' 
          : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

const ProfileItem = ({ icon, label, value, isLink = false }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {icon}
        <span>{label}</span>
      </div>
      {isLink ? (
        <a 
          href={value} 
          target="_blank" 
          rel="noreferrer" 
          className="text-primary-600 hover:underline dark:text-primary-400"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900 dark:text-white">{value}</p>
      )}
    </div>
  )
}

const ApplicationItem = ({ title, company, status, date }) => {
  const statusColors = {
    PENDING: 'text-warning-600 bg-warning-50',
    reviewed: 'text-primary-600 bg-primary-50',
    rejected: 'text-error-600 bg-error-50'
  }
  
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Applied on {date}</p>
      </div>
      <div className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  )
}

export default ProfilePage