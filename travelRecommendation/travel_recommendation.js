git push origin
// Search functionality with alt text for accessibility and better error handling
document.getElementById('searchBtn').addEventListener('click', function() {
    let searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let recommendations = data.filter(item => 
                item.name.toLowerCase().includes(searchTerm)
            );

            displayRecommendations(recommendations);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('There was an issue fetching recommendations. Please try again later.');
        });
});

// Function to display recommendations
function displayRecommendations(results) {
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (results.length === 0) {
        resultContainer.style.display = 'none';
        const noResultsMessage = document.createElement('p');
        noResultsMessage.innerText = 'No results found';
        resultContainer.appendChild(noResultsMessage);
    } else {
        resultContainer.style.display = 'block';
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            const img = document.createElement('img');
            img.src = result.imageUrl;
            img.alt = result.name;  // Adding alt text for accessibility
            img.style.maxWidth = '100%';  // Ensure image scales well

            const description = document.createElement('p');
            description.innerText = result.description;

            resultDiv.appendChild(img);
            resultDiv.appendChild(description);
            resultContainer.appendChild(resultDiv);
        });
    }
}

// Reset functionality with clearer results
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('searchBar').value = '';
    displayRecommendations([]); // Clear displayed results
});
