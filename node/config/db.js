const mongoose = require('mongoose');
const {MONGO_USER,MONGO_PASSWORD,MONGO_IP,MONGO_PORT} = require("./config")
//https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/
const mongoUrl = `mongodb://localhost:${MONGO_PORT}`

//https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
const connectDB = async () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true
    })
    .then(()=> console.log('MongoDB connected.'))
    .catch((e)=>{
        console.log(e)
        // retry connection
        setTimeout(connectDB, 5000);
    })
}

module.exports = connectDB;