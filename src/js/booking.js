
document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

async function fetchBookings() {
    const bookingList = document.getElementById("bookingList"); // Antag att du har ett element med detta ID för att visa bokningarna

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
                <button onclick="editBooking('${booking._id}')">Redigera</button>
                <button onclick="deleteBooking('${booking._id}')">Ta bort</button>
            `;

            bookingList.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error("Fel vid hämtning av bokningarna:", error);
    }
}