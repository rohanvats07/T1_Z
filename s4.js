document.addEventListener("DOMContentLoaded", function () {
    // API URL
    var apiURL = "https://s3.amazonaws.com/open-to-cors/assignment.json";

    // Fetch data from the API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Convert data to an array if needed
            var dataArray = extractArrayFromData(data);

            // Display the data
            displayData(dataArray);
        })
        .catch(error => console.error("Error fetching data:", error));

    function extractArrayFromData(data) {
        // Check if data is an object and has a property containing an array
        if (typeof data === 'object' && data !== null) {
            for (var key in data) {
                if (Array.isArray(data[key])) {
                    return data[key];
                }
            }
        }

        // If no array property is found, return an empty array
        return [];
    }

    function displayData(productData) {
        // Check if productData is an array
        if (!Array.isArray(productData)) {
            console.error("Error: Data is not an array.");
            return;
        }

        // Sort the data based on descending popularity
        var sortedData = productData.sort((a, b) => b.Popularity - a.Popularity);

        // Get the table body container
        var tableBody = document.querySelector('#productList table tbody');

        // Populate the table with product data
        sortedData.forEach(product => {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.textContent = product.Subcategory;
            cell2.textContent = product.Title;
            cell3.textContent = product.Price;
            cell4.textContent = product.Popularity;
        });
    }
});
