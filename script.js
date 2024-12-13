let currentCalculation = '';
let history = [];

function appendValue(value) {
    currentCalculation += value;
    document.getElementById('result').value = currentCalculation;
}

function clearDisplay() {
    currentCalculation = '';
    document.getElementById('result').value = '';
}

function deleteLast() {
    currentCalculation = currentCalculation.slice(0, -1);
    document.getElementById('result').value = currentCalculation;
}

function calculate() {
    try {
        let result = eval(currentCalculation);
        document.getElementById('result').value = result;
        history.push(`${currentCalculation} = ${result}`);
        currentCalculation = result;
        updateHistory();
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function toggleMenu() {
    const advancedButtons = document.getElementById('advanced-buttons');
    const buttons = document.querySelectorAll('#advanced-buttons button');
    if (advancedButtons.style.display === 'none' || advancedButtons.style.display === '') {
        advancedButtons.style.display = 'grid';
        buttons.forEach(button => {
            button.classList.add('active');
        });
    } else {
        advancedButtons.style.display = 'none';
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    }
}

function clearHistory() {
    history = [];
    updateHistory();
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';
    history.forEach(calc => {
        const div = document.createElement('div');
        div.textContent = calc;
        historyDiv.appendChild(div);
    });
}
