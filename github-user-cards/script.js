const APIURL = "https://api.github.com/users/";

const content = document.querySelector(".content");

async function getUser(username) {
    const res = await fetch(APIURL + username);
    return res.json();
}

// getUser("MrAman007");

document.getElementById("user").addEventListener("keydown", (e) => {
    if (e.key == "Enter" && e.target.value != "") {
        const user = getUser(e.target.value);
        console.log(e.target.value);
        user.then((data) => {
            if (data.message) {
                const invalid = document.createElement("h3");
                invalid.innerText = "INVALID";
                content.appendChild(invalid);
            } else {
                console.log(data.name);
            }
        });
    }
});
