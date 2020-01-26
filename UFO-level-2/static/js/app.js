
// data from data.js
const sightings = data;

// Select the button
let button = d3.select("#filter-btn");

// When button is clicked, the searching and filtering is done
button.on("click", () => {

    // prevent refresh
    d3.event.preventDefault();

    // key names used in buttons
    let cols = ["datetime", "city", "state", "country", "shape"];

    // Select the input elements and get the raw HTML node, put in array
    let inputElements = [];
    cols.forEach(col => inputElements.push(d3.select("#" + col)));

    // Get the value properties of the input elements

    let inputValues = [];
    for(i = 0; i < inputElements.length; i++){
            inputValues.push(inputElements[i].property("value"));
    };
    console.log(inputValues);
    let filter = function(data) {
        return data[cols[0]] === inputValues[0] || data[cols[1]] === inputValues[1] || data[cols[2]] === inputValues[2] || data[cols[3]] === inputValues[3] || data[cols[4]] === inputValues[4];
    };


    // search data based on the data that was input by user
    let filteredData = sightings.filter(sighting => filter(sighting));
    console.log(filteredData);
    // empty html template string
    let html = ``;


    if(filteredData.length === 0) {

        // if no results returned in search, notify
        html += `<tr><th colspan="7">`;
        html += `<h3>No results found for your seach criteria</h3>`;
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

