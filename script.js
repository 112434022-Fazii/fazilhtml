const API = "api/";

let movies = [];

let selectedSeats = [];


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const registerForm =
            document.getElementById(
                "registerForm"
            );

        if (registerForm) {
            setupRegister();
        }


        const loginForm =
            document.getElementById(
                "loginForm"
            );

        if (loginForm) {
            setupLogin();
        }


        const movieList =
            document.getElementById(
                "movieList"
            );

        if (movieList) {
            loadMovies();
        }


        const bookingForm =
            document.getElementById(
                "movieSelect"
            );

        if (bookingForm) {
            setupBooking();
        }


        const bookingDetails =
            document.getElementById(
                "bookingDetails"
            );

        if (bookingDetails) {
            loadConfirmation();
        }

    }
);


/* =====================================
   REGISTER
===================================== */

function setupRegister() {

    const form =
        document.getElementById(
            "registerForm"
        );

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const password =
                form.querySelector(
                    '[name="password"]'
                ).value;


            const confirmPassword =
                form.querySelector(
                    '[name="confirmPassword"]'
                ).value;


            const message =
                document.getElementById(
                    "registerMsg"
                );


            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.className =
                    "message error";

                return;
            }


            const formData =
                new FormData(form);


            try {

                const response =
                    await fetch(
                        API + "register.php",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const data =
                    await response.json();


                message.textContent =
                    data.message;


                if (data.success) {

                    message.className =
                        "message success";

                    form.reset();

                } else {

                    message.className =
                        "message error";
                }


            } catch (error) {

                console.log(error);

                message.textContent =
                    "Unable to connect to PHP.";

                message.className =
                    "message error";
            }

        }
    );
}


/* =====================================
   LOGIN
===================================== */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const message =
                document.getElementById(
                    "loginMsg"
                );


            const formData =
                new FormData(form);


            try {

                const response =
                    await fetch(
                        API + "login.php",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const data =
                    await response.json();


                message.textContent =
                    data.message;


                if (data.success) {

                    message.className =
                        "message success";


                    setTimeout(
                        function () {

                            window.location =
                                "movies.html";

                        },
                        700
                    );

                } else {

                    message.className =
                        "message error";
                }


            } catch (error) {

                console.log(error);

                message.textContent =
                    "Unable to connect to PHP.";

                message.className =
                    "message error";
            }

        }
    );
}


/* =====================================
   GET MOVIES FROM DATABASE
===================================== */

async function loadMovies() {

    const box =
        document.getElementById(
            "movieList"
        );


    try {

        const response =
            await fetch(
                API + "get_movies.php"
            );


        const data =
            await response.json();


        if (!data.success) {

            box.innerHTML =
                "<p>Unable to load movies.</p>";

            return;
        }


        movies =
            data.movies;


        box.innerHTML = "";


        movies.forEach(
            function (movie) {

                let image =
                    "images/sita-ramam.jpg";


                if (
                    movie.name ===
                    "Avengers: Doomsday"
                ) {

                    image =
                        "images/avengers.jpg";
                }


                if (
                    movie.name ===
                    "The Conjuring"
                ) {

                    image =
                        "images/conjuring.jpg";
                }


                box.innerHTML += `

                    <div class="movie-card">

                        <img
                            src="${image}"
                            alt="${movie.name}"
                        >

                        <div class="movie-info">

                            <h2>
                                ${movie.name}
                            </h2>

                            <p class="price">
                                ₹${movie.price}
                            </p>

                            <button
                                class="btn full"
                                onclick="selectMovie(${movie.id})">

                                Book Now

                            </button>

                        </div>

                    </div>

                `;
            }
        );


    } catch (error) {

        console.log(error);

        box.innerHTML =
            "<p>PHP connection error.</p>";
    }
}


/* =====================================
   SELECT MOVIE
===================================== */

function selectMovie(id) {

    window.location =
        "booking.html?movie=" + id;
}


/* =====================================
   BOOKING SETUP
===================================== */

async function setupBooking() {

    try {

        const response =
            await fetch(
                API + "get_movies.php"
            );


        const data =
            await response.json();


        movies =
            data.movies;


        const movieSelect =
            document.getElementById(
                "movieSelect"
            );


        movieSelect.innerHTML = "";


        movies.forEach(
            function (movie) {

                movieSelect.innerHTML += `

                    <option value="${movie.id}">

                        ${movie.name}

                    </option>

                `;
            }
        );


        /* MOVIE FROM URL */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const movieId =
            params.get("movie");


        if (movieId) {

            movieSelect.value =
                movieId;
        }


        /* DATE */

        const dateInput =
            document.getElementById(
                "bookingDate"
            );


        const today =
            new Date();


        const maxDate =
            new Date();


        maxDate.setDate(
            maxDate.getDate() + 2
        );


        dateInput.min =
            formatDate(today);


        dateInput.max =
            formatDate(maxDate);


        dateInput.value =
            formatDate(today);


        /* EVENTS */

        movieSelect.addEventListener(
            "change",
            renderSeats
        );


        dateInput.addEventListener(
            "change",
            renderSeats
        );


        document
            .getElementById("showTime")
            .addEventListener(
                "change",
                renderSeats
            );


        document
            .getElementById("tickets")
            .addEventListener(
                "change",
                renderSeats
            );


        document
            .getElementById("confirmBtn")
            .addEventListener(
                "click",
                saveBooking
            );


        renderSeats();


    } catch (error) {

        console.log(error);
    }
}


/* =====================================
   DATE FORMAT
===================================== */

function formatDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


/* =====================================
   GET CURRENT MOVIE
===================================== */

