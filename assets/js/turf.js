console.log('turf script loaded');


var bookLink = document.getElementById("book-link");
var bookingForm = document.getElementById("booking-form");
var selectedDate = document.getElementById("select-date-form");
var isFormOpen = false;

bookLink.addEventListener("click", function () {
    if (isFormOpen) {
        bookingForm.style.display = "none";
        selectedDate.style.display = "block";
        isFormOpen = false;
    } else {
        bookingForm.style.display = "block";
        selectedDate.style.display = "none";
        isFormOpen = true;
    }
});

function submitDateForm() {
    const form = document.getElementById('date-form');
    form.submit();
}


// Get the date input element
const selectDateInput = document.getElementById('select-date-input');
const formDateInput = document.getElementById('form-date-input');
// Get the current date
const currentDate = new Date().toISOString().split('T')[0];

// Set the minimum date of the input field to the current date
selectDateInput.min = currentDate;
formDateInput.min = currentDate;
