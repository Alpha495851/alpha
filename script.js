let history = [];

// Append value to the input field
function appendValue(value) {
    document.getElementById("result").value += value;
}

function appendSymbol(value) {
    document.getElementById("result").value += value;
}

// Perform calculation
function calculate() {
    try {
        const resultField = document.getElementById("result");
        // Replace the symbols with their actual JavaScript counterparts
        let calculation = resultField.value;
        calculation = calculation.replace(/√/g, "Math.sqrt");
        calculation = calculation.replace(/∛/g, "Math.cbrt");
        calculation = calculation.replace(/lg/g, "Math.log10");
        calculation = calculation.replace(/ln/g, "Math.log");
        calculation = calculation.replace(/sin/g, "Math.sin");
        calculation = calculation.replace(/cos/g, "Math.cos");
        calculation = calculation.replace(/tan/g, "Math.tan");
        calculation = calculation.replace(/π/g, "Math.PI");
        calculation = calculation.replace(/eˣ/g, "Math.exp");
        calculation = calculation.replace(/sinh/g, "Math.sinh");
        calculation = calculation.replace(/cosh/g, "Math.cosh");
        calculation = calculation.replace(/tanh/g, "Math.tanh");

        // Now evaluate the expression with the correct JavaScript functions
        const result = eval(calculation);
        history.push(`${resultField.value} = ${result}`);
        resultField.value = result;

        // Update history
        document.getElementById("history").innerHTML = history
            .map(entry => `<p>${entry}</p>`)
            .join("");
    } catch (error) {
        alert("Invalid calculation");
    }
}

// Clear display
function clearDisplay() {
    document.getElementById("result").value = "";
}

// Delete last character
function deleteLast() {
    const resultField = document.getElementById("result");
    resultField.value = resultField.value.slice(0, -1);
}

// Toggle advanced buttons menu
function toggleMenu() {
    const advancedButtons = document.getElementById("advanced-buttons");
    // Check if the menu is currently visible and toggle the display
    if (advancedButtons.style.display === "grid") {
        advancedButtons.style.display = "none";
    } else {
        advancedButtons.style.display = "grid";
    }
}

// Clear history
function clearHistory() {
    history = [];
    document.getElementById("history").innerHTML = "";
}
