import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <motion.div
        className="h-16 w-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-primary-600" />
      </motion.div>
    </div>
  )
}

export default LoadingSpinner