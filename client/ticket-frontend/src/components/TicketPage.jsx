import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router";

function TicketPage({ className = "" }) {
    const { user } = useAuth();
    const [showTickets, checkUserTickets] = useState(false);
    const [ticketArray, changeTicketArray] = useState([])

    const requestUrl = `${import.meta.env.VITE_API_URL}/tickets/${user.id}`;

    useEffect(()=>{
        fetch(requestUrl, )
        .then(response => response.json())
        .then(data =>{ 
            if(data.length > 0){
                changeTicketArray(data);
                checkUserTickets(true);
            } else {
                checkUserTickets(false);
            }
        })
        .catch(error => console.log('Error:', error))

    }, [])


    return (
        <main className={`flex-1 ${className}`}>
        <div className="bg-slate-800 rounded-xl p-5 m-10">
            <div className="flex mb-10 items-center gap-5 text-rose-500 text-6xl font-[Bebas_Neue]">
            <h1> My Tickets </h1>
            <i className="bx bx-tickets "/>
            </div>
            {
                showTickets ? ticketArray.map((ticket) => (
                <div key={ticket.id} className="flex p-10 gap-5 bg-slate-900 rounded-xl mb-5">
                <div className="">
                   
                    <img width="300" className="rounded-xl" src={ticket.Concert.image} placeholder="artist image"/>
                              
                </div>

                <div>
                    <h3 className="font-[Bebas_Neue] mb-8 text-amber-400 text-4xl">{ticket.Concert.name}</h3>
                    <div className="flex mb-8 gap-7 font-[Google_Sans] text-xl text-green-500 font-bold">
                        <h3>{ticket.Concert.venue}</h3>
                        <h3 className="text-rose-600">{ticket.Concert.artist}</h3>
                        <h3>{ticket.Concert.date.slice(0,10)}</h3>
                    </div>

                    <div className="flex gap-10">

                        <div className="flex gap-2 items-center">
                        <p className="text-blue-500 text-4xl font-[Bebas_Neue]">Access:</p>
                        <p className="text-white text-4xl font-[Bebas_Neue]">{ticket.access}</p>
                        </div>

                        <div className="flex gap-2 items-center">
                        <p className="text-blue-500 text-4xl font-[Bebas_Neue]">Zone:</p>
                        <p className="text-white text-4xl font-[Bebas_Neue]">{ticket.zone}</p>
                        </div>

                        <div className="flex gap-2 items-center">
                        <p className="text-blue-500 text-4xl font-[Bebas_Neue]">Section:</p>
                        <p className="text-white text-4xl font-[Bebas_Neue]">{ticket.section}</p>
                        </div>

                        <div className="flex gap-2 items-center">
                        <p className="text-blue-500 text-4xl font-[Bebas_Neue]">Seat:</p>
                        <p className="text-white text-4xl font-[Bebas_Neue]">{ticket.seat}</p>
                        </div>

                    </div>

                </div>

            </div> 
                )): 
            <div>
                <div className="text-center text-orange-100">
                <div className="mb-2 font-[Google_Sans]">
                    Looks like you don't have any tickets, visit our store! 
                </div>
                <div className="text-3xl">
                    <Link to='/'><i className="hover:text-green-600 transform duration-300 bxf bx-basket" /></Link>
                </div>
            </div>
            </div>
            }
            
    
        </div>
        </main>
    )
}

export default TicketPage

