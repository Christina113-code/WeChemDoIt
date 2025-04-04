async function fetchCompoundImg(compoundName){
    const baseUrl = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/";
    const imageUrl = `${baseUrl}${encodeURIComponent(compoundName)}/PNG`;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = compoundName;
    img.width = 300;

    return img
}


async function searchFromInput(){
    const moleculeName = document.getElementById("searchInput").value.trim();
    searchMolecule(moleculeName);
}
async function searchMolecule(moleculeName) {
    const dataOutput = document.getElementById("data-output");
    const moleculeTable = document.getElementById("moleculeTable");

    // Hides molecule table when element is displayed
    if (moleculeTable) {
        moleculeTable.style.display = "none";
    }

    if (!moleculeName) {
        dataOutput.innerHTML = "<p class='error'>Please enter a molecule name.</p>";
        return;
    }

    // PubChem API endpoint for searching by compound name
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(moleculeName)}/property/IUPACName,MolecularFormula,MolecularWeight/JSON`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not fetch molecule data. Check the name or try again.");
        }

        const data = await response.json();
        const properties = data.PropertyTable.Properties[0];

        // Display fetched data
        dataOutput.innerHTML = `
            <h1>${moleculeName.charAt(0).toUpperCase() + moleculeName.slice(1)}:</h1>
            <p><strong>IUPAC Name:</strong> ${properties.IUPACName || "N/A"}</p>
            <p><strong>Molecular Formula:</strong> ${properties.MolecularFormula || "N/A"}</p>
            <p><strong>Molecular Weight:</strong> ${properties.MolecularWeight || "N/A"}</p>
        `;
        const img = await fetchCompoundImg(moleculeName);
        dataOutput.appendChild(img);
    } catch (error) {
        console.error(error);
        dataOutput.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
    }
}

//Alphatbet-Nav 

const chemicalsList = [
    "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon",
"Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium",
"Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc",
"Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium",
"Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony",
"Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium",
"Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium",
"Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium",
"Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Protactinium",
"Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium",
"Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium",
"Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tennessine", "Oganesson"

];

document.querySelectorAll(".alphabet-letter").forEach(letter => {
    letter.addEventListener("click", function() {
        let selectedLetter = this.textContent;
        
        if (selectedLetter === "All") {
            restoreFullTable(); 
        } else {
            generateFilteredTable(selectedLetter);
        }
    });
});

function generateFilteredTable(letter) {
    const dataOutput = document.getElementById("data-output");
    const moleculeTable = document.getElementById("moleculeTable");

    if (moleculeTable) {
        moleculeTable.style.display = "none";
    }

    const filteredChemicals = chemicalsList.filter(chem => chem.startsWith(letter));

    if (filteredChemicals.length > 0) {
        let tableHTML = `
            <table id="data-table">
                <thead>
                    <tr>
                        <td style="font-size: 20px; font-weight: bold;">Chemical Name</td>
                    </tr>
                </thead>
                <tbody>
        `;
        filteredChemicals.forEach(chem => {
            tableHTML += `<tr><td><a href="#" onclick="searchMolecule('${chem}')">${chem}</a></td></tr>`;
        });
        tableHTML += `</tbody></table>`;

        dataOutput.innerHTML = tableHTML;
    } else {
        dataOutput.innerHTML = "<p>No results found.</p>";
    }
}

// Function to restore the original molecule table
function restoreFullTable() {
    const dataOutput = document.getElementById("data-output");

    dataOutput.innerHTML = "";

    const moleculeTableHTML = `
        <table id="moleculeTable">
            <tr>
                <td colspan="2" style="font-size: 20px; font-weight: bold;">Chemical Name</td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Water')">Water</a></td>
                <td><a href="#" onclick="searchMolecule('Sodium Chloride')">Sodium Chloride (NaCl)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Oxygen')">Oxygen (O₂)</a></td>
                <td><a href="#" onclick="searchMolecule('Ammonia')">Ammonia (NH₃)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Carbon Dioxide')">Carbon Dioxide (CO₂)</a></td>
                <td><a href="#" onclick="searchMolecule('Sulfuric Acid')">Sulfuric Acid (H₂SO₄)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Glucose')">Glucose (C₆H₁₂O₆)</a></td>
                <td><a href="#" onclick="searchMolecule('Nitrogen')">Nitrogen (N₂)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Ethanol')">Ethanol (C₂H₅OH)</a></td>
                <td><a href="#" onclick="searchMolecule('Benzene')">Benzene (C₆H₆)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Methane')">Methane (CH₄)</a></td>
                <td><a href="#" onclick="searchMolecule('Phosphoric Acid')">Phosphoric Acid (H₃PO₄)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Caffeine')">Caffeine (C₈H₁₀N₄O₂)</a></td>
                <td><a href="#" onclick="searchMolecule('Acetic Acid')">Acetic Acid (CH₃COOH)</a></td>
            </tr>
            <tr>
                <td><a href="#" onclick="searchMolecule('Cholesterol')">Cholesterol (C₂₇H₄₆O)</a></td>
                <td><a href="#" onclick="searchMolecule('Ozone')">Ozone (O₃)</a></td>
            </tr>
        </table>
    `;

    dataOutput.innerHTML = moleculeTableHTML;
}
