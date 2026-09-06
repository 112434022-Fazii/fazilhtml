/* =========================================
   CINEMAX MOVIE BOOKING SYSTEM
   ========================================= */


/* =========================================
   CREATE ACCOUNT - SHOW REGISTER BOX
   ========================================= */

function showRegister() {

    const registerBox = document.getElementById("registerBox");

    if (registerBox) {

        registerBox.style.display = "block";

        registerBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


/* =========================================
   REGISTER USER - MYSQL
   ========================================= */

function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");


    /* Username validation */

    if (username.length < 3) {

        message.style.color = "red";
        message.textContent =
            "Username must contain at least 3 characters.";

        return;
    }


    /* Password validation */

    if (password.length < 6) {

        message.style.color = "red";
        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    /* Confirm password */

    if (password !== confirmPassword) {

        message.style.color = "red";
        message.textContent =
            "Passwords do not match.";

        return;
    }


    /* Create form data */

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);


    /* Send data to PHP */

    fetch("register.php", {
        method: "POST",
        body: formData
    })

    .then(response => response.text())

    .then(data => {

        message.textContent = data;


        if (data.trim() === "Registration successful!") {

            message.style.color = "green";

            document.getElementById("registerName").value = "";
            document.getElementById("registerUsername").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
            document.getElementById("confirmPassword").value = "";

        } else {

            message.style.color = "red";

        }

    })

    .catch(error => {

        console.log(error);

        message.style.color = "red";
        message.textContent =
            "Unable to connect to server.";

    });
}


/* =========================================
   LOGIN USER
   ========================================= */

function loginUser(event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    /* Get registered user */

    const savedUser =
        JSON.parse(localStorage.getItem("user"));


    /* Check account */

    if (!savedUser) {

        message.style.color = "red";

        message.textContent =
            "Account not found. Please create an account first.";

        return;
    }


    /* Check username and password */

    if (
        username.toLowerCase() ===
        savedUser.username.toLowerCase()
        &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        message.style.color = "green";

        message.textContent =
            "Login successful!";


        setTimeout(function () {

            window.location.href =
                "movies.html";

        }, 700);

    } else {

        message.style.color = "red";

        message.textContent =
            "Incorrect username or password.";

    }
}


/* =========================================
   LOGOUT
   ========================================= */

function logoutUser() {

    localStorage.removeItem("loggedIn");

    alert("You have been logged out.");

    window.location.href = "index.html";
}


/* =========================================
   SELECT MOVIE
   ========================================= */

function selectMovie(movie) {

    localStorage.setItem(
        "selectedMovie",
        movie
    );

    window.location.href =
        "booking.html";
}


/* =========================================
   GET MOVIE PRICE
   ========================================= */

function getMoviePrice(movie) {

    if (movie === "Avengers: Doomsday") {
        return 250;
    }

    if (movie === "The Conjuring") {
        return 200;
    }

    if (movie === "Sita Ramam") {
        return 180;
    }

    return 0;
}


/* =========================================
   CALCULATE PRICE
   ========================================= */

function calculatePrice() {

    const movieSelect =
        document.getElementById("movieSelect");

    const ticketCount =
        document.getElementById("ticketCount");

    const ticketPrice =
        document.getElementById("ticketPrice");

    const totalPrice =
        document.getElementById("totalPrice");


    if (
        !movieSelect ||
        !ticketCount ||
        !ticketPrice ||
        !totalPrice
    ) {
        return;
    }


    const price =
        getMoviePrice(movieSelect.value);

    const tickets =
        parseInt(ticketCount.value) || 0;


    ticketPrice.textContent =
        "₹" + price;

    totalPrice.textContent =
        "₹" + (price * tickets);
}


/* =========================================
   GET TODAY'S DATE
   ========================================= */

function getTodayDate() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


/* =========================================
   GET DATE AFTER SPECIFIC DAYS
   ========================================= */

function getDateAfterDays(days) {

    const date = new Date();

    date.setDate(
        date.getDate() + days
    );


    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(date.getDate())
        .padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


/* =========================================
   CHECK VALID BOOKING DATE
   Only today + next 2 days
   ========================================= */

function isValidBookingDate(date) {

    const today =
        getTodayDate();

    const lastDate =
        getDateAfterDays(2);


    return (
        date >= today &&
        date <= lastDate
    );
}


/* =========================================
   SELECTED SEATS
   ========================================= */

let selectedSeats = [];


/* =========================================
   CREATE 96 SEATS
   A1 - H12
   ========================================= */

function createSeats() {

    const container =
        document.getElementById("seatContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const rows = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H"
    ];


    rows.forEach(function (row) {

        const rowDiv =
            document.createElement("div");

        rowDiv.className =
            "seat-row";


        /* Row name */

        const rowName =
            document.createElement("span");

        rowName.className =
            "row-name";

        rowName.textContent =
            row;

        rowDiv.appendChild(rowName);


        /* Create 12 seats */

        for (
            let number = 1;
            number <= 12;
            number++
        ) {

            const seat =
                document.createElement("button");

            seat.type =
                "button";

            seat.className =
                "seat";

            seat.textContent =
                row + number;

            seat.dataset.seat =
                row + number;


            seat.onclick =
                function () {

                    selectSeat(this);

                };


            rowDiv.appendChild(seat);
        }


        container.appendChild(rowDiv);

    });


    loadBookedSeats();
}


/* =========================================
   SELECT / UNSELECT SEAT
   ========================================= */

function selectSeat(seat) {

    /* Don't select booked seat */

    if (
        seat.classList.contains(
            "booked-seat"
        )
    ) {
        return;
    }


    const ticketInput =
        document.getElementById(
            "ticketCount"
        );


    const ticketCount =
        parseInt(ticketInput.value) || 1;


    const seatNumber =
        seat.dataset.seat;


    /* If already selected, unselect */

    if (
        selectedSeats.includes(
            seatNumber
        )
    ) {

        selectedSeats =
            selectedSeats.filter(
                function (item) {

                    return item !==
                        seatNumber;

                }
            );


        seat.classList.remove(
            "selected-seat"
        );


        showSelectedSeats();

        return;
    }


    /* Don't allow more seats than tickets */

    if (
        selectedSeats.length >=
        ticketCount
    ) {

        document.getElementById(
            "seatMessage"
        ).textContent =
            "You can select only " +
            ticketCount +
            " seat(s).";

        return;
    }


    /* Select seat */

    selectedSeats.push(
        seatNumber
    );


    seat.classList.add(
        "selected-seat"
    );


    showSelectedSeats();
}


/* =========================================
   DISPLAY SELECTED SEATS
   ========================================= */

function showSelectedSeats() {

    const message =
        document.getElementById(
            "seatMessage"
        );


    if (!message) {
        return;
    }


    if (
        selectedSeats.length === 0
    ) {

        message.textContent = "";

        return;
    }


    message.textContent =
        "Selected Seats: " +
        selectedSeats.join(", ");
}


/* =========================================
   GET UNIQUE BOOKING KEY
   Movie + Date + Show Time
   ========================================= */

function getBookingKey() {

    const movie =
        document.getElementById(
            "movieSelect"
        ).value;

    const date =
        document.getElementById(
            "bookingDate"
        ).value;

    const time =
        document.getElementById(
            "showTime"
        ).value;


    return (
        movie +
        "|" +
        date +
        "|" +
        time
    );
}


/* =========================================
   LOAD BOOKED SEATS
   ========================================= */

function loadBookedSeats() {

    const movie =
        document.getElementById(
            "movieSelect"
        );

    const date =
        document.getElementById(
            "bookingDate"
        );

    const time =
        document.getElementById(
            "showTime"
        );


    if (
        !movie ||
        !date ||
        !time
    ) {
        return;
    }


    /* Clear previous selected seats */

    selectedSeats = [];


    document.querySelectorAll(
        ".seat"
    ).forEach(function (seat) {

        seat.classList.remove(
            "selected-seat"
        );

        seat.classList.remove(
            "booked-seat"
        );

    });


    /* Nothing selected */

    if (
        movie.value === "" ||
        date.value === "" ||
        time.value === ""
    ) {

        showSelectedSeats();

        return;
    }


    const key =
        getBookingKey();


    /* Get all booked seats */

    const allBookings =
        JSON.parse(
            localStorage.getItem(
                "bookedSeats"
            )
        ) || {};


    const bookedSeats =
        allBookings[key] || [];


    /* Mark booked seats */

    document.querySelectorAll(
        ".seat"
    ).forEach(function (seat) {

        if (
            bookedSeats.includes(
                seat.dataset.seat
            )
        ) {

            seat.classList.add(
                "booked-seat"
            );

        }

    });


    showSelectedSeats();
}


/* =========================================
   TICKET COUNT CHANGED
   ========================================= */

function ticketChanged() {

    const input =
        document.getElementById(
            "ticketCount"
        );


    let count =
        parseInt(input.value);


    /* Minimum */

    if (
        isNaN(count) ||
        count < 1
    ) {

        count = 1;

        input.value = 1;
    }


    /* Maximum */

    if (count > 6) {

        count = 6;

        input.value = 6;

        alert(
            "Maximum 6 tickets are allowed."
        );
    }


    /* Clear selected seats */

    selectedSeats = [];


    document.querySelectorAll(
        ".seat"
    ).forEach(function (seat) {

        seat.classList.remove(
            "selected-seat"
        );

    });


    showSelectedSeats();

    calculatePrice();
}


/* =========================================
   CONFIRM BOOKING
   ========================================= */

function confirmBooking() {

    /* Check login */

    const loggedIn =
        localStorage.getItem(
            "loggedIn"
        );


    if (loggedIn !== "true") {

        alert(
            "Please login before booking."
        );

        window.location.href =
            "index.html";

        return;
    }


    /* Get booking details */

    const movie =
        document.getElementById(
            "movieSelect"
        ).value;

    const date =
        document.getElementById(
            "bookingDate"
        ).value;

    const time =
        document.getElementById(
            "showTime"
        ).value;

    const tickets =
        parseInt(
            document.getElementById(
                "ticketCount"
            ).value
        );


    /* Movie validation */

    if (movie === "") {

        alert(
            "Please select a movie."
        );

        return;
    }


    /* Date validation */

    if (date === "") {

        alert(
            "Please select a booking date."
        );

        return;
    }


    if (
        !isValidBookingDate(date)
    ) {

        alert(
            "Booking is available only for today and the next 2 days."
        );

        return;
    }


    /* Show time validation */

    if (time === "") {

        alert(
            "Please select a show time."
        );

        return;
    }


    /* Ticket validation */

    if (
        isNaN(tickets) ||
        tickets < 1 ||
        tickets > 6
    ) {

        alert(
            "Please select between 1 and 6 tickets."
        );

        return;
    }


    /* Seat validation */

    if (
        selectedSeats.length !== tickets
    ) {

        alert(
            "Please select exactly " +
            tickets +
            " seat(s)."
        );

        return;
    }


    /* Get existing booked seats */

    const key =
        getBookingKey();


    const allBookings =
        JSON.parse(
            localStorage.getItem(
                "bookedSeats"
            )
        ) || {};


    if (!allBookings[key]) {

        allBookings[key] = [];

    }


    /* Check if seat already booked */

    const conflict =
        selectedSeats.some(
            function (seat) {

                return allBookings[key]
                    .includes(seat);

            }
        );


    if (conflict) {

        alert(
            "One or more selected seats are already booked."
        );

        loadBookedSeats();

        return;
    }


    /* Save booked seats */

    allBookings[key] =
        allBookings[key].concat(
            selectedSeats
        );


    localStorage.setItem(
        "bookedSeats",
        JSON.stringify(
            allBookings
        )
    );


    /* Calculate total */

    const price =
        getMoviePrice(movie);

    const total =
        price * tickets;


    /* Create booking ID */

    const bookingId =
        "CM" + Date.now();


    /* Create booking object */

    const booking = {

        id: bookingId,

        movie: movie,

        date: date,

        time: time,

        seats: selectedSeats,

        tickets: tickets,

        total: total

    };


    /* Save last booking */

    localStorage.setItem(
        "lastBooking",
        JSON.stringify(
            booking
        )
    );


    /* Go to confirmation page */

    window.location.href =
        "confirmation.html";
}


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* BOOKING DATE */

        const dateInput =
            document.getElementById(
                "bookingDate"
            );


        if (dateInput) {

            const today =
                getTodayDate();

            const lastDate =
                getDateAfterDays(2);


            /* Only today + next 2 days */

            dateInput.min =
                today;

            dateInput.max =
                lastDate;


            /* Replace old date */

            if (
                !isValidBookingDate(
                    dateInput.value
                )
            ) {

                dateInput.value =
                    today;

            }


            /* Date changed */

            dateInput.addEventListener(
                "change",
                function () {

                    if (
                        !isValidBookingDate(
                            this.value
                        )
                    ) {

                        alert(
                            "Please select today or one of the next 2 days."
                        );

                        this.value =
                            getTodayDate();

                    }


                    loadBookedSeats();

                }
            );

        }


        /* MOVIE SELECT */

        const movieSelect =
            document.getElementById(
                "movieSelect"
            );


        if (movieSelect) {

            const savedMovie =
                localStorage.getItem(
                    "selectedMovie"
                );


            if (savedMovie) {

                movieSelect.value =
                    savedMovie;


                localStorage.removeItem(
                    "selectedMovie"
                );

            }


            movieSelect.addEventListener(
                "change",
                function () {

                    selectedSeats = [];

                    calculatePrice();

                    loadBookedSeats();

                }
            );

        }


        /* SHOW TIME */

        const showTime =
            document.getElementById(
                "showTime"
            );


        if (showTime) {

            showTime.addEventListener(
                "change",
                function () {

                    selectedSeats = [];

                    loadBookedSeats();

                }
            );

        }


        /* TICKET COUNT */

        const ticketCount =
            document.getElementById(
                "ticketCount"
            );


        if (ticketCount) {

            ticketCount.addEventListener(
                "change",
                ticketChanged
            );

        }


        /* CREATE SEATS */

        const seatContainer =
            document.getElementById(
                "seatContainer"
            );


        if (seatContainer) {

            createSeats();

            calculatePrice();

        }


        /* CONFIRMATION PAGE */

        const booking =
            JSON.parse(
                localStorage.getItem(
                    "lastBooking"
                )
            );


        if (
            booking &&
            document.getElementById(
                "bookingId"
            )
        ) {

            document.getElementById(
                "bookingId"
            ).textContent =
                booking.id;


            document.getElementById(
                "confirmMovie"
            ).textContent =
                booking.movie;


            document.getElementById(
                "confirmDate"
            ).textContent =
                booking.date;


            document.getElementById(
                "confirmTime"
            ).textContent =
                booking.time;


            document.getElementById(
                "confirmSeats"
            ).textContent =
                booking.seats.join(", ");


            document.getElementById(
                "confirmTickets"
            ).textContent =
                booking.tickets;


            document.getElementById(
                "confirmTotal"
            ).textContent =
                "₹" + booking.total;

        }

    }
);