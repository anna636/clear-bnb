
global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");

const crypto = require('crypto');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
// Mongoose model
const User = models.users;
const secret = 'H!#45i12ip154?31!+';

app.use(express.json());

const atlasUrl =
  "mongodb+srv://anna636:hikplc@cluster0.01xvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false,
});

app.use(session({
  secret: 'very secret one', // choose your own...
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new connectMongo({mongooseConnection: mongoose.connection})
}));

//Getter for all models except for users
app.get("/rest/:model", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "apartments") {
    let docs = await model.find().populate(["amenities", "ownerId"]).exec();
    res.json(docs)
    return;
  }
  /*if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }*/

  let docs = await model.find();
  res.json(docs);
});


app.get("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "apartments") {
    let doc = await model.findById(req.params.id).populate(['amenities', 'ownerId']).exec()
    res.json(doc);
    return;
  }

  let doc = await model.findById(req.params.id)
  res.json(doc);
});


//Post for all models except for amenities
app.post("/rest/:model", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "amenities") {
    res.json("No such request is found");
    return;
  }
  let doc = new model(req.body);

  await doc.save();

  res.json(doc);
});


//Delete for all models
app.delete("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model]
  let doc = await model.findByIdAndDelete(req.params.id)
  res.json(doc)
})

//Put for all models
app.put("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];

  let doc = await model.findById(req.params.id);

  // update object with new values
  Object.assign(doc, req.body);
  await doc.save();

  res.json(doc);
})

//Add amenitie to already existing apartments by passing apartmentId and array of amenities ids
app.put("/api/add-amenitie-to-apartment/:id", async (req, res) => {

  let Apartment = models["apartments"];
  let Amenities = models["amenities"];

  let apartment = await Apartment.findById(req.body.apartmentId);

  for (let amenitiesId of req.body.amenitiesIds) {
    apartment.amenities.push(await Amenities.findById(amenitiesId))
  }


  await apartment.save();
  res.json(apartment);
});



app.use(session({
  secret: 'very secret one', // choose your own...
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new connectMongo({mongooseConnection: mongoose.connection})
}));

// Route to register a user
app.post('/api/register', async (req, res) => {
  // Encrypt password
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.password).digest('hex');
  // Create new user
  let user = new User({...req.body, password: hash});
  // NOTE: This system is unsafe since you can 
  // choose your own role on registration!
  await user.save();
  res.json({success: true});
});

// Login
app.post('/api/login', async (req, res) => {
  // note: req.session is unique per user/browser
  if(req.session.user){
    res.json({error: 'Someone is already logged in'});
    return;
  }
  // Encrypt password
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.password).digest('hex');
  // Search for user
  let user = await User.findOne({username: req.body.username, password: hash});
  if(user){
    // succesful login, save the user to the session object
    req.session.user = user;
    res.json({success: 'Logged in'});
  }
  else {
    res.json({error: 'No match.'});
  }
});

// Logout
app.delete('/api/logout', (req, res) => {
  if(req.session.user){
    delete req.session.user;
    res.json({success: 'Logged out'});
  }
  else {
    res.json({error: 'Was not logged in'});
  }
});

// Check if logged in
app.get('/api/whoami', (req, res) => {
  if(req.session.user){
    let user = {...req.session.user};
    delete user.password; // remove password in answer
    res.json(user);
  }
  else {
    res.json({error: 'Not logged in'});
  }
});

// Example rotues and roles - ACL Access Control List
app.get('/api/bird-admin-page', (req, res) => {
  if(req.session.user && req.session.user.role === 'bird admin'){
    res.json({secret: 'The secret data, only for bird admins.'})
  }
  else {
    res.json({error: 'No rights to see this route!'});
  }
});

// Example rotues and roles - ACL Access Control List
app.get('/api/cat-admin-page', (req, res) => {
  if(req.session.user && req.session.user.role === 'cat admin'){
    res.json({secret: 'The secret data, only for cat admins.'})
  }
  else {
    res.json({error: 'No rights to see this route!'});
  }
});



app.listen(3001, () => console.log("Server stated on port 3001"));
