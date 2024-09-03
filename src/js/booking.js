
document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

document.addEventListener("click", function(event) {
    if(event.target.matches (".delete-item-class")) {
        deleteBooking(event.target.dataset.id);
    }

    if(event.target.matches (".edit-item-class")) {
        editBooking(event.target.dataset.id);
    }
})

async function fetchBookings() {
    const bookingList = document.getElementById("bookingList"); 
    try {
        const response = await fetch("https://projekt-ethique.onrender.com/api/booking");
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
                <button class="edit-item-class" data-id="${booking._id}">Redigera</button>
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
            const response = await fetch(`https://projekt-ethique.onrender.com/api/booking/${id}`, {
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

function editBooking(id) {
    const newFirstName = prompt("Ange nytt förnamn:");
    const newLastName = prompt("Ange nytt efternamn:");
    const newEmail = prompt("Ange ny e-postadress:");
    const newPhoneNumber = prompt("Ange nytt telefonnummer:");
    const newBookingDateTime = prompt("Ange nytt datum och tid (exempel: 2024-09-27T15:33):");
    const newAmountPeople = prompt("Ange antal personer:");

    if (newFirstName && newLastName && newEmail && newPhoneNumber && newBookingDateTime && newAmountPeople) {
        const updatedBooking = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            phoneNumber: newPhoneNumber,
            bookingDateTime: new Date(newBookingDateTime).toISOString(),
            amountPeople: newAmountPeople
        };

        updateBooking(id, updatedBooking);
    }

}

// Funktion för att uppdatera en rätt
async function updateBooking(id, updatedBooking) {
    try {
        const response = await fetch(`https://projekt-ethique.onrender.com/api/booking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBooking)
        });

        if(!response.ok) {
            throw new Error("Kunde inte ändra bokning");
        }
        
        alert("Bokning uppdaterades!");
    } catch (error) {
        console.error("Fel vid uppdatering av bokning:", error);
        fetchBookings(); 
    }
}