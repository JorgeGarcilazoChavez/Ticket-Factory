import { Concert } from "../models/Concert.js";
import { Ticket } from "../models/Ticket.js";

export async function seedDevData() {

  const concerts = await Concert.bulkCreate([
            {
        name: "Getting Killed World Tour",
        venue: "GNP Seguros Stadium, Mexico City, Mexico",
        artist: "Geese",
        genre: "alternative",
        image: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/6cc5/live/bc92b7c0-e641-11f0-8786-db2fc8f3a075.jpg.webp",
        date: new Date("2026-03-15"),
        },

        {
        name: "Chris Stapleton Live",
        venue: "Madison Square Garden, New York, USA",
        artist: "Chris Stapleton",
        genre: "country",
        image: "https://www.udiscovermusic.com/wp-content/uploads/2021/09/Chris-Stapleton-GettyImages-1285198224.jpg",
        date: new Date("2026-03-15"),
        },
        {
        name: "Oasis Reunion Tour",
        venue: "Wembley Stadium, London, UK",
        artist: "Oasis",
        genre: "rock",
        image: "https://www.billboard.com/wp-content/uploads/2025/09/oasis-mexico-city-2025-billboard-1800.jpg?w=942&h=628&crop=1",
        date: new Date("2026-04-02"),
        },
        {
        name: "The Heavy",
        venue: "The Wiltern, Los Angeles, USA",
        artist: "The Heavy",
        genre: "rock",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/The_Heavy-Bowery_Ballroom-1.jpg",
        date: new Date("2026-04-20"),
        },
        {
        name: "Queens of the Stone Age",
        venue: "Red Rocks Amphitheatre, Morrison, USA",
        artist: "Queens of the Stone Age",
        genre: "rock",
        image: "https://es.rollingstone.com/wp-content/uploads/2023/05/Queens-of-the-Stone-Age-anuncia-su-octavo-album-de-estudio-In-Times-New-Romam.jpg",
        date: new Date("2026-05-05"),
        },
        {
        name: "A$AP Rocky",
        venue: "Barclays Center, Brooklyn, USA",
        artist: "A$AP Rocky",
        genre: "hip-hop",
        image: "https://www.vibe.com/wp-content/uploads/2026/01/@pleckham_AAPROCKY-07-Dont-Be-Dumb-Tour-Dates-e1768938755313.jpg?w=910&h=511&crop=1",
        date: new Date("2026-05-25"),
        },

        {
        name: "Shane Gillis Live",
        venue: "Comedy Cellar, New York, USA",
        artist: "Shane Gillis",
        genre: "comedy",
        image: "https://pechangaarenasd.com/wp-content/uploads/PASD-ShaneGillis-750x400-1.jpg",
        date: new Date("2026-03-22"),
        },
        {
        name: "Caleb Hearon Live",
        venue: "The Bell House, Brooklyn, USA",
        artist: "Caleb Hearon",
        genre: "comedy",
        image: "https://media.gq.com/photos/68c44f669883e6195a12dd0d/master/w_1600%2Cc_limit/caleb-hearon_9.jpg",
        date: new Date("2026-04-12"),
        },
        {
        name: "Stavros Halkias Live",
        venue: "The Wilbur Theatre, Boston, USA",
        artist: "Stavros Halkias",
        genre: "comedy",
        image: "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbd98FPfufyMQRK6qfOkNTirO8muwsHWmWQwz7-NxKSI9OQOA7OWAPwDtT3mJ4CciMhfJEiouB6DLv5J-jyobl2bN4C0Lro-Ey8Y.jpg?r=e08",
        date: new Date("2026-04-28"),
        },

        {
        name: "The Lion King",
        venue: "Minskoff Theatre, New York, USA",
        artist: "Disney",
        genre: "theatre",
        image: "https://lumiere-a.akamaihd.net/v1/images/tlk_gallery-1_img_f3096bfa.jpeg?region=0,0,2400,1350",
        date: new Date("2026-06-10"),
        },
        {
        name: "Harry Potter and the Cursed Child",
        venue: "Lyric Theatre, New York, USA",
        artist: "Broadway Production",
        genre: "theatre",
        image: "https://media.vanityfair.com/photos/5ada4beade74d449f8c771aa/master/pass/harry-potter-and-the-cursed-child-review.jpg",
        date: new Date("2026-06-25"),
        },
        {
        name: "Romeo and Juliet",
        venue: "Shakespeare's Globe, London, UK",
        artist: "National Theatre Production",
        genre: "theatre",
        image: "https://images.ctfassets.net/6pezt69ih962/6pbyfVw50HsjZur1Xo4rHz/fb117176d782010ad44ae5bbe48c38c4/Lola_Shalam_as_Juliet_and_Rawaed_Asde_as_Romeo_in_Romeo_and_Juliet_at_Shakespeare-s_Globe__c._Tristram_Kenton__3.jpg?h=550&fm=webp&q=90",
        date: new Date("2026-07-10"),
        },
        {
        name: "A Little Life",
        venue: "Harold Pinter Theatre, London, UK",
        artist: "A Little Life Production",
        genre: "theatre",
        image: "https://media.newyorker.com/photos/63532348b98ee3a601a273a8/master/pass/Shaw-Little-Life.jpg",
        date: new Date("2026-07-28"),
        },
  ]);

  const tickets = [];

  for (const concert of concerts) {
    for (let i = 1; i <= 30; i++) {
      tickets.push({
        price:
          concert.genre === "theatre"
            ? 99.99
            : concert.genre === "comedy"
            ? 39.99
            : 69.99,
        seat: `A-${i}`,
        access: i <= 5 ? "vip" : "standard",
        zone: "MAIN",
        section: "A",
        concertId: concert.id,
        userId: null,
      });
    }
  }

  await Ticket.bulkCreate(tickets);

  console.log("Dev data seeded successfully");
}