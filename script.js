// ===============================
// MOVIE PRICES
// ===============================

const moviePrices = {
    "Avengers Doomsday": 200,
    "Sita Ramam": 180,
    "The Conjuring": 200
};


// ===============================
// LOGIN
// ===============================

function login() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Please enter your name and email.");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    window.location.href = "movies.html";
}


// ===============================
// MOVIE BOOK NOW
// ===============================

function selectMovie(movie) {

    localStorage.setItem("selectedMovie", movie);

    window.location.href = "booking.html";
}


// ===============================
// BOOKING PAGE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const seats = document.querySelectorAll(".seat");

    const movieSelect = document.getElementById("movie");

    const dateInput = document.getElementById("date");

    const timeSelect = document.getElementById("time");

    const selectedSeatsText =
        document.getElementById("selectedSeats");

    const ticketCount =
        document.getElementById("ticketCount");

    const totalPrice =
        document.getElementById("totalPrice");

    const movieTitle =
        document.getElementById("movieTitle");


    // ===============================
    // CHECK IF WE ARE ON BOOKING PAGE
    // ===============================

    if (
        seats.length === 0 ||
        !movieSelect
    ) {
        loadConfirmation();
        return;
    }


    // ===============================
    // LOAD MOVIE FROM MOVIES PAGE
    // ===============================

    const savedMovie =
        localStorage.getItem("selectedMovie");

    if (savedMovie) {

        movieSelect.value = savedMovie;

        movieTitle.textContent =
            savedMovie + " - Select Seats";
    }


    // ===============================
    // SET TODAY AS MINIMUM DATE
    // ===============================

    if (dateInput) {

        const today = new Date()
            .toISOString()
            .split("T")[0];

        dateInput.min = today;
    }


    // ===============================
    // SELECTED SEATS ARRAY
    // ===============================

    let selectedSeats = [];


    // ===============================
    // SEAT CLICK
    // ===============================

    seats.forEach(function (seat) {

        // Ignore occupied seats
        if (seat.classList.contains("occupied")) {
            return;
        }


        seat.addEventListener("click", function () {

            const seatName =
                seat.textContent.trim();


            // If already selected
            if (seat.classList.contains("selected")) {

                seat.classList.remove("selected");

                selectedSeats =
                    selectedSeats.filter(
                        function (item) {
                            return item !== seatName;
                        }
                    );

            }

            // Select seat
            else {

                // Maximum 10 seats
                if (selectedSeats.length >= 10) {

                    alert(
                        "You can select maximum 10 seats."
                    );

                    return;
                }


                seat.classList.add("selected");

                selectedSeats.push(seatName);
            }


            updateSummary();

        });

    });


    // ===============================
    // UPDATE MOVIE
    // ===============================

    movieSelect.addEventListener(
        "change",
        function () {

            const movie =
                movieSelect.value;

            if (movie) {

                movieTitle.textContent =
                    movie + " - Select Seats";

            }
            else {

                movieTitle.textContent =
                    "Select Your Seats";

            }

            updateSummary();

        }
    );


    // ===============================
    // UPDATE SUMMARY
    // ===============================

    function updateSummary() {

        const movie =
            movieSelect.value;

        const price =
            moviePrices[movie] || 0;

        const total =
            price * selectedSeats.length;


        if (selectedSeats.length > 0) {

            selectedSeatsText.textContent =
                selectedSeats.join(", ");

        }
        else {

            selectedSeatsText.textContent =
                "None";

        }


        ticketCount.textContent =
            selectedSeats.length;


        totalPrice.textContent =
            "₹" + total;
    }


    // ===============================
    // CONTINUE BUTTON
    // ===============================

    window.continueBooking = function () {

        const movie =
            movieSelect.value;

        const date =
            dateInput.value;

        const time =
            timeSelect.value;


        // Check movie
        if (movie === "") {

            alert("Please select a movie.");

            return;
        }


        // Check date
        if (date === "") {

            alert("Please select a date.");

            return;
        }


        // Check time
        if (time === "") {

            alert("Please select a show time.");

            return;
        }


        // Check seats
        if (selectedSeats.length === 0) {

            alert("Please select at least one seat.");

            return;
        }


        const price =
            moviePrices[movie];

        const total =
            price * selectedSeats.length;


        // ===============================
        // SAVE BOOKING
        // ===============================

        localStorage.setItem(
            "bookingMovie",
            movie
        );

        localStorage.setItem(
            "bookingDate",
            date
        );

        localStorage.setItem(
            "bookingTime",
            time
        );

        localStorage.setItem(
            "bookingSeats",
            selectedSeats.join(", ")
        );

        localStorage.setItem(
            "bookingTickets",
            selectedSeats.length
        );

        localStorage.setItem(
            "bookingTotal",
            total
        );


        // ===============================
        // GO TO CONFIRMATION
        // ===============================

        window.location.href =
            "confirmation.html";

    };

});


// ===============================
// CONFIRMATION PAGE
// ===============================

function loadConfirmation() {

    const movie =
        localStorage.getItem("bookingMovie");

    const date =
        localStorage.getItem("bookingDate");

    const time =
        localStorage.getItem("bookingTime");

    const seats =
        localStorage.getItem("bookingSeats");

    const tickets =
        localStorage.getItem("bookingTickets");

    const total =
        localStorage.getItem("bookingTotal");


    const confirmMovie =
        document.getElementById("confirmMovie");

    // If confirmation page doesn't contain
    // these elements, stop.
    if (!confirmMovie) {
        return;
    }


    document.getElementById(
        "bookingId"
    ).textContent =
        "MB" + Math.floor(
            100000 + Math.random() * 900000
        );


    document.getElementById(
        "confirmMovie"
    ).textContent =
        movie || "-";


    document.getElementById(
        "confirmDate"
    ).textContent =
        date || "-";


    document.getElementById(
        "confirmTime"
    ).textContent =
        time || "-";


    document.getElementById(
        "confirmSeats"
    ).textContent =
        seats || "-";


    document.getElementById(
        "confirmTickets"
    ).textContent =
        tickets || "-";


    document.getElementById(
        "confirmTotal"
    ).textContent =
        total ? "₹" + total : "-";
}