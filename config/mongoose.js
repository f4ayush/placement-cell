const mongoose = require('mongoose');
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;