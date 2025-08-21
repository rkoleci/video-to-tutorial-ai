import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
            // logout user
        navigate('/login');
    }, [])



    return <div className='bg-red'>Logout page</div>
}