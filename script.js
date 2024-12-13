const result = document.getElementById("result");
const historyPanel = document.getElementById("history");
let memory = 0;
let isDeg = true;

// Append a value to the display
function appendValue(value) {
    result.value += value;
}

// Clear the display
function clearDisplay() {
    result.value = "";
}

// Delete the last character from the display
function deleteLast() {
    result.value = result.value.slice(0, -1);
}

// Calculate the result of the expression
function calculate() {
    try {
        const expression = result.value;
        const evaluation = eval(expression);
        result.value = evaluation;

        // Save to history
        if (expression) {
            addToHistory(expression, evaluation);
        }
    } catch {
        result.value = "Error";
    }
}

// Toggle between Degree and Radian for trigonometric functions
function toggleDegRad() {
    isDeg = !isDeg;
    alert(isDeg ? "Switched to Degrees" : "Switched to Radians");
}

// Append trigonometric functions
function appendTrig(func) {
    const value = isDeg ? `${func}(Math.PI/180*` : `${func}(`;
    result.value += value;
}

// Memory functions
function memoryClear() {
    memory = 0;
    alert("Memory Cleared");
}

function memoryAdd() {
    memory += parseFloat(result.value || "0");
    alert(`Memory Added: ${memory}`);
}

function memorySubtract() {
    memory -= parseFloat(result.value || "0");
    alert(`Memory Subtracted: ${memory}`);
}

function memoryRecall() {
    result.value = memory.toString();
}

// History functions
function addToHistory(expression, evaluation) {
    const historyItem = document.createElement("div");
    historyItem.innerHTML = `<span>${expression} = ${evaluation}</span>`;
    historyPanel.appendChild(historyItem);
    historyPanel.scrollTop = historyPanel.scrollHeight; // Auto-scroll to the latest
}

function clearHistory() {
    historyPanel.innerHTML = ""; // Clear all history
}

// Disable F12 and context menu
document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});
