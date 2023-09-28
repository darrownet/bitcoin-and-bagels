const Attendee = require("../models/Attendee");
const Meetup = require("../models/Meetup");
const validateAttendee = require("../validation/attendee");
const {authenticatedLndGrpc} = require('lightning');
const {createInvoice, getInvoice} = require('ln-service');
const {createTransport} = require('nodemailer');

// const {lnd} = authenticatedLndGrpc({
//     macaroon: process.env.macaroon_voltage,
//     socket: 'bitcoinandbagels.m.voltageapp.io:10009',
// });

const {lnd} = authenticatedLndGrpc({
    cert: process.env.cert,
    macaroon: process.env.macaroon_local,
    socket: 'hal-9000.local:10009'
});

const transporter = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "matt@darrownet.com",
    pass: process.env.smtp_pass,
  },
});

const checkInvoiceStatus = async (paymentRequestId) => {
    const invoice = await getInvoice({id: paymentRequestId, lnd});
    const confirmed = invoice.is_confirmed;
    const [name, email, meetup_id] = invoice.description.split('|::|');
    if (confirmed) {
        const newAttendee = new Attendee({name, email, meetup_id, invoice: JSON.stringify(invoice)});
        await newAttendee.save();
        const emailSent = await sendEmail(invoice);
        if (emailSent) {
            return {attendee: newAttendee, emailSent: true, invoicePaid: true};
        } else {
            return {attendee: newAttendee, emailSent: false, invoicePaid: true};
        }
    } else {
        return {invoicePaid: false};
    }
}

const deleteAttendee = async function (id) {
    try {
        return await Attendee.deleteOne({_id: id});
    } catch (error) {
        return {hasErrors: true, error};
    }
}

const getAttendees = async function () {
    return await Attendee.find({}).exec();
}

const requestInvoice = async (data) => {
    const {errors, isValid} = validateAttendee(data);
    if (!isValid) {
        return {hasErrors: true, errors};
    }
    const invoiceData = {
        description: `${data.name}|::|${data.email}|::|${data.meetup_id}`,
        expires_at: getExpiryTime(),
        lnd,
        tokens: 210
    };
    try {
        return await createInvoice(invoiceData);
    } catch (error) {
        return {hasErrors: true, error};
    }
}

module.exports = {checkInvoiceStatus, deleteAttendee, getAttendees, requestInvoice};

function getExpiryTime() {
    // Get the current time in milliseconds since January 1, 1970 (Unix timestamp)
    const currentTime = Date.now();
    // Add 21 minutes worth of milliseconds (1 minute = 60,000 milliseconds)
    // const expiryTime = currentTime + 21 * 60 * 1000;
    const expiryTime = currentTime + 2.1 * 60 * 1000;
    // Convert the expiryTime back to a human-readable ISO 8601 date string
    return new Date(expiryTime).toISOString()
}

async function sendEmail(invoice) {
    const [name, email, meetup_id] = invoice.description.split('|::|');
    const meetup = await Meetup.findById(meetup_id).exec();
    const mailOptions = {
      from: 'rsvp@bitcoinbagels.com',
      to: email,
      subject: `You've registered for a Bitcoin & Bagels Meetup! - ${meetup.title}`,
      text: `Hello ${name},\nThank you kindly for registering for the Bitcoin & Bagels meetup – ${meetup.title} on ${meetup.date}. We'll see you there!`,
      html: `<html>
                <body>
                    <h1>Hello ${name} from Bitcoin & Bagels!</h1>
                    <p>Hello ${name},</p>
                    <p>Thank you kindly for registering for the Bitcoin & Bagels meetup – ${meetup.title} on ${meetup.date}. We'll see you there!</p>
                </body>
            </html>`
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error) {
      return !error;
    });
}
