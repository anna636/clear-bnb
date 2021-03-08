global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");
const moment = require("moment");

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
    let docs = await model.find().populate("amenities").exec();
    res.json(docs);
    return;
  }
  if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }

  let docs = await model.find();
  res.json(docs);
});

//Find retunerar arraaaaaay!!!!!!!
app.post("/api/new-booking", async (req, res) => {
  let Booking = models["bookings"];
  let AvailableDates = models["availableDates"];
  let booking = new Booking(req.body); //Selecting sent booking

  let bookingStartDate = booking.startDate; //Selecting booking dates
  let bookingEndDate = booking.endDate;
  //await booking.save();  //Sparar booking

  //Finding available dates for the apartment
  AvailableDates.find({ apartmentId: booking.apartmentId }, function (err, docs) {
    if (err) {
      res.send(err);
      
    }
    const apartmentDates = docs[0]; //Selecting dates will be booked and not available
    const apartmentDatesDiff = getDates(
      apartmentDates.availableStartDate,
      apartmentDates.availableEndDate
    );
    const bookingDatesDiff = getDates(bookingStartDate, bookingEndDate);

    const unavailableDates = [];

    for (let date of apartmentDatesDiff) {
      for (let bookingDate of bookingDatesDiff) {
        if (date === bookingDate) {
          unavailableDates.push(date);
        }
      }
    }
    res.json(unavailableDates)
   
  });
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
app.put("/api/add-amenitie-to-apartment/:id", async (req, res) => {
  let Apartment = models["apartments"];
  let Amenities = models["amenities"];

  let apartment = await Apartment.findById(req.body.apartmentId);

  for (let amenitiesId of req.body.amenitiesIds) {
    apartment.amenities.push(await Amenities.findById(amenitiesId));
  }

  await apartment.save();
  res.json(apartment);
});

/*app.put("/api/update-apartment-date/:id", async (req, res) => {
  
  let Apartment = models['apartments']
  let apartment = await Apartment.findById(req.params.id)
  let AvailableDates=models['availableDates']

  apartment.availableDates=[]

  for (let availableDatesId of req.body.availableDatesIds) {
    apartment.availableDates.push(await AvailableDates.findById(availableDatesId))
  }

  await apartment.save()
  res.json(apartment)
  

});
*/

app.listen(3001, () => console.log("Server stated on port 3001"));
