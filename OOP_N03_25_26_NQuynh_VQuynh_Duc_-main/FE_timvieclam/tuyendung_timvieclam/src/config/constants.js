// API URL would be replaced with your actual backend URL
export const API_URL = 'http://localhost:8080/api'

export const JOB_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  REJECTED: 'REJECTED'
}

export const APPLICATION_STATUS = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  INTERVIEWED: 'INTERVIEWED',
  REJECTED: 'REJECTED',
  HIRED: 'HIRED'
}

export const JOB_TYPES = [
  { id: 1, name: 'FULL_TIME', label: 'Full-time' },
  { id: 2, name: 'PART_TIME', label: 'Part-time' }
]

export const INDUSTRY_FIELDS = [
  { id: 1, name: 'a', label: 'Industry A' },
  { id: 2, name: 'v', label: 'Industry V' }
]