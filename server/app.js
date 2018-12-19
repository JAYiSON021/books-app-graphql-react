const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

// Connect to mongodb
mongoose.connect(`mongodb://localhost:27017/books`, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
 console.log('Connected to database.');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
    console.log(`Now listening for request on port 4000.`);
});

