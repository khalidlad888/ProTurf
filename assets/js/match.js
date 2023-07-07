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
    var bookedSlots = [];

    $(".booking-timeslot").each(function () {
        var htmlContent = $(this).html();
        var timeSlots = htmlContent.match(/\d{1,2}:\d{2}(?:AM|PM) to \d{1,2}:\d{2}(?:AM|PM)/g);
        bookedSlots = bookedSlots.concat(timeSlots);
    });

    const labels = Array.from(document.querySelectorAll(".btn-outline-success"));

    labels.forEach(label => {
        const slot = label.querySelector('input').value;
        const input = label.querySelector('input[type="checkbox"]');
        if (bookedSlots.includes(slot)) {
            label.classList.remove("btn-outline-success");
            label.classList.add("btn-booked");
            input.disabled = true;
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
