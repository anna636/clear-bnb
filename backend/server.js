const express = require("express");
global.mongoose = require("mongoose");
const app = express();

// import models
const models = require("./models/models.js");
const moment = require("moment"); // npm i moment

// import controllers
const authHandler = require("./auth.js");

app.use(express.json());

const atlasUrl =
  "mongodb+srv://anna636:hikplc@cluster0.01xvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false,
});

//Function to get dates between 2 dates
function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

//Getter for all models except for users
app.get("/rest/:model", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "apartments") {
    let docs = await model
      .find()
      .populate(["amenities", "ownerId", "availableDates"])
      .exec();
    res.json(docs);
    return;
  }
  if (req.params.model === "bookings") {
    let docs = await model
      .find()
      .populate(["userId", "apartmentId"])
      .exec(); 
    res.json(docs);
    return;
  }
  
/* if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }*/

  let docs = await model.find();
  res.json(docs);
});

// merge wanted to get rid of this
app.get("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "apartments") {
    let doc = await model
      .findById(req.params.id)
      .populate(["amenities", "ownerId", "availableDates"])
      .exec();
    res.json(doc);
    return;
  }

  let doc = await model.findById(req.params.id);
  res.json(doc);
});

app.put("/api/update-dates/", async (req, res) => {
  let Apartment = models["apartments"];
  let apartment = await Apartment.findById(req.body.apartmentId); //Finding apartment

  let newDates = getDates(req.body.dates[0], req.body.dates[1]);

  //Pushing dates is bookedDates if they're not there yet
  for (date of newDates) {
    if (!apartment.bookedDates.includes(date)) {
      apartment.bookedDates.push(date);
    }
  }

  await apartment.save();

  res.json(apartment);
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
  let model = models[req.params.model];
  let doc = await model.findByIdAndDelete(req.params.id);
  res.json(doc);
});

//Put for all models
app.put("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];

  let doc = await model.findById(req.params.id);

  // update object with new values
  Object.assign(doc, req.body);
  await doc.save();

  res.json(doc);
});

//Add amenitie to already existing apartments by passing apartmentId and array of amenities ids
app.put("/api/add-amenity-to-apartment/:apartmentId", async (req, res) => {
  let Apartment = models["apartments"];

  let apartment = await Apartment.findById(req.params.apartmentId);

  for (let amenity of req.body.amenityIds) {
    if (apartment.amenities.includes(amenity)) {
      res.json("already exists");
      return; //do nothing
    } else {
      apartment.amenities.push(amenity);
    }
  }

  await apartment.save();
  res.json(apartment);
});

// fire controllers
authHandler(app, models);

app.listen(3001, () => console.log("Server stated on port 3001"));
