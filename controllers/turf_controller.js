const Turf = require('../models/turf');
const Booking = require('../models/booking');

module.exports.create = async function (req, res) {
    try {
        let turf = await Turf.create(req.body);
        return res.status(200).json('success in creating turf');
    } catch (err) {
        res.status(500).json(err);
        console.log('Error in creating turf', err)
    };
};


module.exports.destroy = async function (req, res) {
    try {
        let turf = await Turf.findById(req.params.id)
        turf.deleteOne();
        return res.status(200).json('success in deleting turf');
    } catch (err) {
        res.status(500).json(err);
        console.log("Error in deleting turf", err);
    };
};

module.exports.render = async function (req, res) {
    try {
        // Retrieve the turf ID from the request params
        let turf = await Turf.findById(req.params.id);

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

        // Render the turf page template (assuming you have a "turf.ejs" template file)
        return res.render('turf', {
            title: " | Kolhapur",
            turf: turf,
            currentDate: currentDate,
            selectedDate: selectedDate,
            bookings: bookings,
        });

    } catch (err) {
        console.log('Error in displaying turfs', err);
    }
};

module.exports.createBooking = async function (req, res) {
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
            req.flash('error', 'Booking is not done, already booked by someone');
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
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating booking', err);
    };
};