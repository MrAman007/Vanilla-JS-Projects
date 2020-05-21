// All DOM Strings
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Updating UI
populateUI();

// Getting selected movie current price
let ticketPrice = +movieSelect.value;

// ************** All Functions****************

// Movie Data storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Selected seats and cost updater
function updateSelectedCount() {
    // getting all selected seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    // *****creating local storage*****

    // storing selected seat index
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // storing selected seats index into local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    // ***** Updating selected seats and calculated price on UI *****
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

// UI updater after reload
function populateUI() {
    
    // Getting selected seats array from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    // checking if the array exists and have some seats then updaing UI
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seats, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seats.classList.add('selected');
            }
        })
    }
    
    // Getting selected movie index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // if selected movie index exist then update its variable
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;

    }
}


// *******************All Event Listeners*****************

// Movie Selector
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat Selector
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount();