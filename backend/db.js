const mongoose = require('mongoose');
require('dotenv').config({path: "./evFiles/.env"})

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.USER_KEY}@cluster0.xhdkcyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        });
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error('Error connecting to mongoDB:', err.message);
    }
};

const checkConnection = () => {
    return mongoose.connection.readyState === 1;
}

module.exports = {
    connectToMongoDB,
    checkConnection,
};


