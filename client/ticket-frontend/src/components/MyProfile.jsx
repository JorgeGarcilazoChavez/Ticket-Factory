import { useAuth } from "./context/AuthContext"
import { Link } from "react-router";
import { useEffect, useState } from "react";

function MyProfilePage({ className = "" }){
    
    const { user } = useAuth();
    const [eventArray, checkEvents] = useState([]);
    const [showEvents, userHasEvents] = useState(false);

    const requestUrl = `http://localhost:8000/tickets/${user.id}`;
    
        useEffect(()=>{
            fetch(requestUrl, )
            .then(response => response.json())
            .then(data =>{ 
                if(data.length > 0){
                    checkEvents(data);
                    userHasEvents(true);
                } else {
                    userHasEvents(false);
                }
            })
            .catch(error => console.log('Error:', error))
    
        }, [])

    return (
        <div className={`flex-1 ${className}`}>
        <div className="m-5 bg-slate-900 rounded-xl p-6 text-orange-100 ">
            <h2 className="mb-5 text-5xl text-amber-400 font-[Bebas_Neue]">Welcome back {user.firstName}</h2>
            <h2 className="text-3xl font-[Bebas_Neue] text-rose-500">Your Profile</h2>
            <div className="flex justify-center items-center gap-15 p-10">
                <div className="text-7xl">
                    <i className="bxf bx-user-circle" />
                </div>

                <div className="font-[Google_Sans]">
                    <div className="flex gap-2">
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    </div>
                    <div>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
                <h3 className="text-3xl font-[Bebas_Neue] text-rose-500">Your Upcoming Events</h3> 
                <i className="text-2xl bxf bx-microphone-alt-2 text-rose-500" />
            </div>

            {showEvents ? 
            <div className="flex gap-5 flex-wrap p-6">
            {eventArray.map((event) => (
                <Link key={event.id} className="hover:scale-103 transform duration-400" to="/tickets">
                        <div className="bg-slate-950 rounded-xl p-5 text-center font-[Bebas_Neue] text-blue-500 text-2xl w-60">
                            <p className="mb-3">{event.Concert.date.slice(0,10)}</p>
                            <img  width="200" className="rounded-xl mb-3 mx-auto" src={event.Concert.image}/>
                            <p>{event.Concert.name}</p>
                            <p>{event.Concert.artist}</p>
                        </div>
                </Link>

            ))}
            </div>
            
            : <div className="text-center">
                <div className="mb-2 font-[Google_Sans]">
                    Looks like you don't have any events coming up, visit our store! 
                </div>
                <div className="text-3xl">
                    <Link to='/'><i className="hover:text-green-600 transform duration-300 bxf bx-basket" /></Link>
                </div>
            </div>}

            </div>
        </div>
    )
}

export default MyProfilePage