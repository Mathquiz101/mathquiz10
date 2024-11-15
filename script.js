// Function to generate a random hex color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to change the background color
function changeColor() {
    const newColor = getRandomColor();
    document.body.style.backgroundColor = newColor;
    document.getElementById("colorCode").textContent = newColor;
}
