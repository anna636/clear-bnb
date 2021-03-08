
global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");
const { apartments } = require("./models/models.js");

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
  if (req.params.model === "apartments") {
    let docs = await model.find().populate('amenities').exec()
    res.json(docs)
    return;
  }
  if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }

  let docs = await model.find();
  res.json(docs);
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


app.listen(3001, () => console.log("Server stated on port 3001"));
