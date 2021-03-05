global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");


app.use(express.json());

const atlasUrl =
  "mongodb+srv://anna636:hikplc@cluster0.01xvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false,
});

//Getter for all models except for users
app.get("/rest/:model", async (req, res) => {
  let model = models[req.params.model];
  /*if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }*/

  let docs = await model.find();
  res.json(docs);
});

//Post for all models
app.post("/rest/:model", async (req, res) => {
  let model = models[req.params.model];

  let doc = new model(req.body);

  
  await doc.save();

  res.json(doc);
});

//Put for all models
/*app.put("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];

  let doc = await model.findById(req.params.id);

  // update object with new values
  Object.assign(doc, req.body);
  await doc.save();

  res.json(doc);
});*/


//Delete for all models
/*app.delete("rest/:model/:id", async (req, res) => {
  let model = models[req.params.model]
  let doc = await model.findByIdAndDelete(req.params.id)
  res.json(doc)
})*/




//Put to update availableDates array in specific apartment
/*app.put("/api/add-new-date-to-apartment/:id", async (req, res) => {
  //Selecting models
  let Apartment = models["apartments"];
  let AvailableDates = models["availableDates"];

  let apartment = await Apartment.findById(req.body.apartmentId);

  /*for (let availableDatesId of req.body.availableDatesIds) {
    const newDates = await AvailableDates.findById(availableDatesId);
    apartment.availableDates=[...newDates]
  }
  
  let availableDatesArr=[]

  for (let availableDatesId of req.body.availableDatesIds) {
    availableDatesArr.push(availableDatesId)
  }
  apartment.availableDates=[...availableDatesArr]

  await apartment.save();
  res.json(apartment);
});*/


app.listen(3001, () => console.log("Server stated on port 3001"));


