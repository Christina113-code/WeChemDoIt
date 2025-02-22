//this fetches terms when user clicks on clickable terms
async function fetchWikipediaDefinition(term) {
    const baseUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${term}`;

    try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Definition not found.");

        const data = await response.json();
        console.log("Wiki API Response:", data);  

        displayDefinition(data.extract || "Definition not found.", term);
    } catch (error) {
        console.error("Error fetching data:", error);
        displayDefinition("Definition not found.", term);
    }
}

function displayDefinition(definition, term) {
    const capitalizedTerm = term
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '); 

    document.getElementById("term-title").innerText = capitalizedTerm;
    document.getElementById("term-definition").innerText = definition;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#glossaryTable a").forEach(term => {
        term.addEventListener("click", function(event) {
            event.preventDefault();
            const searchTerm = this.innerText;
            fetchWikipediaDefinition(searchTerm);
        });
    });
});

//this fetches terms when user uses search bar
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchTerm();
    }
});

function searchTerm() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (searchTerm) {
        fetchWikipediaDefinition(searchTerm);
    } else {
        displayDefinition("Please enter a valid chemistry term.", "Error");
    }
}

//filters definitions by letter

/* const glossaryTerms = [
    "Water", "Atom", "Molecule", "Electronegativity", "Molecular Formula",
    "Hydrogen Bond", "Isomer", "Conformation", "Polarity", "Reactivity", "Stability"
];

function filterByLetter(letter) {
    const filteredTerms = letter === 'all' ? glossaryTerms : glossaryTerms.filter(term => term.toUpperCase().startsWith(letter));
    displayFilteredTerms(filteredTerms);
}

function displayFilteredTerms(filteredTerms) {
    const table = document.getElementById("moleculeTable");
    table.innerHTML = ""; 

    filteredTerms.forEach(term => {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        const link = document.createElement("a");
        
        link.href = "#";
        link.textContent = term;
        link.addEventListener("click", function(event) {
            event.preventDefault();
            fetchWikipediaDefinition(term);  
        });
        
        cell.appendChild(link);
        row.appendChild(cell);
        table.appendChild(row);
    });
} */

