let history = [];

// Append value to the input field
function appendValue(value) {
    document.getElementById("result").value += value;
}

// Perform calculation
function calculate() {
    try {
        const resultField = document.getElementById("result");
        const result = eval(resultField.value);
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
    advancedButtons.style.display =
        advancedButtons.style.display === "grid" ? "none" : "grid";
}

// Clear history
function clearHistory() {
    history = [];
    document.getElementById("history").innerHTML = "";
}
