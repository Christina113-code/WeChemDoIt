// Fetch ChEMBL ID for a given compound name
async function getChEMBLID(compoundName) {
    const url = `https://www.ebi.ac.uk/chembl/api/data/molecule.json?search=${encodeURIComponent(compoundName)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Compound not found: ${compoundName}`);

        const data = await response.json();
        if (!data.molecules || data.molecules.length === 0) return null; // No ChEMBL ID found

        return data.molecules[0].molecule_chembl_id; // Return first ChEMBL ID
    } catch (error) {
        console.error(`Error fetching ChEMBL ID for ${compoundName}:`, error);
        return null;
    }
}
    

// Fetch reactions for a ChEMBL molecule ID
async function getChEMBLReactions(chemblID) {
    const url = `https://www.ebi.ac.uk/chembl/api/data/reaction.json?molecule_chembl_id=${chemblID}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`No reactions found for ChEMBL ID: ${chemblID}`);

        const data = await response.json();
        return data.reactions; // Returns an array of reactions
    } catch (error) {
        console.error(`Error fetching reactions for ChEMBL ID ${chemblID}:`, error);
        return null;
    }
}

// Main function: Simulate reaction
async function simulateReaction() {

    const reactant1 = document.getElementById("reactant1").value.trim();
    id = await getChEMBLID(reactant1)
console.log(id)
    const reactant2 = document.getElementById("reactant2").value.trim();
    const outputDiv = document.getElementById("reaction-output");

    if (!reactant1 || !reactant2) {
        outputDiv.innerHTML = "<p style='color:red;'>Please enter both reactants.</p>";
        return;
    }

    outputDiv.innerHTML = "<p>Fetching reaction data...</p>";

    // Get ChEMBL IDs
    const chemblID1 = await getChEMBLID(reactant1);
    const chemblID2 = await getChEMBLID(reactant2);

    if (!chemblID1 || !chemblID2) {
        outputDiv.innerHTML = "<p style='color:red;'>One or both compounds were not found in ChEMBL.</p>";
        return;
    }

    // Get reactions
    const reactions1 = await getChEMBLReactions(chemblID1);
    const reactions2 = await getChEMBLReactions(chemblID2);

    if (!reactions1 || !reactions2) {
        outputDiv.innerHTML = "<p style='color:red;'>No reactions found for these compounds.</p>";
        return;
    }

    // Find a common reaction (if any)
    const commonReaction = reactions1.find(r1 => reactions2.some(r2 => r1.reaction_id === r2.reaction_id));

    if (!commonReaction) {
        outputDiv.innerHTML = "<p style='color:red;'>No known reaction exists between these compounds.</p>";
        return;
    }

    // Display reaction details
    outputDiv.innerHTML = `
        <h2>Reaction Found</h2>
        <p><strong>Reactants:</strong> ${commonReaction.reactants.map(r => r.molecule_chembl_id).join(", ")}</p>
        <p><strong>Products:</strong> ${commonReaction.products.map(p => p.molecule_chembl_id).join(", ")}</p>
        <p><strong>Reaction Type:</strong> ${commonReaction.reaction_type}</p>
    `;
}
