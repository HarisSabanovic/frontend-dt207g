document.addEventListener('DOMContentLoaded', () => {
    fetchMenuItems(); // Här anropas funktionen för att hämta menyobjekten

    async function fetchMenuItems() {
        try {
            const response = await fetch('http://localhost:5000/api/menu');
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const menuItems = await response.json();
            console.log("hallååååå"); // Bekräftar att funktionen körs
            displayMenuItems(menuItems);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    }
});

function displayMenuItems(menuItems) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = ''; // Rensa tidigare innehåll

    menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p><strong>Namn:</strong> ${item.name}</p>
            <p><strong>Beskrivning:</strong> ${item.description}</p>
            <p><strong>Pris:</strong> ${item.price} kr</p>
            <p><strong>Kategori:</strong> ${item.category}</p>
            <button class="edit-button" data-id="${item._id}">Redigera</button>
        `;
        menuContainer.appendChild(itemElement);
    });

    // Lägg till klickhändelse på alla "Redigera"-knappar
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', openEditForm);
    });
}

function openEditForm(event) {
    const id = event.target.dataset.id;
    console.log('Redigera rätt med ID:', id);
    // Här kan du implementera logiken för att öppna redigeringsformuläret
}
