
document.addEventListener('DOMContentLoaded', () => {
    fetchAppetizers();
    fetchMainCourse();
    fetchDessert();
});


//Hämta förräter
async function fetchAppetizers() {
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
            div.innerHTML = `
                <p class="appetizer-name"><strong>${appetizer.name}</strong></p>
                <p class="appetizer-description">${appetizer.description}</p>
                 <p class="appetizer-price"><strong>${appetizer.price}kr </strong></p>
             `;
            appetizersList.appendChild(div);
        });


    } catch(error) {
        console.log("error: " + error.message);
    }
    
}

//hämta varmsätter
async function fetchMainCourse() {

    try {
        const response = await fetch("http://localhost:5000/api/menu");

        if(!response.ok) {
            throw new Error("Kunde inte hämta Varmrätter")
        }

        const data = await response.json();

        const mainCourses = data.filter(item => item.category === "Varmrätt");

        const mainCourseDiv = document.getElementById("mainCourseList");

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
    } catch(error) {
        console.log("error: " + error.message);
    }
    
}

//hämtar efterrätter

async function fetchDessert() {

    try {
        const response = await fetch("http://localhost:5000/api/menu");

        if(!response.ok) {
            throw new Error("Could not get desserts");
        }

        const data = await response.json();

        const desserts = data.filter(item => item.category === "Efterrätt");

        const dessertDiv = document.getElementById("dessertList");

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
    } catch(error) {
        console.log("error: " + error.message);
    }
    
}