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


// Function to submit the turf form
// function submitTurfForm() {
//     const selectedTurfInput = document.getElementById("selected-turf");
//     const turfForm = document.getElementById("turf-form");

//     if (turfForm) {
//         const bookingTurfInput = turfForm.querySelector('input[name="selectedTurf"]');
//         if (bookingTurfInput) {
//             bookingTurfInput.value = selectedTurfInput.value;
//         }
//         turfForm.submit();
//     }
// }


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

$(document).ready(function () {
    $('#matchForm').submit(function (e) {
        e.preventDefault(); // Prevent form submission

        let selectedDate = $('#selected-date').val();
        let selectedTime = $('input[name="time"]:checked').val();

        if (selectedTime === undefined) {
            $('#errorModal').modal('show');
        } else {
            // Show the confirmation modal
            $('#confirmModal').find('.modal-body').html(`
                <p>Please confirm your match details.</p>
                <p>Date: ${selectedDate}</p>
                <p>Time: ${selectedTime}</p>
            `);
            $('#confirmModal').modal('show');
        }
    });

    // Handle form submission when the confirm button is clicked
    $('#confirmModal').on('click', '.btn-primary', function () {
        // Submit the form
        $('#matchForm').unbind('submit').submit();
    });

    // Handle cancel button click in the confirm modal
    $('#confirmModal').on('click', '.btn-dark', function () {
        $('#confirmModal').modal('hide');
    });

    // Handle OK button click in the error modal
    $('#errorModal').on('click', '.btn-primary', function () {
        $('#errorModal').modal('hide');
    });
});
