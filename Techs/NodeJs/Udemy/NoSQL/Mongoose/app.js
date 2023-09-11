require('dotenv').config(); //to load environment file

const path = require('path'); // To use out of folder files also(folder files other than current folder)

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose'); 

const adminRoutes     = require('./Routes/admin.js');
const shopRoutes      = require('./Routes/shop.js');
const errorController = require('./controllers/error.js');

const User            = require('./models/user.js');

const app = express();


app.set('view engine', 'ejs'); // Set the view engine as PUG here
app.set('views', 'views'); // Telling which folder to be considered as 'views'(in this case we have named as views only)

app.use(bodyParser.urlencoded({
  extended: false
})) //encoding the data
app.use(express.static(path.join(__dirname, 'public'))) //To excess static files saved in 'public' folder.

app.use('/favicon.ico', (req, res) => res.status(204)); //Browsers will by default try to request /favicon.ico from the root of a hostname, in order to show an icon in the browser tab.

app.use((req, res, next) => {     //middleware to store that user in my request and use it from anywhere in my app conveniently
    User.findById('6423d06b0082fb268b40d4e4')
    .then(user =>{
      req.user = user;      //attching Sequelize object to request, as sequelize is called by 'nodemon app.js' not by any req in the browser.
      next();
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes) //Checks if routes start with /admin only

app.use(shopRoutes)

app.use(errorController.get404);


mongoose
  .connect('mongodb+srv://admin-vishal:OiXu0VqZrnApu31L@cluster0.tqqbw.mongodb.net/shop-mongoose?retryWrites=true&w=majority')
   .then(result => {
    User.findOne().then(user => {
       if(!user){
        const user = new User({
          name: 'Ramesh',
          email: 'ramesh@suresh.com',
          cart: {
            items: []
          } 
        });
        user.save();
       }
    })
    

    app.listen(process.env.PORT || 3000, (err) => { //process.env.PORT:- it will fetch the variables stored in '.env' file (for this line the PORT variable)
      if (!err) {
        console.log(`Server listening at Port: ${process.env.PORT || 3000}`);
      } else console.log(err)  
    })
   })
   .catch(err => console.log(err))
