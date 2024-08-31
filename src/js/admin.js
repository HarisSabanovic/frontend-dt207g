document.addEventListener("DOMContentLoaded", function () {
    fetchMenu();
});

async function fetchMenu() {

    const menuList = document.getElementById("menuList");

    try {
        const response = await fetch("http://localhost:5000/api/menu");
        const menuItems = await response.json();

        menuList.innerHTML = "";

        menuItems.forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.className = "menu-item";
            
            menuItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Pris: ${item.price} SEK</p>
                <button onclick="editItem('${item._id}')">Redigera</button>
                <button onclick="deleteItem('${item._id}')">Ta bort</button>
            `;

            menuList.appendChild(menuItemDiv);
        });
    } catch (error) {
        console.error("Fel vid hämtning av menyn:", error);
    }
}