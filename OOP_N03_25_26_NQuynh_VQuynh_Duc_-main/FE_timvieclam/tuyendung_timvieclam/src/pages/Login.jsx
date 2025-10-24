import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { FaBriefcase } from 'react-icons/fa'
import { toast } from 'react-toastify'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.25rem;
  background-color: var(--neutral-50);
`

const LoginCard = styled.div`
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-200);
  box-shadow: 0 10px 25px rgba(0,0,0,.06);
  width: 100%;
  max-width: 520px;
  padding: 2rem;

  &:before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-600), #60a5fa);
  }
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`

const Logo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-600);
  gap: 0.5rem;
`

const Sub = styled.p`
  color: var(--neutral-600);
  margin-top: 0.375rem;
`

const Form = styled.form`
  display: grid;
  gap: 1rem;
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

const InputWrap = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.875rem;
  padding-right: ${props => (props.type === 'password' || props.$withToggle ? '2.5rem' : '0.875rem')};
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

const TogglePwdBtn = styled.button`
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color: var(--neutral-600);

  &:hover { color: var(--neutral-800); }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.25rem;
`

const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: .95rem;
  color: var(--neutral-700);

  input { accent-color: var(--primary-600); }
`

const ErrorBanner = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  gap: .5rem;
  align-items: flex-start;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--error-300);
  background: #fef2f2;
  color: var(--error-700);
  border-left: 4px solid var(--error-500);
  border-radius: 0.5rem;
  font-size: 0.95rem;
`

const FieldError = styled.div`
  color: var(--error-600);
  font-size: 0.875rem;
`

const Button = styled.button`
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
  a { color: var(--primary-600); text-decoration: none; }
  a:hover { text-decoration: underline; }
`

const Login = () => {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password')
  const [showPwd, setShowPwd] = useState(false)

  const [errorBanner, setErrorBanner] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const errs = { email: '', password: '' }
    if (!email.trim()) errs.email = 'Vui lòng nhập email'
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Email không hợp lệ'

    if (!password) errs.password = 'Vui lòng nhập mật khẩu'

    setFieldErrors(errs)
    return !errs.email && !errs.password
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorBanner('')

    if (!validate()) {
      setErrorBanner('Vui lòng kiểm tra lại các trường bị lỗi.')
      return
    }

    setLoading(true)
    try {
      const success = await login({ email, password })
      if (success) navigate('/')
      else toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.'
      toast.error(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo><FaBriefcase /> JobCreator Portal</Logo>
          <Sub>Đăng nhập tài khoản nhà tuyển dụng</Sub>
        </LogoContainer>

        <ErrorBanner show={!!errorBanner}>{errorBanner}</ErrorBanner>

        <Form onSubmit={handleSubmit} noValidate>
          <FormControl>
            <Label htmlFor="email">Email</Label>
            <InputWrap>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errorBanner) setErrorBanner('') }}
                placeholder="you@company.com"
                autoComplete="email"
                $error={!!fieldErrors.email}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                required
              />
            </InputWrap>
            {fieldErrors.email && <FieldError id="email-error">{fieldErrors.email}</FieldError>}
          </FormControl>

          <FormControl>
            <Label htmlFor="password">Mật khẩu</Label>
            <InputWrap>
              <Input
                id="password"
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errorBanner) setErrorBanner('') }}
                placeholder="••••••••"
                autoComplete="current-password"
                $error={!!fieldErrors.password}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                $withToggle
                required
              />
              <TogglePwdBtn type="button" onClick={() => setShowPwd(s => !s)} aria-label="Toggle password visibility">
                {showPwd ? 'Ẩn' : 'Hiện'}
              </TogglePwdBtn>
            </InputWrap>
            {fieldErrors.password && <FieldError id="password-error">{fieldErrors.password}</FieldError>}
          </FormControl>

       

          <Button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Form>

        <RegisterLink>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
