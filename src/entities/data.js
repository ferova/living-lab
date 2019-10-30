const {Schema, model} = require("mongoose");

const dataSchema = new Schema({
    temperature: Number,
    humidity: Number,
    dewpoint: Number,
    pressure: Number,
    light: Number,
    speed: Number,
    direction: Number,
    rainfall: Number,
    battery: Number
  },
  { timestamps: true }
);

module.exports = model("Data", dataSchema);