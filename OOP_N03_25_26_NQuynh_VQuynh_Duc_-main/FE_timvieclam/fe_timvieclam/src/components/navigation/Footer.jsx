import { Link } from 'react-router-dom'
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'
import Logo from '../common/Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full bg-white pt-10 pb-16 shadow-sm dark:bg-gray-800 md:pb-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-1 lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold text-gray-900 dark:text-white">JobHub</span>
            </Link>
            <p className="mb-4 max-w-md text-gray-600 dark:text-gray-400">
              Connecting talented professionals with their dream careers. Find your perfect job match today.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<FiLinkedin />} label="LinkedIn" />
              <SocialLink href="#" icon={<FiTwitter />} label="Twitter" />
              <SocialLink href="#" icon={<FiFacebook />} label="Facebook" />
              <SocialLink href="#" icon={<FiInstagram />} label="Instagram" />
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">For Job Seekers</h3>
            <FooterLinkGroup>
              <FooterLink to="/jobs">Browse Jobs</FooterLink>
              <FooterLink to="/companies">Browse Companies</FooterLink>
              <FooterLink to="/saved-jobs">Saved Jobs</FooterLink>
              <FooterLink to="/profile">Your Profile</FooterLink>
            </FooterLinkGroup>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">For Employers</h3>
            <FooterLinkGroup>
              <FooterLink to="/post-job">Post a Job</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/resources">Resources</FooterLink>
              <FooterLink to="/employer-login">Employer Login</FooterLink>
            </FooterLinkGroup>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Company</h3>
            <FooterLinkGroup>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} JobHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const SocialLink = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

const FooterLinkGroup = ({ children }) => {
  return (
    <ul className="space-y-3">
      {children}
    </ul>
  )
}

const FooterLink = ({ to, children }) => {
  return (
    <li>
      <Link 
        to={to}
        className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
      >
        {children}
      </Link>
    </li>
  )
}

export default Footer