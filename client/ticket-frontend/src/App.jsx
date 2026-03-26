import Header from "./components/Header"
import Footer from "./components/Footer"
import MainPage from "./components/MainPage"
import TicketPage from "./components/TicketPage"
import LoginPage from "./components/LoginPage"
import NavBar from "./components/Navbar"
import SignUp from "./components/SignUp"
import BuyTickets from "./components/BuyTickets"
import MyProfilePage from "./components/MyProfile"


export function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <MainPage className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}


export function TicketsApp() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <TicketPage className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}


export function LoginApp() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <LoginPage className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}

export function SignUpApp() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <SignUp className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}

export function BuyTicketsApp() {
  return(
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <BuyTickets className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}

export function MyProfileApp() {
  return(
    <>
    <div className="flex flex-col min-h-screen bg-slate-200">
    <Header/>
    <MyProfilePage className="flex-1"/>
    <Footer/>
    </div>
    </>
  )
}
