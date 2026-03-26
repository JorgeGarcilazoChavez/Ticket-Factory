import { Concert } from "./Concert.js";
import { Ticket } from "./Ticket.js";
import { User } from "./User.js";

// Relationships
Concert.hasMany(
    Ticket, 
    {
        foreignKey: 'concertId',
        onDelete: 'CASCADE'
    });

Ticket.belongsTo(
    Concert,{
        foreignKey: 'concertId'
    });

User.hasMany(
    Ticket,
    {
        foreignKey: 'userId'
    });

Ticket.belongsTo(
    User,{
        foreignKey: 'userId'
    })