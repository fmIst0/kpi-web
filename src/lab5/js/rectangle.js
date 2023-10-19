const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const perimeterOutput = document.getElementById("perimeter");
const areaOutput = document.getElementById("area");
const diagonalOutput = document.getElementById("diagonal");

function calculateRectangle() {
    const lengthValue = parseFloat(lengthInput.value);
    const widthValue = parseFloat(widthInput.value);


    if (!isNaN(lengthValue) && lengthValue < 0) {
        alert("Довжина не може бути від'ємною.");
        lengthInput.value = "";
        return;
    }

    if (!isNaN(widthValue) && widthValue < 0) {
        alert("Ширина не може бути від'ємною.");
        widthInput.value = "";
        return;
    }

    if (isNaN(lengthValue) || isNaN(widthValue)) {
        perimeterOutput.textContent = '0';
        areaOutput.textContent = '0';
        diagonalOutput.textContent = '0';
    }

    if (!isNaN(lengthValue) && !isNaN(widthValue)) {
        const length = Math.max(0, lengthValue);
        const width = Math.max(0, widthValue);

        const perimeter = 2 * (length + width);
        const area = length * width;
        const diagonal = Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2));

        perimeterOutput.textContent = perimeter.toFixed(2);
        areaOutput.textContent = area.toFixed(2);
        diagonalOutput.textContent = diagonal.toFixed(2);
    }
}

lengthInput.addEventListener("input", calculateRectangle);
widthInput.addEventListener("input", calculateRectangle);