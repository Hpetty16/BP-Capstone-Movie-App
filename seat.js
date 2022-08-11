const rows = document.querySelectorAll(".rows");
const cost = document.querySelector(".cost");
// Select seats total
let seatTotal = document.querySelector(".seatTotal");
let postS = document.querySelector(".postS");
// Select button
const btnBuyTicket = document.querySelector(".btnBuyTickets");
// Select film selector
let film = document.getElementById("film");
// Select seat
const seatNotOccupied = document.querySelectorAll(".seat:not(.occupied)")
// Global Variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;
let seats = JSON.parse(sessionStorage.getItem("seats"));
let movie = sessionStorage.getItem("movie");
let price = sessionStorage.getItem("price");
let occupied = JSON.parse(sessionStorage.getItem("occupied"));
// console.log(occupied)



// **Select rows number and set the innerHtml value**
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
  element.innerHTML = `Row ${element.id}`;
});



//**Update Values Functions**
const updateValues = (seatNumber, seatRow, removeSeat) => {
  // Select seats with class 'selected'
  let seatSelected = document.querySelectorAll(".row .seat.selected");
  // Create array for sessionStorage
  let sessionStorageSeats = [...seatSelected].map(seat => {
    return [...seatNotOccupied].indexOf(seat);
  });
  // Save seats selected inside browser sessionStorage
  sessionStorage.setItem("Seats", JSON.stringify(sessionStorageSeats));

  // Populate info area
  if (seatNumber && seatRow !== undefined) {
  if (!removeSeat) {
    postS.innerHTML += ` ${seatNumber}/${seatRow} -`;
    // Save value inside browser local storage
    sessionStorage.setItem("S&&R", postS.innerHTML);
  } else {
    postS.innerHTML = postS.innerHTML.replace(
      ` ${seatNumber}/${seatRow} -`,
      ""
    );
    
  }
}
// Set ticket price
let ticket = film.value;
// Seats total number
seatTotal.innerHTML = seatSelected.length;
// Price
cost.innerHTML = seatSelected.length * ticket;
};


//**Load data from browser local storage**
let seatNotSelected = document.querySelectorAll(".seat:not(.selected)");
const loadData = () => {


// Set selected seats
if (seats !== null && seats.length > 0) {
  seatNotOccupied.forEach((eSeats, index) => {
    if (seats.indexOf(index) > -1) {
      eSeats.classList.add("selected");
    }
  });
}
// Set seats occupied
if (occupied !== null && occupied.length > 0) {
  seatNotSelected.forEach((eSeats, index) => {
    if (occupied.indexOf(index) > -1) {
      eSeats.classList.add("occupied");
    }
  });
}

// console.log(occupied)
// Set movie title
let movieSavedIdx = sessionStorage.getItem("movie");
if (movieSavedIdx !== null) {
  film.selectedIndex = movieSavedIdx;
}
// Update values
updateValues();

// Populate area info
let seatsInfo = sessionStorage.getItem("S&&R");
postS.innerHTML = seatsInfo;
};

loadData();




//**Select seat and add event listener **
const seatReload = document.querySelectorAll(".seat:not(.occupied");
seatReload.forEach(element => {
  // Set seat number
  element.innerHTML = element.id;
// Add event listener
element.addEventListener("click", () => {
  seatRow = element.parentElement.id;
  seatNumber = element.id;
// Add and remove color class
if (element.classList.value == "seat") {
  element.classList.add("selected");
  // Set false remove variable
  removeSeat = false; 
  updateValues(seatNumber, seatRow, removeSeat);
} else {
  element.classList.remove("selected");
  // Set true remove variable
  removeSeat = true;
  updateValues(seatNumber, seatRow, removeSeat);
} 
});
});



//**Movie title Event Listener**
film.addEventListener("change", e => {
  // Ticket
  let ticket = parseInt(e.target.value);
  let movieTitle = e.target.selectedIndex;
  // Save inside sessionStorage movie title
  sessionStorage.setItem("movie", movieTitle);
  // Save price
  sessionStorage.setItem("price", ticket);
  // Update value
  updateValues();
}) 



//**btnBuyTicket Event Listener**
btnBuyTicket.addEventListener("click", () => {
  let seat = document.querySelectorAll(".seat.selected");
  seat.forEach(element => {
    element.classList.remove("selected");
    element.classList.add("occupied");
    // Clear all fields
    element.innerHTML = "";
    seatTotal.innerHTML = "";
    cost.innerHTML = "";
    postS.innerHTML = "";
    // Clear sessionStorage
    sessionStorage.clear();

    // Save inside local Storage
    let seatBusySelec = document.querySelectorAll(".row .seat.occupied");

    const sessionStorageSeatsOccupied = [...seatBusySelec].map(seat => {
      return [...seatNotSelected].indexOf(seat);
    });

    // Save
    sessionStorage.setItem("occupied", JSON.stringify(sessionStorageSeatsOccupied));
  });
});


if (seats !== null && seats.length > 0) {
  seatNotOccupied.forEach((eSeats, index) => {
    if (seats.indexOf(index) > -1) {
      eSeats.classList.add("selected");
    }
  });
}


