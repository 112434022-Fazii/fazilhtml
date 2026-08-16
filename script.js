function bookTicket() {

    let movie = document.getElementById("movie").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let tickets = document.getElementById("tickets").value;

    if (movie == "" || date == "" || time == "") {

        alert("Please fill all details");

    } else {

        alert("Booking Successful!");

        window.location.href = "confirmation.html";
    }
}