import express from 'express';
import { findAllTickets, createTicket, updateTicket, deleteTicket, findOneTicket, findAllConcertTickets, findUserTickets } from '../controllers/tickets.controller.js';
const routerTickets = express.Router();


// Get requests
routerTickets.get('/', async (req, res)=>{
    const tickets = await findAllTickets();
    return res.json(tickets)
});

routerTickets.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const ticketCollection = await findUserTickets(id);
    return res.json(ticketCollection);
})

/*routerTickets.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const ticket = await findOneTicket(id)
    return res.json(ticket);
});*/

routerTickets.get('/buy/:id', async (req, res)=>{
    const id = req.params.id;
    const concertTickets = await findAllConcertTickets(id)
    return res.json(concertTickets);
});

// Post request

routerTickets.post('/', async (req, res) => {
    const ticketPrice = req.body.price;
    const ticketSeat = req.body.seat;
    const ticketAccess = req.body.access;
    const ticketZone = req.body.zone;
    const ticketSection = req.body.section;

    const createdTicket = await createTicket(ticketPrice, ticketSeat, ticketAccess, ticketZone, ticketSection)
    return res.json(createdTicket);
})

// Put request

routerTickets.put('/:id', async (req, res) => {
    const ticketId = req.params.id;
    const newPrice = req.body.price;
    const newSeat = req.body.seat;
    const newAccess = req.body.access;
    const newZone = req.body.zone;
    const newSection = req.body.section;
    const newUser = req.body.userId;

    const updatedTicket = await updateTicket(ticketId, newPrice, newSeat, newAccess, newZone, newSection, newUser)
    return res.json(updatedTicket)
})


// Delete request
routerTickets.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedTicket = await deleteTicket(id);
    return res.json(deletedTicket);
})

export default routerTickets