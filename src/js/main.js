//Hämta förräter

async function fetchAppetizer() {
    try {
        const response = await fetch("http://localhost:5000/api/menu");

        if(!response.ok) {
            throw new Error("Could not get appetizers");
        }

        const data = await response.json();

        // hittar förrätterna i datan
        const appetizers = data.filter(item => item.category === 'Förrätt');

        //hämtar förätt div element
        const appetizersList = document.getElementById('appetizerList');

        appetizers.forEach(appetizer => {
            const div = document.createElement('div');
            div.className = 'appetizer-item';
            div.innerHTML = `<strong>${appetizer.name}</strong> - ${appetizer.description} (${appetizer.price} kr)`;
            appetizersList.appendChild(div);
        });

    } catch(error) {
        console.log("error: " + error.message);
    }
    
}