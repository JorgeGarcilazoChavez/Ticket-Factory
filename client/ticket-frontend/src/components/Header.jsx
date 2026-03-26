import { Link, useNavigate } from "react-router"
import { useState } from "react";
import NavBar from "./Navbar";
import { useAuth } from "./context/AuthContext";

function Header() {
    const { user, setUser } = useAuth();
    const [isVisible, changeVisibility] = useState(false);
    const navigate = useNavigate();

    const clickMenu = (e)=>{
        !isVisible ? changeVisibility(true) : changeVisibility(false)
    }

    const handleLogout = async () => {
        await fetch('http://localhost:8000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
        navigate('/');
    }

    return(
        <>
        {isVisible && <NavBar onClose={clickMenu}/>} 
        <div className="bg-slate-900 text-5xl flex items-center p-6  font-[Bebas_Neue]">
        <i onClick={clickMenu} className='bx  bx-menu-wide mr-15  cursor-pointer text-4xl text-amber-400 hover:scale-110 transition duration-500'></i>
        <Link to='/' className="flex hover:scale-105 transition duration-500">
        <h1 className="text-orange-100">Ticket Factory</h1>
        <i className='bx  bx-disc text-xl text-orange-100 '></i> 
        </Link>
        {user ? <button onClick={handleLogout} className="ml-auto text-3xl text-rose-500 hover:scale-110 transition duration-500">Logout</button>:<Link to='/login' className="ml-auto text-4xl hover:scale-110 transition duration-500">
        <i className='bx  bx-user-circle text-orange-100'></i>
        </Link>}
        </div>
        </>
    )
}

export default Header