const Attendee = require("../models/Attendee");
const Meetup = require("../models/Meetup");
const validateMeetup = require("../validation/meetup");

const createMeetup = async function (data) {
  const {errors, isValid} = validateMeetup(data);
  if (!isValid) {
    return {hasErrors: true, errors};
  }
  const newMeetup = new Meetup({...data});
  return await newMeetup.save();
}

const deleteMeetup = async function (id) {
  try {
    return await Meetup.deleteOne({_id: id});
  } catch (error) {
    return {hasErrors: true, error};
  }
}

const getAllMeetups = async function () {
  return await Meetup.find({}).exec();
}

const getMeetupById = async function (id) {
  try {
    return await Meetup.findById(id).exec();
  } catch (error) {
    return {hasErrors: true, error};
  }
}

const getMeetups = async function (direction) {
  const currentDate = new Date();
  const meetups = await Meetup.find({date: {[direction]: currentDate}});
  const meetup_ids = meetups.map(meetup => meetup._id);
  const attendees = await Attendee.find({meetup_id: {$in: meetup_ids}});
  return meetups.map((meetup) => {
    return {
      meetup,
      attendees: getAttendeeCount(attendees, meetup._id)
    }
  }).sort(function (a, b) {
    return a.date - b.date;
  });
}

module.exports = {createMeetup, deleteMeetup, getAllMeetups, getMeetupById, getMeetups};

function getAttendeeCount (attendees, meetup_id) {
  return attendees.reduce((acc, attendee) => {
    if (attendee.meetup_id.toString() === meetup_id.toString()) {
      return acc + 1;
    }
    return acc;
  }, 0);
}
