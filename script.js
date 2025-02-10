


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
        const img = await fetchCompoundImg(moleculeName)
        dataOutput.appendChild(img)
    } catch (error) {
        console.error(error);
        dataOutput.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
    }
}
