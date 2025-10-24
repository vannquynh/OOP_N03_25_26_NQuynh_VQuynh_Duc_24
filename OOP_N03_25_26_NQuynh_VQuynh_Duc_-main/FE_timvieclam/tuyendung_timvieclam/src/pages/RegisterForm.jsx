import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerCompany } from '../services/authService'
import { FaBriefcase } from 'react-icons/fa'

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.25rem;
  background-color: var(--neutral-50);
`

const RegisterCard = styled.div`
  width: 100%;
  max-width: 960px; /* rộng hơn */
  background: white;
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-200);
  box-shadow: 0 10px 25px rgba(0,0,0,.06);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &:before {
    /* viền top mảnh tạo điểm nhấn */
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-600), #60a5fa);
  }

  @media (min-width: 768px) {
    padding: 2.25rem;
    border-radius: 1rem;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`

const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-600);
`

const Sub = styled.p`
  color: var(--neutral-600);
  margin-top: 0.375rem;
`

/* Grid 2 cột trên md, 1 cột trên mobile */
const Form = styled.form`
  display: grid;
  gap: 1.25rem;
`

/* Nhóm section có tiêu đề */
const Section = styled.div`
  padding-top: 0.75rem;
  border-top: 1px dashed var(--neutral-200);
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 0.75rem;
`

const Grid2 = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const FullRow = styled.div`
  grid-column: 1 / -1;
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

const Label = styled.label`
  font-weight: 500;
  color: var(--neutral-700);
`

const Input = styled.input`
  padding: 0.75rem 0.875rem;
  border: 1px solid ${({ $error }) => ($error ? 'var(--error-400)' : 'var(--neutral-300)')};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? 'var(--error-500)' : 'var(--primary-500)')};
    box-shadow: 0 0 0 3px ${({ $error }) =>
      $error ? 'rgba(239, 68, 68, .15)' : 'var(--primary-100)'};
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem 0.875rem;
  border: 1px solid ${({ $error }) => ($error ? 'var(--error-400)' : 'var(--neutral-300)')};
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? 'var(--error-500)' : 'var(--primary-500)')};
    box-shadow: 0 0 0 3px ${({ $error }) =>
      $error ? 'rgba(239, 68, 68, .15)' : 'var(--primary-100)'};
  }
`

const ErrorMessage = styled.div`
  color: var(--error-600);
  font-size: 0.875rem;
`

const Button = styled.button`
  grid-column: 1 / -1;
  background-color: var(--primary-600);
  color: white;
  padding: 0.9rem 1rem;
  border-radius: 0.6rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: transform .02s ease, background-color .2s ease;

  &:hover { background-color: var(--primary-700); }
  &:active { transform: translateY(1px); }
  &:disabled { background-color: var(--neutral-400); cursor: not-allowed; }
`

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  a {
    color: var(--primary-600);
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }
`

const RegisterForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    // user
    username: '',
    email: '',
    password: '',
    phone: '',
    // doanh nghiệp
    ten_doanh_nghiep: '',
    tinh: '',
    dia_chi: '',
    website: '',
    quy_mo_nhan_su: '',
    avt: '',
    gioi_thieu: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Vui lòng nhập username'
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    if (!formData.password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu'
    if (!formData.ten_doanh_nghiep.trim()) newErrors.ten_doanh_nghiep = 'Vui lòng nhập tên doanh nghiệp'
    if (!formData.tinh.trim()) newErrors.tinh = 'Vui lòng nhập tỉnh/thành'
    if (!formData.dia_chi.trim()) newErrors.dia_chi = 'Vui lòng nhập địa chỉ'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Vui lòng sửa các lỗi trong form')
      return
    }
    try {
      await registerCompany(formData)
      toast.success('Đăng ký thành công')
      navigate('/login')
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Đăng ký thất bại')
    }
  }

  return (
    <RegisterContainer>
      <RegisterCard>
        <Header>
          <Logo><FaBriefcase /> JobCreator Portal</Logo>
          <Sub>Tạo tài khoản doanh nghiệp mới</Sub>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Thông tin tài khoản</SectionTitle>
            <Grid2>
              <FormControl>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  $error={!!errors.username}
                  autoComplete="username"
                  placeholder="vd: johndoe"
                  required
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </FormControl>

              <FormControl>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  $error={!!errors.email}
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormControl>

              <FormControl>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  $error={!!errors.password}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              </FormControl>

              <FormControl>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="VD: 0981xxxxxx"
                />
              </FormControl>
            </Grid2>
          </Section>

          <Section>
            <SectionTitle>Thông tin doanh nghiệp</SectionTitle>
            <Grid2>
              <FullRow as={FormControl}>
                <Label htmlFor="ten_doanh_nghiep">Tên doanh nghiệp</Label>
                <Input
                  id="ten_doanh_nghiep"
                  name="ten_doanh_nghiep"
                  value={formData.ten_doanh_nghiep}
                  onChange={handleChange}
                  $error={!!errors.ten_doanh_nghiep}
                  autoComplete="organization"
                  placeholder="Công ty TNHH ABC"
                  required
                />
                {errors.ten_doanh_nghiep && <ErrorMessage>{errors.ten_doanh_nghiep}</ErrorMessage>}
              </FullRow>

              <FormControl>
                <Label htmlFor="tinh">Tỉnh/Thành</Label>
                <Input
                  id="tinh"
                  name="tinh"
                  value={formData.tinh}
                  onChange={handleChange}
                  $error={!!errors.tinh}
                  autoComplete="address-level1"
                  placeholder="Hà Nội, TP.HCM..."
                  required
                />
                {errors.tinh && <ErrorMessage>{errors.tinh}</ErrorMessage>}
              </FormControl>

              <FormControl>
                <Label htmlFor="dia_chi">Địa chỉ</Label>
                <Input
                  id="dia_chi"
                  name="dia_chi"
                  value={formData.dia_chi}
                  onChange={handleChange}
                  $error={!!errors.dia_chi}
                  autoComplete="street-address"
                  placeholder="Số nhà, đường, quận/huyện..."
                  required
                />
                {errors.dia_chi && <ErrorMessage>{errors.dia_chi}</ErrorMessage>}
              </FormControl>

              <FormControl>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="url"
                  placeholder="https://company.com"
                />
              </FormControl>

              <FormControl>
                <Label htmlFor="quy_mo_nhan_su">Quy mô nhân sự</Label>
                <Input
                  id="quy_mo_nhan_su"
                  name="quy_mo_nhan_su"
                  value={formData.quy_mo_nhan_su}
                  onChange={handleChange}
                  placeholder="VD: 11-50, 51-200..."
                />
              </FormControl>

              <FullRow as={FormControl}>
                <Label htmlFor="avt">Avatar (URL hoặc Base64)</Label>
                <Input
                  id="avt"
                  name="avt"
                  value={formData.avt}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="https://... hoặc chuỗi base64"
                />
              </FullRow>

              <FullRow as={FormControl}>
                <Label htmlFor="gioi_thieu">Giới thiệu</Label>
                <TextArea
                  id="gioi_thieu"
                  name="gioi_thieu"
                  value={formData.gioi_thieu}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Mô tả ngắn về doanh nghiệp..."
                />
              </FullRow>
            </Grid2>
          </Section>

          <Button type="submit">Đăng ký</Button>
        </Form>

        <RegisterLink>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </RegisterLink>
      </RegisterCard>
    </RegisterContainer>
  )
}

export default RegisterForm
