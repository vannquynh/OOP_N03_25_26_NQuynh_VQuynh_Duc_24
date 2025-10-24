import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiMapPin, FiBriefcase, FiArrowRight } from 'react-icons/fi'
import { useJob } from '../hooks/useJob'
import LoadingSpinner from '../components/common/LoadingSpinner'

const CompaniesPage = () => {
  const { jobs } = useJob()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (jobs.length > 0) {
      // Extract unique companies from jobs
      const uniqueCompanies = jobs.reduce((acc, job) => {
        if (!acc.find(c => c.id === job.company.id)) {
          acc.push(job.company)
        }
        return acc
      }, [])
      
      setCompanies(uniqueCompanies)
      setLoading(false)
    }
  }, [jobs])
  
useEffect(() => {
    const fetchCompanies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/doanhnghiep');
            const data = await response.json();
            const formattedCompanies = data.map(company => ({
                id: company.ma_doanh_nghiep,
                name: company.ten_doanh_nghiep,
                location: company.tinh,
                address: company.dia_chi,
                website: company.website,
                employees: company.quy_mo_nhan_su,
                logo: company.avt,
                description: company.gioi_thieu,
            }));
            setCompanies(formattedCompanies);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setLoading(false);
        }
    };

    fetchCompanies();
}, []);

if (loading) return <LoadingSpinner />;

return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Top Companies Hiring Now
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                Discover great places to work and explore their open positions
            </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
    </div>
);
}

const CompanyCard = ({ company }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card overflow-hidden"
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
          <img 
            src={company.logo} 
            alt={`${company.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {company.name}
          </h2>
        </div>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FiMapPin className="h-4 w-4" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FiUsers className="h-4 w-4" />
          <span>{company.employees}</span>
        </div>
      </div>
      
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        <div dangerouslySetInnerHTML={{ __html: company.description }} />
      </div>
      
      <Link 
        to={`/companies/${company.id}`}
        className="inline-flex items-center gap-1 text-primary-600 hover:underline dark:text-primary-400"
      >
        <span>View Company Profile</span>
        <FiArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

export default CompaniesPage