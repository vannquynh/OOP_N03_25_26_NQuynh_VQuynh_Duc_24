import { NavLink } from 'react-router-dom'
import { FiHome, FiSearch, FiBookmark, FiUser } from 'react-icons/fi'

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        <MobileNavItem to="/" icon={<FiHome size={20} />} label="Home" />
        <MobileNavItem to="/jobs" icon={<FiSearch size={20} />} label="Search" />
        <MobileNavItem to="/saved-jobs" icon={<FiBookmark size={20} />} label="Saved" />
        <MobileNavItem to="/profile" icon={<FiUser size={20} />} label="Profile" />
      </div>
    </nav>
  )
}

const MobileNavItem = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `flex flex-col items-center justify-center px-2 py-1 ${
          isActive 
            ? 'text-primary-600 dark:text-primary-400' 
            : 'text-gray-600 dark:text-gray-400'
        }`
      }
    >
      {icon}
      <span className="mt-1 text-xs font-medium">{label}</span>
    </NavLink>
  )
}

export default MobileNav