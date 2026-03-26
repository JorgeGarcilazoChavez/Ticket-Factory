import { Ticket } from "../models/Ticket.js";
import { Concert } from "../models/Concert.js";

// SELECT Queries
export const findAllTickets = async () => {
    return await Ticket.findAll();
}

export const findOneTicket = async (id) =>{
    return await Ticket.findByPk(id);
}

export const findAllConcertTickets = async (id) =>{
    return await Ticket.findAll({
        where: {concertId: id}
    })
}

export const findUserTickets = async (id) =>{
    return await Ticket.findAll(
        {where: {userId: id},
        include: [
            {
                model: Concert,
                attributes: ['name', 'date', 'venue', 'artist', 'image']
            }
        ]
    }
    )
}

// INSERT Queries
export const createTicket = async (ticketPrice, ticketSeat, ticketAccess, ticketZone, ticketSection)=> {
    await Ticket.create({price: ticketPrice, seat: ticketSeat, access: ticketAccess, zone: ticketZone, section: ticketSection})
};

// UPDATE Queries
export const updateTicket = async (id, newPrice, newSeats, newAccess, newZone, newSection, newUser) => {
    await Ticket.update(
        {price: newPrice, seat: newSeats, access: newAccess, zone: newZone, section: newSection, userId: newUser},
        {
            where: {id}
        }
    )
    return findOneTicket(id);
};

// DELETE Queries
export const deleteTicket = async (id) =>{
    await Ticket.destroy({
        where: {id}
    })
};