
document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

document.addEventListener("click", function(event) {
    if(event.target.matches (".delete-item-class")) {
        deleteBooking(event.target.dataset.id);
    }
})

async function fetchBookings() {
    const bookingList = document.getElementById("bookingList"); 
    try {
        const response = await fetch("http://localhost:5000/api/booking");
        const bookings = await response.json();

        bookingList.innerHTML = "";

        bookings.forEach(booking => {
            const bookingDiv = document.createElement("div");
            bookingDiv.className = "booking-item";
            
            bookingDiv.innerHTML = `
                <h3>Bokning för: ${booking.firstName} ${booking.lastName}</h3>
                <p>E-post: ${booking.email}</p>
                <p>Telefonnummer: ${booking.phoneNumber}</p>
                <p>Datum och tid: ${new Date(booking.bookingDateTime).toLocaleString()}</p>
                <p>Antal personer: ${booking.amountPeople}</p>
                <button class="delete-item-class" data-id="${booking._id}">Ta bort</button>
            `;

            bookingList.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error("Could not get the bookings", error);
    }
}


async function deleteBooking(id) {

    if(confirm("Är du säker att du vill ta bort bokning?")) {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/${id}`, {
                method: "DELETE"
            });

            if(!response.ok) {
                throw new Error("Kunde inte hämta bokning");
            }

            fetchBookings();

        } catch(error) {
            console.error("Fel vid radering av bokning: " + error);
        }
    }

}