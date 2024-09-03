document.addEventListener("DOMContentLoaded", function () {
    fetchMenu();
});


async function fetchMenu() {

    const menuList = document.getElementById("menuList");

    try {
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu");
        const menuItems = await response.json();

        menuList.innerHTML = "";

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
    } catch (error) {
        console.error("Fel vid hämtning av menyn:", error);
    }
}

async function deleteDish(id) {
    if (confirm("Är du säker på att du vill ta bort denna rätt?")) {
        try {
            const response = await fetch(`https://projekt-ethique.onrender.com/api/menu/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Något gick fel vid radering av menyrätten");
            }

            const result = await response.json();
            alert(result.message);
            fetchMenu(); // Hämta menyn på nytt för att uppdatera listan
        } catch (error) {
            console.error("Fel vid radering av menyrätt:", error);
        }
    }
}

function editDish(id) {
    const newName = prompt("Ange nytt namn för rätten:");
    const newDescription = prompt("Ange ny beskrivning för rätten:");
    const newPrice = prompt("Ange nytt pris för rätten:");
    const newCategory = prompt("Ange ny kategori för rätten:");

    if (newName && newDescription && newPrice) {
        const updatedItem = {
            name: newName,
            description: newDescription,
            price: newPrice,
            category: newCategory
        };

        updateItem(id, updatedItem);
    }
}

// Funktion för att uppdatera en rätt
async function updateItem(id, updatedItem) {
    try {
        const response = await fetch(`https://projekt-ethique.onrender.com/api/menu/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedItem)
        });
        const result = await response.json();
        alert("Rätten uppdaterades!");
        fetchMenu(); // Hämta menyn på nytt för att uppdatera listan
    } catch (error) {
        console.error("Fel vid uppdatering av menyrätt:", error);
    }
}

document.addEventListener('click', function (event) {
    if (event.target.matches('.edit-button-class')) {
        editDish(event.target.dataset.id);
    }

    if (event.target.matches('.delete-button-class')) {
        deleteDish(event.target.dataset.id);
    }
});


document.getElementById("addMenuForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("menu-name").value;
    const description = document.getElementById("menu-description").value;
    const price = document.getElementById("menu-price").value;
    const category = document.getElementById("menu-category").value;

    try {
        const response = await fetch("https://projekt-ethique.onrender.com/api/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description, price, category })
        });

        if (!response.ok) {
            throw new Error("Failed to add menu item");
        }

        const data = await response.json();
        console.log("Menypost tillagd:", data);
        alert("Menypost tillagd!");
        document.getElementById("addMenuForm").reset();
    } catch (error) {
        console.error("Fel vid tillägg av menypost:", error);
        alert("Fel vid tillägg av menypost");
    }
});


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