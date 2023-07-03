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
            // Get the current date 
            const currentDate = new Date().toISOString().split('T')[0];

            let selectedDate = currentDate;
            if (req.query.selectedDate) {
                let newSelectedDate = new Date(req.query.selectedDate);
                selectedDate = newSelectedDate.toISOString().split('T')[0];
            };

            // Fetch the bookings data for the selected date for the current turf
            const bookings = await Booking.find({
                date: selectedDate,
                turf: turf
            }).populate('user', 'name');

            return res.render('matches', {
                title: " | Create Match",
                turf: turf,
                bookings: bookings,
                matches: match,
                currentDate: currentDate,
                selectedDate: selectedDate,
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
    try {
        //CHECKING DATE AND TIME SELECTED OR NOT
        let notDate = req.body.date;
        if (!notDate) {
            console.error("Please select the date");
            return res.redirect('back');
        };

        let notTime = req.body.time;
        if (!notTime) {
            console.error("Please select the time");
            return res.redirect('back');
        };

        //CHECKING EXISTING BOOKING
        let existingBooking = await Booking.findOne({
            date: req.body.date,
            time: req.body.time,
            turf: req.body.turf
        });

        if (existingBooking) {
            console.log("Booking already exists");
            return res.redirect('back');
        }

        let turf = await Turf.findById(req.body.turf)
        if (turf) {
            let booking = await Booking.create({
                date: req.body.date,
                time: req.body.time,
                user: req.user._id,
                turf: req.body.turf
            })

            turf.bookings.push(booking);
            turf.save();
            req.flash('success', 'Booking is done');
            console.log("Booking is done");
        }

        let match = await Match.findOne({matchName: req.body.matchName})
        if (!match){
            let match = await Match.create({
                date: req.body.date,
                time: req.body.time,
                user: req.user._id,
                turf: req.body.turf,
                matchName: req.body.matchName,
                gameName: req.body.gameName,
                gameLevel: req.body.gameLevel
            });
            req.flash('success', 'Match Created successfully');
            console.log("Match Created successfully");
            return res.redirect('back');
        }else{
            req.flash('error', 'Similar Match Name already exists');
            console.log("Similar Match Name already exists");
            return res.redirect('back');
        }

    } catch (err) {
        console.log('Error in creating match', err);
    };
};