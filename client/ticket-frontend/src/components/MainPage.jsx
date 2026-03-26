import { useEffect, useState } from "react"
import { Link } from "react-router"

function MainPage({ className = "" }) {
    const requestUrl = `${import.meta.env.VITE_API_URL}/concerts`
    const [concertInfo, loadConcertInfo] = useState([]);

     useEffect(()=>{
        fetch(requestUrl)
        .then(response => response.json())
        .then(data =>{
            loadConcertInfo(data)
        })
        .catch(error => console.log('Error:', error))

    }, [])

    return (
        <main className={`flex-1 ${className}`}>
        <div className="text-orange-100 rounded-xl bg-slate-900 m-5 p-5">
            <h1 className="text-rose-500 text-6xl mb-8 font-[Bebas_Neue]">Upcoming Events</h1>
            <div className="font-[Libre_Baskerville] rounded-xl p-3 mb-5 bg-slate-800">
                <h2 className="text-3xl mb-2">Events</h2>
                <div className="grid grid-cols-2 gap-4">
                    {concertInfo.map((concert)=>(
                        <div key={concert.id} className="rounded-xl bg-slate-950 p-5">

                        <div className='flex'>
                                <div className="w-200 h-100 overflow-hidden rounded-xl mb-5">
                                    <img className="w-full h-full object-cover" src={concert.image} alt={concert.name}/>
                                </div>

                            <div className="p-5 ml-auto">
                                <p className="text-7xl font-[Bebas_Neue] mb-10">{new Date(concert.date).toLocaleDateString()}</p>
                                <p className="text-2xl mb-5">{concert.name}</p>
                                <p className="text-2xl mb-5">{concert.venue}</p>
                                <p className="text-2xl mb-5 text-rose-600">{concert.genre}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                        <h1 className="font-[Bebas_Neue] text-7xl text-amber-400">{concert.artist}</h1>
                        <Link to={`/concerts/${concert.id}`} className="ml-auto"><button className="bg-blue-500 p-2 rounded-xl text-4xl font-[Google_Sans] font-bold hover:scale-110 transition duration-500" info={concert.name}>Get Tickets</button></Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </main>
    )
}

export default MainPage