const result = document.getElementById("result");
const menu = document.getElementById("menu");

function appendValue(value) {
    result.value += value;
}

function clearDisplay() {
    result.value = "";
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        result.value = eval(result.value); // Use eval with care
    } catch {
        result.value = "Error";
    }
}

function toggleMenu() {
    if (menu.style.display === "grid") {
        menu.style.display = "none";
    } else {
        menu.style.display = "grid";
    }
}
