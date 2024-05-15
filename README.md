Stocks Watchlist Application 
-------------------------------------------------------------------------------------------------------------------
..............Routes............ 

Users => 

Contains  POST routes register and login. 
Contains GET route protected to test successful login and validation of bearer token. 

Watchlists => 

Contains POST routes for adding new symbols along with userId to the database

Contains DELETE route for deleting a particular symbol 

Contains GET route for fetching the watchlist for the particular user. 
---------------------------------------------------------------------------------------------------------------------

......Code Structure ....

./config => used for configuring token for user through jwt strategy and passport 

./middleware => contains middlewares like verifyToken for verifying the user before allowing it access to the special routes 

./models => contains the MongoDB models for User and Watchlists

./routes => contains the routes for Users and Watchlists 

./validation => contains the validation files for login and register post request data recieved from the user 

db.js => used to setup the MongoDB Atlas Connection to the database 

server.js => main file for starting the server 
---------------------------------------------------------------------------------------------------------------

WHY CHOOSING NODE.JS and EXPRESS.JS ? 

I have used Nodejs and Express as backend , because they help in creating convinient backend REST API's and have better utilities and tools along with better HTTP suites and protocols. They are made for web applications . 

They also have mongoose package to communicate with MongoDB database and other packages like bcrypt for hashing , passport for user verifications and jwttoken for bifurcating users and creating jwt strategy. 

The most important reason for choosing this API medium cause they help in creating highly scalable and large API's along with multiple routes , middlewares and background proccessing. 

------------------------------------------------------------------------------------------------------------------
The Code to Frontend Repository => https://github.com/Dash10107/Watchlist-Frontend/
API Link => https://hashing-backend.onrender.com/






It also fulfils these requirements as well 

The platform should allow users to create and manage their own watchlists of stock symbols
(e.g., MSFT, GOOG).
• The platform should display a dashboard with the latest stock values of the symbols on the
user’s watchlist.
• The platform should be able to handle multiple users concurrently, each having different
watchlists.
• The platform should use a DB of your choice (e.g., MySQL/PostgreSQL/MongoDB) to store the
user and watchlist data.
• The platform should use a secure and simple authentication mechanism for the users.
• The platform should use https://www.alphavantage.co as an API to pull stock information. The
dashboard should show the latest stock price as returned by the TIME_SERIES_INTRADAY
endpoint


