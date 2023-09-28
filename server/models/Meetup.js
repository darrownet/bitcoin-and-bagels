const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: false,
    default: 2100
  },
  description: {
    type: String,
    required: false,
    default: "default description"
  },
  image: {
    type: String,
    required: false,
    default: "/images/default.png"
  },
  title: {
    type: String,
    required: true
  }
}, {collection: 'Meetups'});

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;
