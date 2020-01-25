
// data from data.js
const sightings = data;

// Select the button
let button = d3.select("#filter-btn");

// When button is clicked, the searching and filtering is done
button.on("click", () => {

    // prevent refresh
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#datetime");

    // Get the value property of the input element
    let inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(sightings);

    // search data based on the data that was input by user
    let filteredData = sightings.filter(sighting => sighting.datetime === inputValue);
    console.log(filteredData);
    // empty html template string
    let html = ``;

    if(inputValue.length === 0) {
        // if nothing entered in search box, notify
        html += `<tr><th colspan="7">`;
        html += `<h3>No search parameters provided. Please enter a Date in the Search Box.</h3>`;
        html += `</th></tr>`;
    } else if(filteredData.length === 0) {

        // if no results returned in search, notify
        html += `<tr><th colspan="7">`;
        html += `<h3>No results found for your seach criteria "${inputValue}"</h3>`;
        html += `</th></tr>`;
    } else {

        // otherwise, construct html table with data obtained in search
        // (continue appending to html template string)
        filteredData.forEach(sighting => {

            // for each search result create a row in the html table
            html += `<tr>`;

            // in each row create columns based on the keys, and write the associated value
            for(let key in sighting) {
                html += `<td>${sighting[key]}</td>`;
            };

            // close table row and move on to next search result (if exists)
            html += `</tr>`;
        });
    };
    

    // In index.html, Select tbody tag with class=sightings
    const tbody = document.querySelector('.sightings');
    // inject the html we just created into the tbody tag
    tbody.innerHTML = html;

});

