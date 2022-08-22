const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/user');
const refreshRoutes = require('./routes/refreshToken');
const postRoutes = require('./routes/post');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const cors = require('cors');

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/auth', refreshRoutes);
app.use('/api/reviews', postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

/** Mongodb config */
const CONFIG = { 
    uri : process.env.DATABASE_URl,
    OPTIONS : { 
      useNewUrlParser : true , 
      keepAlive : true , 
      useUnifiedTopology : true , 
      keepAliveInitialDelay : 3e6
    }
}

/** Mongodb connection */
mongoose.Promise = Promise;  
mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
db.on('open' , console.info.bind(console , 'Connection to the database was successful'))


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))