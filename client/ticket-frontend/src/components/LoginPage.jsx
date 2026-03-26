import { useState } from "react"
import { Link } from "react-router";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router";

function LoginPage({ className = "" }) {
    const navigate = useNavigate();
    const [formData, updateFormData] = useState({
        email: '',
        password:''
    })
    const [error, presentError] = useState(false);
    const [loading, isLoading] = useState(false);

    const { setUser } = useAuth();
    const [isMessageVisible, makeMessageVisible] = useState(false)
    
    const showMessage = (e) =>{
        !isMessageVisible ? makeMessageVisible(true) : makeMessageVisible(false) 
    }

    const loginData = (e) => {
        const {name, value} = e.target
        updateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
         
            const res = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await res.json();

             if (res.ok){
                setUser(data);
                isLoading(false);
                navigate('/');
            } else {
                isLoading(false);
                presentError(true);
                console.error(data.message);
            }

        } catch (e){

        }
    }

    return (
        <div className={`flex-1 ${className}`}>
        <div className="bg-slate-800 text-orange-100 flex flex-col items-center m-5 p-5 rounded-xl">
            <label className="mb-10 text-7xl text-rose-500 font-[Bebas_Neue]">Your Account</label>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-5 font-[Google_Sans]">
                <input onChange={loginData} name="email" className="bg-slate-900 text-2xl rounded-xl p-2" type ='email' required placeholder="Email"></input>
                <input autoComplete='off' onChange={loginData} name="password" className="bg-slate-900 text-2xl rounded-xl p-2" type ='password' required placeholder="Password"></input>
                {loading ? <div><i className="bx bx-loader-dots bx-spin" /></div> : <button className="rounded-xl p-2 cursor-pointer hover:bg-amber-200 hover:text-slate-950 transition duration-300" type='submit'>Login</button>}
            </form>
            {error && <p className="m-5 text-red-500">Invalid credentials</p>}
            <div className="flex gap-10">
                <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline underline-offset-4">Create one!</Link> </p>
                <div className="relative">
                <p onMouseEnter={showMessage} onMouseLeave={showMessage} className="text-blue-500">Forgot your password?</p>
                {isMessageVisible && (<p className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-red-600 px-3 py-1 rounded-lg shadow-lg">This is a mock website. Just create a new account :P</p>)}    
                </div>          
            </div>
        </div>
        </div>
    )
}

export default LoginPage