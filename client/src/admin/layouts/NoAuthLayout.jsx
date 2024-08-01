import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../auth/useAuthStore';

// Authenticated user not allowed to visit the page
export default function (props) {

    const { user } = useAuthStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (user) { navigate('/admin/companies') }
    }, [user])

    return (
        <div>
            <div className="container-blank">
                {props.children}
            </div>
        </div>
    );
}