import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getJobById, updateJob } from '../services/jobService'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { API_URL } from '../config/constants'
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios';
const HeaderContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--neutral-600);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-600);
  }
`

const FormContainer = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--neutral-300);
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  
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
  
  &.secondary {
    background-color: white;
    color: var(--neutral-700);
    border: 1px solid var(--neutral-300);
    
    &:hover {
      background-color: var(--neutral-100);
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

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [jobTypes, setJobTypes] = useState([])
 const [industryFields, setIndustryFields] = useState([])

 // Fetch jobTypes and industryFields on mount
 useEffect(() => {
    async function fetchData() {
      try {
        const jobRes = await axios.get(`${API_URL}/loaiviec`)
        setJobTypes(jobRes.data.map(item => ({
          id: item.ma_loai_viec,
          name: item.ten_loai_viec.toUpperCase().replace(/\s/g, '_'),
          label: item.ten_loai_viec
        })))
      } catch (error) {
        console.error('Failed to fetch JOB_TYPES:', error)
      }
      try {
        const industryRes = await axios.get(`${API_URL}/linhvuc`)
        setIndustryFields(industryRes.data.map(item => ({
          id: item.ma_linh_vuc,
          name: item.ten_linh_vuc.toUpperCase().replace(/\s/g, '_'),
          label: item.ten_linh_vuc,
          jobCount: item.jobCount
        })))
      } catch (error) {
        console.error('Failed to fetch INDUSTRY_FIELDS:', error)
      }
    }
    fetchData()
  }, [])
   const [formData, setFormData] = useState({
     ten_viec_lam: '',
     avt: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
     muc_luong: '',
     mo_ta: '',
     yeu_cau_cong_viec: '',
     so_luong_tuyen: 1,
     dia_chi: '',
     ma_loai_viec: 1,
     ma_linh_vuc: 1
   })
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getJobById(id)
        setFormData(response.data)
      } catch (error) {
        console.error('Error fetching job details:', error)
        toast.error('Failed to load job details')
        navigate('/jobs')
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobDetails()
  }, [id, navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avt: file, // để file gốc, không convert base64
      }));
    }
  };
  const handleEditorChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.ten_viec_lam.trim()) {
      newErrors.ten_viec_lam = 'Job title is required'
    }
    
    if (!formData.muc_luong.trim()) {
      newErrors.muc_luong = 'Salary range is required'
    }
    
    if (!formData.dia_chi.trim()) {
      newErrors.dia_chi = 'Location is required'
    }
    
    if (!formData.mo_ta || formData.mo_ta === '<p><br></p>') {
      newErrors.mo_ta = 'Job description is required'
    }
    
    if (!formData.yeu_cau_cong_viec || formData.yeu_cau_cong_viec === '<p><br></p>') {
      newErrors.yeu_cau_cong_viec = 'Job requirements are required'
    }
    
    if (formData.so_luong_tuyen < 1) {
      newErrors.so_luong_tuyen = 'Number of positions must be at least 1'
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
  
      await updateJob(id, formData)
      toast.success('Job posting updated successfully')
      navigate(`/jobs/${id}`)
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error('Failed to update job posting')
    } finally {
      setSaving(false)
    }
  }
  
  const handleCancel = () => {
    navigate(`/jobs/${id}`)
  }
  
  if (loading) {
    return <p>Loading job details...</p>
  }
  
  return (
    <FormContainer>
      <HeaderContainer>
        <BackLink to={`/jobs/${id}`}>
          <FaArrowLeft /> Back to Job Details
        </BackLink>
      </HeaderContainer>
      
      <PageHeader>
        <h1>Edit Job Posting</h1>
        <p style={{ color: 'var(--neutral-600)' }}>
          Update the job posting details below
        </p>
      </PageHeader>
      
      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          
          <FormGrid>
            <FormGroup className="full-width">
              <Label htmlFor="ten_viec_lam">Job Title*</Label>
              <Input
                id="ten_viec_lam"
                name="ten_viec_lam"
                value={formData.ten_viec_lam}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
              />
              {errors.ten_viec_lam && <ErrorMessage>{errors.ten_viec_lam}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="ma_loai_viec">Job Type*</Label>
              <Select
                id="ma_loai_viec"
                name="ma_loai_viec"
                value={formData.ma_loai_viec}
                onChange={handleChange}
              >
                {jobTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="ma_linh_vuc">Industry*</Label>
              <Select
                id="ma_linh_vuc"
                name="ma_linh_vuc"
                value={formData.ma_linh_vuc}
                onChange={handleChange}
              >
                {industryFields.map(field => (
                  <option key={field.id} value={field.id}>{field.label}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="muc_luong">Salary Range*</Label>
              <Input
                id="muc_luong"
                name="muc_luong"
                value={formData.muc_luong}
                onChange={handleChange}
                placeholder="e.g. $3000 - $5000"
              />
              {errors.muc_luong && <ErrorMessage>{errors.muc_luong}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="dia_chi">Location*</Label>
              <Input
                id="dia_chi"
                name="dia_chi"
                value={formData.dia_chi}
                onChange={handleChange}
                placeholder="e.g. HN, VN"
              />
              {errors.dia_chi && <ErrorMessage>{errors.dia_chi}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="so_luong_tuyen">Number of Positions*</Label>
              <Input
                id="so_luong_tuyen"
                name="so_luong_tuyen"
                type="number"
                min="1"
                value={formData.so_luong_tuyen}
                onChange={handleChange}
              />
              {errors.so_luong_tuyen && <ErrorMessage>{errors.so_luong_tuyen}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup className="full-width">
              <Label htmlFor="avt">Job Image</Label>
              <Input
                id="avt"
                name="avt"
                type="file"   // <-- Thêm dòng này
                accept="image/*" // <-- Chỉ cho chọn ảnh
                onChange={handleFileChange} // <-- Viết hàm handle riêng
              />
              <HelperText>Leave empty to use default image</HelperText>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Job Details</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="mo_ta">Job Description*</Label>
            <EditorContainer>
              <ReactQuill
                value={formData.mo_ta}
                onChange={(value) => handleEditorChange('mo_ta', value)}
                placeholder="Describe the job role, responsibilities, and other details..."
              />
            </EditorContainer>
            {errors.mo_ta && <ErrorMessage>{errors.mo_ta}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="yeu_cau_cong_viec">Job Requirements*</Label>
            <EditorContainer>
              <ReactQuill
                value={formData.yeu_cau_cong_viec}
                onChange={(value) => handleEditorChange('yeu_cau_cong_viec', value)}
                placeholder="List the skills, experience, and qualifications required..."
              />
            </EditorContainer>
            {errors.yeu_cau_cong_viec && <ErrorMessage>{errors.yeu_cau_cong_viec}</ErrorMessage>}
          </FormGroup>
        </FormSection>
        
        <ButtonContainer>
          <Button 
            type="button" 
            className="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="primary"
            disabled={saving}
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  )
}

export default EditJob