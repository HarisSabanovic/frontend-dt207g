
document.addEventListener('DOMContentLoaded', () => {
   
    fetchAppetizers();
    fetchMainCourse();
    fetchDessert();
    fetchDrinks();
});


const loaders = document.querySelectorAll(".loader");

    function displayLoading(){
        console.log("loader visas");
        loaders.forEach(loader => {
            loader.style.display = "block";
        })
    }


function hideLoading() {
    loaders.forEach(loader => {
        loader.style.display = "none";
    })
}

//Hämta förräter
async function fetchAppetizers() {
    try {
        displayLoading();

        const response = await fetch("https://projekt-ethique.onrender.com/api/menu");

        if(!response.ok) {
            throw new Error("Could not get appetizers");
        }

        const data = await response.json();

        // hittar förrätterna i datan
        const appetizers = data.filter(item => item.category === 'Förrätt');

        //hämtar förätt div element
        const appetizersList = document.getElementById('appetizerList');


        //skapar en div för varje förrätt
        appetizers.forEach(appetizer => {
            const div = document.createElement('div');
            div.className = 'appetizer-item';
            div.innerHTML = `
                <p class="appetizer-name"><strong>${appetizer.name}</strong></p>
                <p class="appetizer-description">${appetizer.description}</p>
                 <p class="appetizer-price"><strong>${appetizer.price}kr </strong></p>
             `;
            appetizersList.appendChild(div);
        });


        //felhantering
    } catch(error) {
        console.log("error: " + error.message);
    } finally {
        hideLoading();
    }
    
}

//hämta varmrätter
async function fetchMainCourse() {

    try {
        displayLoading();
        //GET förfrågan till api för att hämta varmrätter
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu");

        if(!response.ok) {
            throw new Error("Kunde inte hämta Varmrätter")
        }

        const data = await response.json();

        //filtrerar ut alla varmrätter
        const mainCourses = data.filter(item => item.category === "Varmrätt");

        const mainCourseDiv = document.getElementById("mainCourseList");

        //skapar div för varje varmrätt som skrivs ut
        mainCourses.forEach(mainCourse => {
            const div = document.createElement('div');
            div.className = 'mainCourse-item';
            div.innerHTML = `
                <p class="mainCourse-name"><strong>${mainCourse.name}</strong></p>
                <p class="mainCourse-description">${mainCourse.description}</p>
                 <p class="mainCourse-price"><strong>${mainCourse.price}kr </strong></p>
             `;
             mainCourseDiv.appendChild(div);
        });

        hideLoading();
        //felhantering
    } catch(error) {
        console.log("error: " + error.message);
    } finally {
        hideLoading();
    }
    
}

//hämtar efterrätter
async function fetchDessert() {

    try {
        displayLoading();
        //GET förfrågan till api för att hämta efterrätter
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu");

        if(!response.ok) {
            throw new Error("Could not get desserts");
        }

        const data = await response.json();

        //filtrerar ut efterräter
        const desserts = data.filter(item => item.category === "Efterrätt");

        const dessertDiv = document.getElementById("dessertList");

        //skapar en div för varje efterrätt
        desserts.forEach(dessert => {
            const div = document.createElement("div");
            div.className = "dessert-item";
            div.innerHTML = `
                <p class="dessert-name"><strong>${dessert.name}</strong></p>
                <p class="dessert-description">${dessert.description}</p>
                <p class="dessert-price"><strong>${dessert.price}kr </strong></p>`
                ;
                dessertDiv.appendChild(div);
        });

        hideLoading();
        //felhantering
    } catch(error) {
        console.log("error: " + error.message);
    } finally {
        hideLoading();
    }
    
}

async function fetchDrinks() {

    try {
        displayLoading();
        //GET förfrågan till api för att hämta drickor
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu")

        if(!response.ok) {
            throw new Error("Kunde inte hämta dricksortiment")
        }

        const data = await response.json();

        //filtrerar ut dricka 
        drinks = data.filter(item => item.category === "Dricka");

        const drinkDiv = document.getElementById("drinkList");

        //skapar div för varje dricka 
        drinks.forEach(drink => {
            const div = document.createElement("div");
            div.className = "drink-item";
            div.innerHTML = `
                <p class="drink-name"><strong>${drink.name}</strong></p>
                <p class="drink-description">${drink.description}</p>
                <p class="drink-price"><strong>${drink.price}kr </strong></p>`
                ;
                drinkDiv.appendChild(div);
        })

        hideLoading();
        //felhantering
    } catch(error) {
        console.log("Kunde inte hämta dricksortimentet: " + error);
    }  finally {
        hideLoading();
    }
}

//eventlysnare för när formuläret skickas in
document.getElementById("booking-form").addEventListener("submit", async function(event) {
    //förhindrar formuläret att uppdatera sidan när användaren skickar formuläret
    event.preventDefault();

    //hämtar värden från formuläret
    const bookingData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone-number").value,
        bookingDateTime: document.getElementById("booking-date-time").value,
        amountPeople: document.getElementById("amount-people").value
    };

    try {
        
        //POST förfrågan till APi för att lägga till bokning

        const response = await fetch("https://projekt-ethique.onrender.com/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" //JSON DATA som skickas
            },
            body: JSON.stringify(bookingData) //de värden som skickas
        });

        if (response.ok) {

            //återställer formuläret efter lyckad bokning
            document.getElementById("booking-form").reset();
        } else {
            throw new Error("Bokningen misslyckades");
        }

        //felhantering
    } catch (error) {
        console.error("Fel vid bokning:" + error);
        alert("Ett fel uppstod vid bokningen. Försök igen.");
    }
});
