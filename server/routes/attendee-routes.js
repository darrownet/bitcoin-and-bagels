const express = require("express");
const router = express.Router();

const {checkInvoiceStatus, deleteAttendee, getAttendees, requestInvoice} = require("../functions/attendeeFunctions");
const Meetup = require("../models/Meetup");
const {deleteMeetup} = require("../functions/meetupFunctions");

router.post("/await-payment", async (req, res) => {
  const status = await checkInvoiceStatus(req.body.paymentRequestId);
  res.json(status);
});

router.delete("/delete-attendee", async (req, res) => {
  const meetup = await deleteAttendee(req.body.id);
  res.json({routeString: '/delete-meetup', meetup});
});

router.get("/get-attendees", async (req, res) => {
  const attendees  = await getAttendees();
  res.json({routeString: '/get-attendees', attendees});
});

router.get("/get-meetup-attendees/:id", async (req, res) => {
  res.json({routeString: `/get-meetup-attendees/${req.params.id}`});
});

router.post("/request-invoice", async (req, res) => {
  const invoice = await requestInvoice(req.body);
  if (invoice.hasOwnProperty("hasErrors")) {
    return res.status(400).json({routeString: '/request-invoice', invoice});
  } else {
    setTimeout(() => {
      res.json({routeString: '/request-invoice', invoice});
    }, 3000);
  }
});

module.exports = router;
