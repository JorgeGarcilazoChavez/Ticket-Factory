import express from 'express';
import { findAllConcerts, findOneConcert, createConcert, updateConcert, deleteConcert } from '../controllers/concerts.controller.js';
const routerConcert = express.Router();

// Get requests
routerConcert.get('/', async (req, res)=>{
    const concert = await findAllConcerts();
    return res.json(concert)
});

routerConcert.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const concert = await findOneConcert(id)
    return res.json(concert);
});


// Post request

routerConcert.post('/', async (req, res) => {
    const concertName = req.body.name;
    const concertVenue = req.body.venue;
    const concertArtist = req.body.artist;
    const concertDate = req.body.date;
    const concertGenre = req.body.genre;

    const createdConcert = await createConcert(concertName, concertVenue, concertArtist, concertDate, concertGenre);
    return res.json(createdConcert);
})

// Put request

routerConcert.put('/:id', async (req, res) => {
    const concertId = req.params.id;
    const newConcertName = req.body.name;
    const newConcertVenue = req.body.venue;
    const newConcertArtist = req.body.artist;
    const newConcertDate = req.body.date
    const newConcertGenre = req.body.genre

    const updatedConcert = await updateConcert(concertId, newConcertName, newConcertVenue, newConcertArtist, newConcertDate, newConcertGenre)
    return res.json(updatedConcert)
})


// Delete request
routerConcert.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedConcert = await deleteConcert(id);
    return res.json(deletedConcert);
})

export default routerConcert