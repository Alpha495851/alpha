/* General Body Styling */
body {
    font-family: 'Roboto', sans-serif;
    background-color: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    color: white;
}

.calculator {
    background-color: #1e1e1e;
    border-radius: 12px;
    width: 400px;
    padding: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

/* Display Styling */
.display {
    background-color: #292929;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.display input {
    width: 100%;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    text-align: right;
    outline: none;
}

/* History Section Styling */
.history-section {
    background-color: #292929;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    max-height: 150px;
    overflow-y: auto;
}

.history-section #history {
    font-size: 0.9rem;
    color: white;
    line-height: 1.5;
    margin-bottom: 10px;
}

.history-section .clear-history-btn {
    background-color: #424242;
    border: none;
    padding: 8px 12px;
    font-size: 0.8rem;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
}

.history-section .clear-history-btn:hover {
    background-color: #616161;
}

/* Buttons Styling */
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.buttons button {
    background-color: #424242;
    border: none;
    padding: 15px;
    font-size: 1rem;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.buttons button:hover {
    background-color: #616161;
}
