let travelData = [];

// Task 6: Fetch data from JSON
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Fetched travel data:", travelData); // ✅ Check output
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

// Elements
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Task 7 & 8: Keyword search + recommendations
searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    resultsDiv.innerHTML = "";

    if (keyword === "") {
        resultsDiv.innerHTML = "<p>Please enter a keyword.</p>";
        return;
    }

    let filteredResults = [];

    if (keyword === "beach" || keyword === "beaches") {
        filteredResults = travelData.beaches;
    } else if (keyword === "temple" || keyword === "temples") {
        filteredResults = travelData.temples;
    } else if (keyword === "country" || keyword === "countries") {
        filteredResults = travelData.countries;
    } else {
        resultsDiv.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    displayResults(filteredResults);
});

// Display results
function displayResults(items) {
    items.forEach(item => {
        const card = document.createElement("div");
        card.style.marginBottom = "30px";

        // Optional Task 10: Country time
        let timeInfo = "";
        if (item.timeZone) {
            const options = {
                timeZone: item.timeZone,
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            };
            const localTime = new Date().toLocaleTimeString("en-US", options);
            timeInfo = `<p><strong>Local Time:</strong> ${localTime}</p>`;
        }

        card.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.imageUrl}" width="300">
            <p>${item.description}</p>
            ${timeInfo}
        `;

        resultsDiv.appendChild(card);
    });
}

// Task 9: Clear button
resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsDiv.innerHTML = "";
});
