console.log('turf script loaded');

//submitting select date form
function submitDateForm() {
    const selectedDateInput = document.getElementById("selected-date");
    const dateForm = document.getElementById("date-form");

    if (dateForm) {
        const bookingDateInput = dateForm.querySelector('input[name="date"]');
        if (bookingDateInput) {
            bookingDateInput.value = selectedDateInput.value;
        }
        dateForm.submit();
    }
}


// Set the minimum date of the input field to the current date
const selectDateInput = document.getElementById('selected-date');
const currentDate = new Date().toISOString().split('T')[0];
selectDateInput.min = currentDate;



$(document).ready(function () {
    var x = $(".booking-timeslot").map(function () {
        var htmlContent = $(this).html();
        var timeSlot = htmlContent.match(/\d{1,2}:\d{2}(?:AM|PM) to \d{1,2}:\d{2}(?:AM|PM)/)[0];
        return timeSlot;
    }).get();

    const bookedSlots = x;

    // Convert the NodeList to an array using Array.from or spreading
    const labels = Array.from(document.querySelectorAll(".btn-secondary"));

    // Loop through all the labels associated with the checkboxes
    labels.forEach(label => {
        const slot = label.querySelector('input').value;
        const input = label.querySelector('input[type="checkbox"]');
        if (bookedSlots.includes(slot)) {
            label.classList.remove("btn-secondary");
            label.classList.add("btn-booked"); // Add a CSS class to reflect the booked state
            input.disabled = true; // disable the button to prevent further bookings
        }
    });
});
