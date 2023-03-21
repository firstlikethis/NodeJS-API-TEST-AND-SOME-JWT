const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { 
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB");
        console.log(err);
        progress.exit(1);
    });
}
