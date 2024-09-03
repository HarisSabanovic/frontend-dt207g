//initierar funktion vid laddning av hemsida
document.addEventListener("DOMContentLoaded", function () {
    fetchBookings();
});

//lyssnar efter klick på sidan
document.addEventListener("click", function(event) {

    //kollar ifall det som har klickats matchar klassen "delete-item-class"
    if(event.target.matches (".delete-item-class")) {

        //hämtar id från data attributen och skicar det till funktionen deleteBooking
        deleteBooking(event.target.dataset.id);
    }

    if(event.target.matches (".edit-item-class")) {
        editBooking(event.target.dataset.id);
    }
})

async function fetchBookings() {
    const bookingList = document.getElementById("bookingList"); 
   
    //GET förfråga till api för att hämta alla bokningar
    try {
        const response = await fetch("https://projekt-ethique.onrender.com/api/booking");
        const bookings = await response.json();

        //rensar listan innan bokningarn skrivs ut
        bookingList.innerHTML = "";

        //skapar en div för varje menyrätt
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

            //<p>Datum och tid: ${new Date(booking.bookingDateTime).toLocaleString()}</p> 
            // konverterar datum- och tidssträngformatet till ett JavaScript Date-objekt
            //sedan formateras till det till en sträng
        

            bookingList.appendChild(bookingDiv);
        });

        //hanterar felmeddelanden
    } catch (error) {
        console.error("Could not get the bookings", error);
    }
}


//tar bort bokning baserat på id
async function deleteBooking(id) {

    if(confirm("Är du säker att du vill ta bort bokning?")) {

        //skickar DELETE förfrågan till api för att radera
        try {
            const response = await fetch(`https://projekt-ethique.onrender.com/api/booking/${id}`, {
                method: "DELETE"
            });

            if(!response.ok) {
                throw new Error("Kunde inte hämta bokning");
            }

            //hämtar bokningar
            fetchBookings();

            //hanterar felmeddelanden
        } catch(error) {
            console.error("Fel vid radering av bokning: " + error);
        }
    }

}

//funktion som redigerar rätt baserat på id
function editBooking(id) {
    const newFirstName = prompt("Ange nytt förnamn:");
    const newLastName = prompt("Ange nytt efternamn:");
    const newEmail = prompt("Ange ny e-postadress:");
    const newPhoneNumber = prompt("Ange nytt telefonnummer:");
    const newBookingDateTime = prompt("Ange nytt datum och tid (exempel: 2024-09-27T15:33):");
    const newAmountPeople = prompt("Ange antal personer:");

    if (newFirstName && newLastName && newEmail && newPhoneNumber && newBookingDateTime && newAmountPeople) {
        //skapar ett objekt med de nya värden
        const updatedBooking = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            phoneNumber: newPhoneNumber,
            bookingDateTime: new Date(newBookingDateTime).toISOString(),
            amountPeople: newAmountPeople
        };

        updateBooking(id, updatedBooking); //skickar de uppdaterade värden
    }

}

// Funktion för att uppdatera en rätt
async function updateBooking(id, updatedBooking) {
    try {

        //SKickar PUT förfråga till API för att uppdatera
        const response = await fetch(`https://projekt-ethique.onrender.com/api/booking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" //det är JSON data som skickas
            },
            body: JSON.stringify(updatedBooking) //skickar de uppdaterade datan
        });

        if(!response.ok) {
            throw new Error("Kunde inte ändra bokning");
        }
        
        //visas för användare
        alert("Bokning uppdaterades!");
        fetchBookings(); 

        //hanterar felmeddelanden
    } catch (error) {
        console.error("Fel vid uppdatering av bokning:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if(!token){
        window.location.href = "/login.html";
        return;
    }
})

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
       // Ta bort token från localStorage
       localStorage.removeItem("token");
    
       // Omdirigera till inloggningssidan
       window.location.href = "/login.html";
    });
 }
});