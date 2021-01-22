// Update tota and count
function updateSelectedCount(seats) {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    const selectedSeatsIndex = [...selectedSeats].map( (seat) => {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem("selectedSeatsIndex", JSON.stringify(selectedSeatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = `$${selectedSeatsCount * ticketPrice}`;
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI(seats, movieSelect) {
    const selectedSeatsIndex = JSON.parse(localStorage.getItem("selectedSeatsIndex"));
    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeatsIndex.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const allSeats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movies");
let ticketPrice = parseInt(movieSelect.value);

populateUI(seats, movieSelect);
updateSelectedCount(seats);

container.addEventListener("click", event => {
    if (
        event.target.classList.contains("seat") && 
        !event.target.classList.contains("occupied")
        ) {
        event.target.classList.toggle("selected");
        updateSelectedCount(seats);
    };
});

movieSelect.addEventListener("change", event => {
    ticketPrice = event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount(seats);
});
