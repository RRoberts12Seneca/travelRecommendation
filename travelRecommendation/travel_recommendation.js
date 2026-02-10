let travelData = {};

// Elements
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Fetch JSON data
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        searchBtn.disabled = false;
        console.log("Travel data loaded:", travelData);
    })
    .catch(error => {
        console.error("Error loading travel data:", error);
    });

// Search button
searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    resultsDiv.innerHTML = "";

    if (!keyword) {
        resultsDiv.innerHTML = "<p>Please enter a keyword.</p>";
        return;
    }

    let results = [];

    if (keyword === "beach" || keyword === "beaches") {
        results = travelData.beaches || [];
    } 
    else if (keyword === "temple" || keyword === "temples") {
        results = travelData.temples || [];
    } 
    else if (keyword === "country" || keyword === "countries") {
        (travelData.countries || []).forEach(country => {
            results.push(...country.cities);
        });
    } 
    else {
        resultsDiv.innerHTML = "<p>No recommendations found.</p>";
        return;
    }

    displayResults(results);
});

// Display results
function displayResults(items) {
    if (items.length === 0) {
        resultsDiv.innerHTML = "<p>No results available.</p>";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.style.marginBottom = "40px";

        card.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.imageUrl}" width="300" onerror="this.style.display='none'">
            <p>${item.description}</p>
        `;

        resultsDiv.appendChild(card);
    });
}

// Reset button
resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsDiv.innerHTML = "";
});
