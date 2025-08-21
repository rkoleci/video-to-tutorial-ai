import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
            localStorage.removeItem('authToken')
        navigate('/home');
        window.location.reload()
    }, [])



    return <div className='bg-red'>Logout page</div>
}