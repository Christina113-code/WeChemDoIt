function simulateReaction() {
    console.log("reacting bruh")
    const atom1 = document.getElementById('atom1').value;
    const atom2 = document.getElementById('atom2').value;
    const resultDiv = document.getElementById('result');

    // Clear previous result
    resultDiv.innerHTML = '';

    // Simulate reactions between selected elements
    if ((atom1 === 'H' && atom2 === 'O') || (atom1 === 'O' && atom2 === 'H')) {
        // H2 + O2 → H2O (Water)
        resultDiv.innerHTML = `
            <h3>Reaction Result:</h3>
            <p>Hydrogen (H) and Oxygen (O) react to form:</p>
            <p><strong>Water (H<sub>2</sub>O)</strong></p>
            <p><strong>Molecular Formula:</strong> H<sub>2</sub>O</p>
            <p><strong>Type of Reaction:</strong> Synthesis/Combustion</p>
        `;
    } else if ((atom1 === 'C' && atom2 === 'O') || (atom1 === 'O' && atom2 === 'C')) {
        // C + O2 → CO2 (Carbon dioxide)
        resultDiv.innerHTML = `
            <h3>Reaction Result:</h3>
            <p>Carbon (C) and Oxygen (O) react to form:</p>
            <p><strong>Carbon Dioxide (CO<sub>2</sub>)</strong></p>
            <p><strong>Molecular Formula:</strong> CO<sub>2</sub></p>
            <p><strong>Type of Reaction:</strong> Combustion</p>
        `;
    } else if ((atom1 === 'N' && atom2 === 'H') || (atom1 === 'H' && atom2 === 'N')) {
        // N2 + 3H2 → 2NH3 (Ammonia)
        resultDiv.innerHTML = `
            <h3>Reaction Result:</h3>
            <p>Nitrogen (N) and Hydrogen (H) react to form:</p>
            <p><strong>Ammonia (NH<sub>3</sub>)</strong></p>
            <p><strong>Molecular Formula:</strong> NH<sub>3</sub></p>
            <p><strong>Type of Reaction:</strong> Synthesis</p>
        `;
    } else {
        resultDiv.innerHTML = `<p class='error'>No valid reaction found for ${atom1} and ${atom2}.</p>`;
    }
}
