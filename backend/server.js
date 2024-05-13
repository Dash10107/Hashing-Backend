require("dotenv").config();
const express = require('express');
const connection = require("./db");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());


// Database connect
connection();


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

//passport
app.use(passport.initialize());
//config

require("./config/passport")(passport);



  //Routes 
const users = require("./routes/User");
app.use("/users",users);
const watchlist = require('./routes/Watchlist')
app.use('/watchlists',watchlist);




app.get('/', (req, res) =>{ 
    res.send('Hello World!');
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
    console.log(`Server is connected successfully and running on port: ${port}`);
  });