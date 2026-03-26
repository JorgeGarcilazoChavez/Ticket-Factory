import express from "express";
import cors from 'cors';
import routerTickets from "./routes/tickets.routes.js";
import routerConcert from "./routes/concert.routes.js";
import routerUser from "./routes/user.routes.js";
//import routerLogin from "./routes/login.routes.js";
import cookieParser from 'cookie-parser';
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/concerts', routerConcert);
app.use('/tickets', routerTickets);
app.use('/users', routerUser);
//app.use('/login', routerLogin);

export default app