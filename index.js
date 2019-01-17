//base import
const hapi = require('hapi')
const mongoose = require('mongoose')


// setting up server
const server = hapi.server({
    port: process.env.YOUR_PORT || process.env.PORT || 5000,
    host: process.env.host || '0.0.0.0',
    routes: {
        "cors": true
    }
})

// swagger
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi')

// import Routing
const Routers = require('./routers/index.js')

// connect monggo
mongoose.connect('mongodb://scavanger:scavanger12@ds151814.mlab.com:51814/scavanger', {useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

// Server Setting
const init = async () => {
    const swaggerOptions = {
        info: {
                title: 'Scavangers API Documentation',
                version: Pack.version,
            },
        grouping: 'tags'
        };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    server.route(Routers)
    await server.start();
    console.log(`server running at ${server.info.uri}`)
};

// run server
init(); 