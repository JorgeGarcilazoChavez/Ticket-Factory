import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "./context/AuthContext";

function BuyTickets({ className = "", info }) {

    const [concertInfo, loadConcertInfo] = useState([]);
    const [ticketInfo, loadTicketInfo] = useState([]);
    const [selectedTicketInfo, setSelectedTicketInfo] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:8000/concerts/${id}`)
            .then(r => r.json())
            .then(data => loadConcertInfo(data))
            .catch(err => console.log('Error:', err));
    }, []);

    const fetchTickets = () => {
        fetch(`http://localhost:8000/tickets/buy/${id}`)
            .then(r => r.json())
            .then(data => loadTicketInfo(data))
            .catch(err => console.log('Error:', err));
    };

    useEffect(() => { fetchTickets(); }, []);

    const showTicket = () => setSelectedTicket(prev => !prev);

    const buyTicket = async (e) => {
        e.preventDefault();
        setIsPurchasing(true);
        try {
            await fetch(`http://localhost:8000/tickets/${selectedTicketInfo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSelectedTicket(false);
            setSelectedTicketInfo(null);
            fetchTickets();
        } catch (err) {
            console.log('Purchase error:', err);
        } finally {
            setIsPurchasing(false);
        }
    };

    return (
        <div className={`flex-1 ${className}`}>
            <div className="flex text-orange-100 rounded-xl bg-slate-900 m-5 p-7 gap-5">
                <div>
                    <h1 className="text-blue-500 text-6xl mb-8 font-[Bebas_Neue]">Get your tickets now!</h1>
                    <p className="mb-5 font-[Bebas_Neue] text-7xl text-amber-400">{concertInfo.name}</p>
                    <div className="flex">
                        <div className="w-150 h-100 overflow-hidden rounded-xl mb-5">
                            <img className="w-full h-full object-cover" src={concertInfo.image} />
                        </div>
                        <div className="p-5 font-[Libre_Baskerville]">
                            <p className="mb-8 text-3xl">{concertInfo.artist}</p>
                            <p className="mb-8">{concertInfo.venue}</p>
                            <p className="mb-8 text-5xl font-[Bebas_Neue]">{new Date(concertInfo.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className="grow bg-slate-950 rounded-xl p-5 text-slate-900 relative">

                    {isPurchasing && (
                        <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                            <svg className="animate-spin h-16 w-16 text-green-400 mb-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                            <p className="text-green-400 font-[Bebas_Neue] text-3xl tracking-widest">Processing purchase...</p>
                            <p className="text-slate-400 font-[Libre_Baskerville] text-sm mt-2">Please wait</p>
                        </div>
                    )}

                    <div className="text-center rounded-xl bg-rose-500 p-5 mb-10 text-orange-100 font-[Bebas_Neue] text-5xl">
                        STAGE
                    </div>

                    <div className="grid text-center grid-cols-6 text-5xl text-green-500 mb-8">
                        {ticketInfo.map((ticket) => (
                            !ticket.userId ? (
                                <div key={ticket.id}>
                                    <i
                                        onClick={() => { showTicket(); setSelectedTicketInfo(ticket); }}
                                        className='bxf bx-circle cursor-pointer hover:scale-110 hover:text-green-300 transition duration-500'
                                    />
                                </div>
                            ) : (
                                <div key={ticket.id} className="relative group flex justify-center">
                                    <i className='text-red-500 bxf bx-cross-circle cursor-not-allowed transition duration-500' />
                                    <span className="
                                        absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                        bg-slate-800 text-orange-100 text-xs font-[Libre_Baskerville]
                                        px-2 py-1 rounded whitespace-nowrap
                                        opacity-0 group-hover:opacity-100
                                        pointer-events-none transition-opacity duration-200
                                    ">
                                        Seat taken
                                    </span>
                                </div>
                            )
                        ))}
                    </div>

                    {selectedTicket && (
                        <div className="bg-blue-900 rounded-xl p-10 text-orange-100">
                            <div className="flex gap-8 font-[Google_Sans] text-xl font-bold items-center">
                                <div>
                                    <p className="mb-5">PRICE: ${selectedTicketInfo.price}</p>
                                    <p>SEAT: {selectedTicketInfo.seat}</p>
                                </div>
                                <div>
                                    <p className="mb-5">ACCESS: {selectedTicketInfo.access}</p>
                                    <p>ZONE: {selectedTicketInfo.zone}</p>
                                </div>
                                <p>SECTION: {selectedTicketInfo.section}</p>

                                <div className="relative group ml-auto">
                                    <button
                                        onClick={buyTicket}
                                        className="rounded-xl bg-green-500 text-slate-900 p-2 text-4xl hover:bg-green-300 hover:scale-110 transition duration-500"
                                    >
                                        BUY NOW!
                                    </button>
                                    <span className="
                                        absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                        bg-slate-700 text-orange-100 text-xs font-[Libre_Baskerville]
                                        px-3 py-2 rounded whitespace-nowrap
                                        opacity-0 group-hover:opacity-100
                                        pointer-events-none transition-opacity duration-200
                                        border border-slate-500
                                    ">
                                        This is a mock site — no real charges apply 
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BuyTickets;