import app from './app.js';
import dotenv from 'dotenv'
dotenv.config()
import { sequelize } from './db/connection.js';
import './models/Concert.js'
import './models/Ticket.js'
import './models/User.js' 
import './models/index.js'
import { seedDevData } from './dev/seedDevData.js';

// Start the server and test DB connection
async function start(){
    try{
        // DB Connection
        await sequelize.authenticate();
        console.log('Connection has been established with the database succesfully');
        // Models Sync to DB
        await sequelize.sync({ force: false })
        console.log('Models synced')

        if(process.env.SEED_DB === 'true'){
            await seedDevData();
            console.log('Database seeded')
        }

        // Start server
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
    console.error('Unable to connect to the database:', error)
    }
};

start();