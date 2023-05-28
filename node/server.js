const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const app = express();

connectDB();

// get data from request,body
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json("api"));



app.use('/api/user', require('./routes/user'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))
app.use('/api/follow', require('./routes/follow'))


const PORT = process.env.PORT || 3333;

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))