function getCurrentMovie() {

    const id =
        Number(
            document.getElementById(
                "movieSelect"
            ).value
        );


    return movies.find(
        function (movie) {

            return Number(movie.id) === id;

        }
    );
}


/* =====================================
   DISPLAY SEATS
===================================== */

async function renderSeats() {

    const movie =
        getCurrentMovie();


    if (!movie) {
        return;
    }


    const date =
        document.getElementById(
            "bookingDate"
        ).value;


    const time =
        document.getElementById(
            "showTime"
        ).value;


    const tickets =
        Number(
            document.getElementById(
                "tickets"
            ).value
        );


    document.getElementById(
        "ticketPrice"
    ).textContent =
        Number(movie.price).toFixed(0);


    document.getElementById(
        "totalPrice"
    ).textContent =
        (
            Number(movie.price) *
            tickets
        ).toFixed(0);


    /* GET BOOKED SEATS */

    const url =
        API +
        "get_seats.php" +
        "?movie_id=" +
        movie.id +
        "&booking_date=" +
        date +
        "&show_time=" +
        encodeURIComponent(time);


    try {

        const response =
            await fetch(url);


        const data =
            await response.json();


        const booked =
            data.booked || [];


        selectedSeats =
            selectedSeats.filter(
                function (seat) {

                    return !booked.includes(
                        seat
                    );

                }
            );


        const container =
            document.getElementById(
                "seatContainer"
            );


        container.innerHTML = "";


        for (
            const row of "ABCDEFGH"
        ) {

            const rowDiv =
                document.createElement(
                    "div"
                );


            rowDiv.className =
                "seat-row";


            for (
                let number = 1;
                number <= 12;
                number++
            ) {

                const seat =
                    row + number;


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.textContent =
                    number;


                button.className =
                    "seat";


                if (
                    booked.includes(
                        seat
                    )
                ) {

                    button.classList.add(
                        "booked"
                    );

                    button.disabled =
                        true;
                }


                if (
                    selectedSeats.includes(
                        seat
                    )
                ) {

                    button.classList.add(
                        "selected"
                    );
                }


                button.onclick =
                    function () {

                        toggleSeat(seat);

                    };


                rowDiv.appendChild(
                    button
                );
            }


            container.appendChild(
                rowDiv
            );
        }


        document.getElementById(
            "seatMsg"
        ).textContent =
            selectedSeats.length +
            " / " +
            tickets +
            " seat(s) selected";


    } catch (error) {

        console.log(error);
    }
}


/* =====================================
   SELECT / UNSELECT SEAT
===================================== */

function toggleSeat(seat) {

    const tickets =
        Number(
            document.getElementById(
                "tickets"
            ).value
        );


    if (
        selectedSeats.includes(
            seat
        )
    ) {

        selectedSeats =
            selectedSeats.filter(
                function (item) {

                    return item !== seat;

                }
            );


    } else {

        if (
            selectedSeats.length >=
            tickets
        ) {

            document.getElementById(
                "seatMsg"
            ).textContent =
                "You can select only " +
                tickets +
                " seat(s).";

            return;
        }


        selectedSeats.push(
            seat
        );
    }


    renderSeats();
}


/* =====================================
   SAVE BOOKING
===================================== */

async function saveBooking() {

    const tickets =
        Number(
            document.getElementById(
                "tickets"
            ).value
        );


    const message =
        document.getElementById(
            "seatMsg"
        );


    if (
        selectedSeats.length !==
        tickets
    ) {

        message.textContent =
            "Please select exactly " +
            tickets +
            " seat(s).";

        return;
    }


    const formData =
        new FormData();


    formData.append(
        "movie_id",
        document.getElementById(
            "movieSelect"
        ).value
    );


    formData.append(
        "booking_date",
        document.getElementById(
            "bookingDate"
        ).value
    );


    formData.append(
        "show_time",
        document.getElementById(
            "showTime"
        ).value
    );


    formData.append(
        "tickets",
        tickets
    );


    formData.append(
        "seats",
        selectedSeats.join(",")
    );


    try {

        const response =
            await fetch(
                API + "save_booking.php",
                {
                    method: "POST",
                    body: formData
                }
            );


        const data =
            await response.json();


        if (data.success) {

            window.location =
                "confirmation.html?id=" +
                data.booking_id;


        } else {

            message.textContent =
                data.message;

            selectedSeats = [];

            renderSeats();
        }


    } catch (error) {

        console.log(error);

        message.textContent =
            "Unable to connect to PHP.";
    }
}


/* =====================================
   CONFIRMATION
===================================== */

async function loadConfirmation() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    const box =
        document.getElementById(
            "bookingDetails"
        );


    if (!id) {

        box.textContent =
            "Booking ID not found.";

        return;
    }


    try {

        const response =
            await fetch(
                API +
                "get_booking.php?id=" +
                id
            );


        const data =
            await response.json();


        if (!data.success) {

            box.textContent =
                data.message;

            return;
        }


        const booking =
            data.booking;


        box.innerHTML = `

            <div class="details">

                <p>
                    <b>Booking ID:</b>
                    #${booking.id}
                </p>

                <p>
                    <b>Movie:</b>
                    ${booking.movie_name}
                </p>

                <p>
                    <b>Date:</b>
                    ${booking.booking_date}
                </p>

                <p>
                    <b>Show Time:</b>
                    ${booking.show_time}
                </p>

                <p>
                    <b>Seats:</b>
                    ${booking.seats}
                </p>

                <p>
                    <b>Tickets:</b>
                    ${booking.tickets}
                </p>

                <p>
                    <b>Total:</b>
                    ₹${booking.total}
                </p>

            </div>

        `;


    } catch (error) {

        console.log(error);

        box.textContent =
            "Unable to retrieve booking.";
    }
}