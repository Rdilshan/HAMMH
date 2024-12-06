import React, { createContext, useContext, useState, useEffect } from 'react'

interface PatientContextProps {
  hasUsedInjection: boolean
  isAdmitted: boolean
  setPatientId: (id: string) => void
}

const PatientContext = createContext<PatientContextProps | undefined>(undefined)

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasUsedInjection, setHasUsedInjection] = useState(false)
  const [isAdmitted, setIsAdmitted] = useState(false)
  const [patientId, setPatientId] = useState<string | null>(null)

  useEffect(() => {
    if (patientId) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`/api/patient/${patientId}`)
          if (!response.ok) {
            console.error(`Failed to fetch patient data for ID: ${patientId}`)
            return
          }
          const data = await response.json()
          console.log('Fetched Patient Data:', data)

          // Check if 'patients' is in the response and it is an object
          if (data?.patients && typeof data.patients === 'object') {
            const patientData = data.patients

            // Normalize and update states
            setHasUsedInjection(patientData.use_injection?.toLowerCase() === 'yes')
            setIsAdmitted(patientData.is_admit?.toLowerCase() === 'yes')

            console.log('Injection status:', patientData.use_injection)
            console.log('Admission status:', patientData.is_admit)
          } else {
            console.warn('Missing or invalid "patients" field in the response:', data)
          }
        } catch (error) {
          console.error('Error fetching patient data:', error)
        }
      }
      fetchPatientData()
    }
  }, [patientId])

  useEffect(() => {
    // This effect runs when `hasUsedInjection` or `isAdmitted` state changes
    console.log('Updated hasUsedInjection:', hasUsedInjection)
    console.log('Updated isAdmitted:', isAdmitted)
  }, [hasUsedInjection, isAdmitted]) // Will run whenever these states change

  return (
    <PatientContext.Provider value={{ hasUsedInjection, isAdmitted, setPatientId }}>
      {children}
    </PatientContext.Provider>
  )
}

export const usePatientContext = () => {
  const context = useContext(PatientContext)
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider')
  }
  return context
}
