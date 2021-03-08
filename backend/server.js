global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = require("./models/models.js");


app.use(express.json());

const atlasUrl =
  "mongodb+srv://anna636:hikplc@cluster0.01xvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  
global.mongoose.connect(atlasUrl, {
  // let me speak the same dialect
  // as a modern MongoDB server:
  useNewUrlParser: true,
  useUnifiedTopology: true,
});






app.listen(3001, () => console.log('Server stated on port 3001'))