import { useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";

function SignUp({ className = "" }) {
    const navigate = useNavigate();
    const [formData, updateFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        //confirmPassword: ''
    })

    const { setUser } = useAuth();
    const [loading, isLoading] = useState(false);
    const [error, presentError] = useState(false);

    const signUpData = (e) => {
        const {name, value} = e.target
        updateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isLoading(true);

        try{
            const res = await fetch('http://localhost:8000/users', {
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
        } catch (err) {
            isLoading(false);
            presentError(true);
            console.error(err)
        }
    }

    return (
        <div className={`flex-1 ${className}`}>

        <div className="bg-slate-800 text-orange-100 flex flex-col items-center m-5 p-5 rounded-xl">
            
            
            <label className="mb-10 text-7xl text-rose-500 font-[Bebas_Neue]">Join us!</label>

            {loading ? 
            <div className="text-6xl">
                <i className="bx bx-loader-dots bx-spin" />
            </div>
           :
           <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-5 font-[Google_Sans]">
                <input onChange={signUpData} name="firstName" className="bg-slate-900 text-2xl rounded-xl p-2" required placeholder="Name"></input>
                <input onChange={signUpData} name="lastName" className="bg-slate-900 text-2xl rounded-xl p-2" required placeholder="Last Name"></input>
                <input onChange={signUpData} name="email" className="bg-slate-900 text-2xl rounded-xl p-2" type ='email' required placeholder="Email"></input>
                <input autoComplete='off' onChange={signUpData} name="password" className="bg-slate-900 text-2xl rounded-xl p-2" type ='password' required placeholder="Password"></input>
                {/*<input onChange={signUpData} name="confirmPassword" className="bg-slate-900 text-2xl rounded-xl p-2" type ='password' required placeholder="Confirm Password"></input>*/}
                <button className="rounded-xl p-2 hover:bg-amber-200 hover:text-slate-950 transition duration-300 cursor-pointer" type='submit'>Sign Up</button>
            </form>
            }
            {error && <div> <p className="text-red-500">There was an error processing your request. Please try again</p> </div>}


        </div>
        
        </div>
    )
}

export default SignUp