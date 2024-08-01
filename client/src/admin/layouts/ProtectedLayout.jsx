import { useEffect } from 'react'
import DashboardLayout from './DashboardLayout'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../auth/useAuthStore'

export default function ProtectedLayout({ children }) {

    const { user, check } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        check()

        if (!user) {
            navigate('/login')
        }
    }, [user])


    return (
        <>
            {
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            }
        </>
    )
}
