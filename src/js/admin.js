//funktioner som körs vidd laddninga av hemsida
document.addEventListener("DOMContentLoaded", function () {
    fetchMenu();
});


//hämtar menyn från api
async function fetchMenu() {

    const menuList = document.getElementById("menuList");


    try {
        //GET fröfrågan till api, för att hämta meny
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu");
        const menuItems = await response.json();

        //rensar listan innan menyn skrivs ut
        menuList.innerHTML = "";

        //skapar en div för varje rätt i menyn
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.className = "menu-item";
            
            menuItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Pris: ${item.price} SEK</p>
                <button class="edit-button-class" data-id="${item._id}">Redigera</button>
                <button class="delete-button-class" data-id="${item._id}">Ta bort</button>
            `;

            menuList.appendChild(menuItemDiv);
        });

        //hanterar felmeddelanden
    } catch (error) {
        console.error("Fel vid hämtning av menyn:", error);
    }
}

//funktion som tar bort rätt från menyn baser på dess id
async function deleteDish(id) {
    //kollar ifall användaren egentligen vill radera 
    if (confirm("Är du säker på att du vill ta bort denna rätt?")) {

        //DELETE förfråga till api, för att ta bort rätten
        try {
            const response = await fetch(`https://projekt-ethique.onrender.com/api/menu/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Något gick fel vid radering av menyrätten");
            }

            //visar meddelande för användaren
            alert("menyrätten har raderats");

            // hämtar menyn på nytt för att uppdatera listan
            fetchMenu();
        } catch (error) {
            console.error("Fel vid radering av menyrätt:", error);
        }
    }
}

//funktion som redigerar rätt baserat på id
function editDish(id) {
    const newName = prompt("Ange nytt namn för rätten:");
    const newDescription = prompt("Ange ny beskrivning för rätten:");
    const newPrice = prompt("Ange nytt pris för rätten:");
    const newCategory = prompt("Ange ny kategori för rätten:");

    if (newName && newDescription && newPrice) {
        //skapar ett objekt med dem nya värdena
        const updatedItem = {
            name: newName,
            description: newDescription,
            price: newPrice,
            category: newCategory
        };

        //skickar dem nya värdena till updateItem funktionen
        updateItem(id, updatedItem);
    }
}

// funktion som uppdaterar en rätt
async function updateItem(id, updatedItem) {
    try {
        //PUT förfråga till api för att uppdatera rätt
        const response = await fetch(`https://projekt-ethique.onrender.com/api/menu/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" //specificerar att det är JSON-data som skickas
            },
            body: JSON.stringify(updatedItem) // skickar den uppdaterade datan
        });
    
        //meddelande som visas till användaren
        alert("Rätten uppdaterades!");

        fetchMenu(); // hämtar menyn på nytt för att uppdatera listan
    } catch (error) {
        console.error("Fel vid uppdatering av menyrätt:", error);
    }
}

//eventlyssnare som kollar ifall ett klick sker
document.addEventListener('click', function (event) {
    //kollar ifall det som har klickats matchar klassen "edit-button-class"
    if (event.target.matches('.edit-button-class')) {
        //hämtar id från data attributet och skickar det till funktionen editdish
        editDish(event.target.dataset.id); //redigerar rätter baserat på id
    }

    if (event.target.matches('.delete-button-class')) {
        deleteDish(event.target.dataset.id);
    }
});


document.getElementById("addMenuForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    //deklarerar input värden från användaren
    const name = document.getElementById("menu-name").value;
    const description = document.getElementById("menu-description").value;
    const price = document.getElementById("menu-price").value;
    const category = document.getElementById("menu-category").value;

    try {
        //skickar POST förfrågan till API frö att lägga till en rätt i menyn
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" //specidicerar att det är JSON-data som skickas
            },
            //skickar JSON-datan
            body: JSON.stringify({ name, description, price, category })
        });


        if (!response.ok) {
            throw new Error("Failed to add menu item");
        }


    
        //notis till användaren att det har lagts till i menyn
        alert("Menypost tillagd!");

        //rensar formuläret när den skickas
        document.getElementById("addMenuForm").reset();

        //error hantering
    } catch (error) {
        console.error("Fel vid tillägg av menypost:", error);
        alert("Fel vid tillägg av menypost");
    }
});


//eventlyssnare vid laddning av hemsida
document.addEventListener("DOMContentLoaded", async function () {
    //hämtar token från localstorage
    const token = localStorage.getItem("token");

    //om den inte finns, omderigers användaren till inloggningssidan
    if(!token){
        window.location.href = "/login.html";
        return;
    }
})

//eventlyssnare vid laddning av hemsida
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