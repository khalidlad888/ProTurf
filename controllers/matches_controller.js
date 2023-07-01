const User = require('../models/user');
const Turf = require('../models/turf');
const Booking = require('../models/booking');
const Match = require('../models/match');


module.exports.render = async function (req, res) {
    try {
        if (req.user) {
            let user = await User.find({});
            let turf = await Turf.find({});
            let match = await Match.find({});
            return res.render('matches', {
                title: " | Create Match",
                turf: turf,
                matches: match,
                users: user
            });
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};


module.exports.createMatch = async function (req, res) {
    // console.log(req.body.startTime);
    // try {
    //     let existingBooking = await Booking.findOne({
    //         date: req.body.date,
    //         time: req.body.time,
    //         turf: req.body.turf
    //     });

    //     if (existingBooking) {
    //         console.log("Booking already exists");
    //         return res.redirect('back');
    //     }

    //     let notDate = req.body.date;
    //     if (!notDate){
    //         console.error("Please select the date");
    //         return res.redirect('back');
    //     };

    //     let turf = await Turf.findById(req.body.turf)
    //     if (turf) {
    //         let booking = await Booking.create({
    //             date: req.body.date,
    //             time: req.body.time,
    //             user: req.user._id,
    //             turf: req.body.turf
    //         })

    //         turf.bookings.push(booking);
    //         turf.save();
    //         console.log("Match is created and booking is done");
    //         return res.redirect('back');
    //     }
    // } catch (err) {
    //     console.log('Error in creating booking', err);
    // };
};


// Define a route to handle the form submission
// app.post('/host-match', (req, res) => {
//     const { matchName, location, date, startTime, endTime } = req.body;

    // // Convert start time and end time to Date objects
    // const start = new Date(`2000-01-01T${startTime}`);
    // const end = new Date(`2000-01-01T${endTime}`);

    // // Calculate the time difference in minutes
    // const diffInMinutes = Math.floor((end - start) / 1000 / 60);

    // // Check if the time difference is less than 60 minutes
    // if (diffInMinutes < 60) {
    //     return res.status(400).send('End time should be at least 1 hour after the start time');
    // }

//     // Create a new match instance from the form data
//     const newMatch = new Match({
//         matchName,
//         location,
//         date,
//         startTime,
//         endTime
//     });

//     // Save the match to MongoDB
//     newMatch.save()
//         .then(() => {
//             res.send('Match hosted successfully');
//         })
//         .catch((error) => {
//             res.status(500).send('Error hosting match');
//         });
// });
