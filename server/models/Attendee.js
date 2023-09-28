const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  invoice: {
    type: String,
    required: true
  },
  meetup_id: {
    type: Schema.Types.ObjectId,
    required: false,
    default: "/images/default.png"
  }
}, {collection: 'Attendees'});

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;
