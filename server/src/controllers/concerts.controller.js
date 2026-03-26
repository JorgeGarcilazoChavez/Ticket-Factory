import { Concert } from "../models/Concert.js";

// SELECT Queries
export const findAllConcerts = async () => {
    return await Concert.findAll();
}

export const findOneConcert = async (id) =>{
    return await Concert.findByPk(id);
}

// INSERT Queries
export const createConcert = async (concertName, concertVenue, concertArtist, concertDate, concertGenre)=> {
    await Concert.create({name: concertName, venue: concertVenue, artist: concertArtist, date: concertDate, genre: concertGenre})
};

// UPDATE Queries
export const updateConcert = async (id, newName, newVenue, newArtist, newDate, newGenre) => {
    await Concert.update(
        {name: newName, venue: newVenue, artist: newArtist, date: newDate, genre: newGenre},
        {
            where: {id}
        }
    )
};

// DELETE Queries
export const deleteConcert = async (id) =>{
    await Concert.destroy({
        where: {id}
    })
};