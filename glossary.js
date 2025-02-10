async function fetchWikipediaSummary(term) {
    const url = `http://localhost:3000/proxy?term=${encodeURIComponent(term)}`; // Use your local proxy
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Extract the page summary (first section)
        const page = data.query.pages[Object.keys(data.query.pages)[0]];
        const summary = page.extract || "No summary available.";
        
        console.log(`Summary for ${term}: ${summary}`);
        return summary;  // Return the summary or a default message
    } catch (error) {
        console.error("Error fetching data from server:", error);
        return "Error fetching summary.";
    }
}
// // Example usage: Scraping a Wikidata page URL
// scrapeWikidataPage("https://www.wikidata.org/wiki/Q24250")  // Polarity page URL
//     .then(data => {
//         // You can now use the data (definition and image URL)
//         console.log(data);
//     });

// async function fetchWikidataDefinition() {
//     let term = document.getElementById("searchInput").value.trim();
//     term = "chemical " + term;

//     const query = `
//     SELECT ?item ?itemLabel WHERE {
//       ?item rdfs:label "${term}"@en.
//     }
//     `;
    
//     const endpointUrl = "https://query.wikidata.org/sparql";
    
//     const url = `${endpointUrl}?query=${encodeURIComponent(query)}&format=json`;
//     const dataOutput = document.getElementById("output")
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data from Wikidata');
//         }

//         const data = await response.json();
//         const results = data.results.bindings 
//         const url2 = results[0].item.value
//         definition = scrapeWikidataPage(url2);
//        if (definition) {
           
//             dataOutput.innerHTML = `
//         <h1>Definition:  </h1>
//         <p>${definitionData.definition}</p>
//         <img src="${definitionData.imageUrl}"/>
//     `;
//             return label; // Return definition if it exists
//         } else {
//             console.log(`No definition found for ${term}`);
//             return "No definition found."; // Return message if no result found
//         }

       
// } catch (error) {
//     console.error(error);
//     dataOutput.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
// }
// }