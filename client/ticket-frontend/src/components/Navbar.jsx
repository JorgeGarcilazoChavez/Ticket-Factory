import { Link } from "react-router"
import { useAuth } from "./context/AuthContext";

function NavBar ({ onClose }) {
        const { user } = useAuth();

    return(
        <aside className="fixed top-0 left-0 h-screen w-64 z-50">
            <nav className="h-full flex flex-col bg-slate-950 shadow-xl/50">
                <div className="p-4 pb-2 flex justify-between items-center">
                   <i onClick={onClose} className="bx bx-x text-amber-400 text-5xl cursor-pointer hover:scale-110 transition duration-500"/>
                </div>
                <ul className="text-orange-100 p-4 pb-2 flex flex-col gap-5 font-[Google_Sans]">
                    <Link to="/"><li className="flex items-center justify-between rounded-xl p-2 hover:bg-amber-200 hover:text-slate-950 transition duration-300"><div className="flex items-center gap-2"><span>Home</span> <i className='bx  bx-home'></i></div></li></Link>
                    {user ? <Link to="/my-profile"><li className="flex items-center justify-between rounded-xl p-2 hover:bg-amber-200 hover:text-slate-950 transition duration-300"><div className="flex items-center gap-2"><span>My Profile</span> <i className='bx  bx-user'></i></div></li></Link> : <Link to="/login"><li className="flex items-center justify-between rounded-xl p-2 hover:bg-amber-200 hover:text-slate-950 transition duration-300"><div className="flex items-center gap-2"><span>Login</span> <i className='bx  bx-user'></i></div></li></Link> }
                    {user && <Link to="/tickets"><li className="flex items-center justify-between rounded-xl p-2 hover:bg-amber-200 hover:text-slate-950 transition duration-300"><div className="flex items-center gap-2"><span>My Tickets</span> <i className='bx  bx-tickets'></i></div> </li></Link>}
                </ul>
            </nav>
        </aside>
    )
}

export default NavBar