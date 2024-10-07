const loader = document.querySelector(".loader");

    function displayLoading(){
        loader.style.display = "block";
    }


//eventlyssnare som körs när användaren skickar formulär data
document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    displayLoading();

    // Den input som användaren skriver in
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //POST förfrågan till API för att kunna logga in
    try {
        const response = await fetch("https://projekt-ethique.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" //JSON data som skickas
            },
            body: JSON.stringify({ username, password }) // de användarnamn och lösenord som skickas
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        const token = data.token;
        //sparar token i localstorage
        localStorage.setItem("token", token);


        //skickar token till funktion för att verifiera
        const isValid = await verifyToken(token);

        // Om isValid returnerar true, då är token giltig, omdirigera användaren
        if (isValid) {
            window.location.href = "/admins.html";
        } else {
            throw new Error("Ogiltig token");
        }

        //fel hantering
    } catch (error) {
        console.log("Server fel inträffade: " + error.message);
    }
});

//funktion som verifierar token
async function verifyToken(token) {
 

    try {

        //GET begäran till en skyddad resurs med token som Authorization header
        const response = await fetch('https://projekt-ethique.onrender.com/api/protected', {
            headers: {
                'Authorization': 'Bearer ' + token //lägger till token som en bearer-token
            }
        });
    
        if (!response.ok) {
            throw new Error("Access denied");
        }
        return true; //ifall token är giltig 

    } catch (err) {
        console.error("Ett fel inträffade vid verifiering av token:", err.message);
        return false; // token är ogiltig eller servern avvisade begäran
    }
}
