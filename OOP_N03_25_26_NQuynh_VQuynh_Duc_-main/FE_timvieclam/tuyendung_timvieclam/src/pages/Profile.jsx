import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getCompanyProfile, updateCompanyProfile } from '../services/companyService'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FaBuilding, FaMapMarkerAlt, FaGlobe, FaUsers } from 'react-icons/fa'

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const FormSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--neutral-200);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--neutral-700);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--neutral-300);
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-100);
  }
`

const EditorContainer = styled.div`
  .quill {
    border-radius: 0.375rem;
    border: 1px solid var(--neutral-300);
    
    .ql-toolbar {
      border-top-left-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
      border-bottom: 1px solid var(--neutral-300);
      background-color: var(--neutral-50);
    }
    
    .ql-container {
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      min-height: 200px;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: var(--primary-600);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--primary-700);
    }
    
    &:disabled {
      background-color: var(--neutral-400);
      cursor: not-allowed;
    }
  }
`

const HelperText = styled.p`
  font-size: 0.875rem;
  color: var(--neutral-500);
  margin-top: 0.25rem;
`

const ErrorMessage = styled.div`
  color: var(--error-500);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const CompanyImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`

const Profile = () => {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    ten_doanh_nghiep: '',
    tinh: '',
    dia_chi: '',
    website: '',
    quy_mo_nhan_su: '',
    avt: '',
    gioi_thieu: ''
  })
  
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await getCompanyProfile(currentUser?.companyId || 3)
        setFormData(response.data)
      } catch (error) {
        console.error('Error fetching company profile:', error)
        toast.error('Failed to load company profile')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCompanyProfile()
  }, [currentUser])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // Lấy file đầu tiên người dùng chọn
    if (file) {
      // Nếu người dùng chọn file, cập nhật giá trị `formData.avt` với file chọn
      setFormData({
        ...formData,
        avt: file,  // Lưu file vào state (nếu cần thiết, bạn có thể upload file này lên server sau)
      });
    }
    // Nếu không có file được chọn, không thay đổi giá trị `avt` trong `formData`
  };
  
  
  const handleEditorChange = (value) => {
    setFormData(prev => ({
      ...prev,
      gioi_thieu: value
    }))
    
    if (errors.gioi_thieu) {
      setErrors(prev => ({
        ...prev,
        gioi_thieu: null
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.ten_doanh_nghiep.trim()) {
      newErrors.ten_doanh_nghiep = 'Company name is required'
    }
    
    if (!formData.dia_chi.trim()) {
      newErrors.dia_chi = 'Address is required'
    }
    
    if (formData.website && !formData.website.match(/^https?:\/\/.+\..+$/)) {
      newErrors.website = 'Please enter a valid URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting')
      return
    }
    
    setSaving(true)
    
    try {
      await updateCompanyProfile(currentUser?.companyId || 3, formData)
      toast.success('Company profile updated successfully')
    } catch (error) {
      console.error('Error updating company profile:', error)
      toast.error('Failed to update company profile')
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) {
    return <p>Loading company profile...</p>
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Company Profile</h1>
        <p style={{ color: 'var(--neutral-600)' }}>
          Manage your company information and branding
        </p>
      </PageHeader>
      
      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          
          <CompanyImage $src={formData.avt || 'https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          
          <FormGroup>
            <Label htmlFor="avt">Company Logo</Label>
            <Input
                id="avt"
                name="avt"
                type="file"  // Đổi thành type="file" để chọn ảnh từ máy tính
                onChange={handleFileChange} // Gọi hàm xử lý khi người dùng chọn file
            />
            <HelperText>Choose an image for your company logo or banner</HelperText>
            </FormGroup>

          
          <FormGroup>
            <Label htmlFor="ten_doanh_nghiep">
              <FaBuilding /> Company Name*
            </Label>
            <Input
              id="ten_doanh_nghiep"
              name="ten_doanh_nghiep"
              value={formData.ten_doanh_nghiep}
              onChange={handleChange}
              placeholder="Enter your company name"
            />
            {errors.ten_doanh_nghiep && <ErrorMessage>{errors.ten_doanh_nghiep}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="website">
              <FaGlobe /> Website
            </Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
            {errors.website && <ErrorMessage>{errors.website}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="quy_mo_nhan_su">
              <FaUsers /> Company Size
            </Label>
            <Input
              id="quy_mo_nhan_su"
              name="quy_mo_nhan_su"
              value={formData.quy_mo_nhan_su}
              onChange={handleChange}
              placeholder="e.g. 100-499 employees"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="dia_chi">
              <FaMapMarkerAlt /> Address*
            </Label>
            <Input
              id="dia_chi"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
              placeholder="Enter your company address"
            />
            {errors.dia_chi && <ErrorMessage>{errors.dia_chi}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="tinh">Province/City</Label>
            <Input
              id="tinh"
              name="tinh"
              value={formData.tinh}
              onChange={handleChange}
              placeholder="Enter province or city"
            />
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Company Description</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="gioi_thieu">About Your Company</Label>
            <EditorContainer>
              <ReactQuill
                value={formData.gioi_thieu}
                onChange={handleEditorChange}
                placeholder="Describe your company, culture, and what makes you unique..."
              />
            </EditorContainer>
          </FormGroup>
        </FormSection>
        
        <ButtonContainer>
          <Button 
            type="submit" 
            className="primary"
            disabled={saving}
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </ButtonContainer>
      </form>
    </PageContainer>
  )
}

export default Profile