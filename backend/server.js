global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");

app.use(express.json());

const atlasUrl =
  "mongodb+srv://admin:pass123!@cluster0.qob2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

global.mongoose.connect(atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Getter for all models except for users
app.get("/rest/:model", async (req, res) => {
  let model = models[req.params.model];
  if (req.params.model === "users") {
    res.json("No such request is found");
    return;
  }

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
app.put("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model];

  let doc = await model.findById(req.params.id);

  // update object with new values
  Object.assign(doc, req.body);
  await doc.save();

  res.json(doc);
});

app.listen(3001, () => console.log("Server stated on port 3001"));
