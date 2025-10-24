import { FiBriefcase } from 'react-icons/fi'

const Logo = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-8 w-8',
    large: 'h-10 w-10'
  }
  
  return (
    <div className={`flex items-center justify-center rounded-lg bg-primary-600 p-1.5 text-white ${sizeClasses[size]}`}>
      <FiBriefcase />
    </div>
  )
}

export default Logo