const express = require("express");
const router = express.Router();

const {
    createMeetup,
    deleteMeetup,
    getAllMeetups,
    getMeetupById,
    getMeetups
} = require("../functions/meetupFunctions");

router.post("/create-meetup", async (req, res) => {
    const meetup = await createMeetup(req.body);
    if (meetup.hasOwnProperty("hasErrors")) {
        return res.status(400).json({routeString: '/create-meetup', meetup});
    } else {
        res.json({routeString: '/create-meetup', meetup});
    }
});

router.get("/get-all-meetups", async (req, res) => {
    const meetups = await getAllMeetups();
    res.json({routeString: '/get-meetups', meetups});
});

router.get("/get-future-meetups", async (req, res) => {
    const meetups = await getMeetups('$gte');
    setTimeout(() => {
        res.json({routeString: '/get-future-meetups', meetups});
    }, 1000);
});

router.get("/get-past-meetups", async (req, res) => {
    const meetups = await getMeetups('$lt');
    setTimeout(() => {
        res.json({routeString: '/get-past-meetups', meetups});
    }, 1000);
});

router.get("/get-meetup/:id", async (req, res) => {
    const meetup = await getMeetupById(req.params.id);
    setTimeout(() => {
        res.json({routeString: `/get-meetup/${req.params.id}`, meetup});
    }, 1000);
});

router.put("/update-meetup", async (req, res) => {
    res.json({routeString: '/update-meetup'});
});

router.delete("/delete-meetup", async (req, res) => {
    const meetup = await deleteMeetup(req.body.id);
    res.json({routeString: '/delete-meetup', meetup});
});

module.exports = router;
