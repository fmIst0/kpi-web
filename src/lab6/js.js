const registrationForm = document.getElementById("registration-form");
const userTable = document.getElementById("user-table");
const deleteSelectedBtn = document.getElementById("delete-selected");
const duplicateSelectedBtn = document.getElementById("duplicate-selected");

const passwordInput = document.getElementById("password");
const lastNameInput = document.getElementById("last-name");
const firstNameInput = document.getElementById("first-name");
const middleNameInput = document.getElementById("middle-name");
const dobInput = document.getElementById("dob");
const genderInputs = document.querySelectorAll('input[name="gender"]');
const phoneInput = document.getElementById("phone");
const groupSelect = document.getElementById("group");

passwordInput.addEventListener("input", function () {
    clearErrorMessages();
});

lastNameInput.addEventListener("input", function () {
    clearErrorMessages();
});

firstNameInput.addEventListener("input", function () {
    clearErrorMessages();
});

middleNameInput.addEventListener("input", function () {
    clearErrorMessages();
});

dobInput.addEventListener("input", function () {
    clearErrorMessages();
});

phoneInput.addEventListener("input", function () {
    clearErrorMessages();
});

groupSelect.addEventListener("input", function () {
    clearErrorMessages();
});

genderInputs.forEach(input => {
    input.addEventListener("input", function () {
        clearErrorMessages();
    });
});

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(registrationForm);

    let isValid = true;

    const password = passwordInput.value;
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
        isValid = false;
        showError("password-error", "Пароль має містити мінімум 8 символів, цифри та букви.");
    }

    const nameInputs = [lastNameInput, firstNameInput, middleNameInput];
    const namePattern = /^[A-Za-zА-Яа-яЁё]+$/;
    nameInputs.forEach(input => {
        if (!namePattern.test(input.value)) {
            isValid = false;
            showError("name-error", "Поля мають містити тільки букви.");
        }
    });

    const dob = new Date(dobInput.value);
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 100);
    if (dob > currentDate || dob < minDate) {
        isValid = false;
        showError("dob-error", "Некоректна дата народження.");
    }

    const phone = phoneInput.value;
    const phonePattern = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
        isValid = false;
        showError("phone-error", "Некоректний номер телефону.");
    }

    if (groupSelect.value === "") {
        isValid = false;
        showError("group-error", "Виберіть групу.");
    }

    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) {
            genderSelected = true;
        }
    });
    if (!genderSelected) {
        isValid = false;
        showError("gender-error", "Виберіть стать.");
    }
    if (isValid) {
        const newRow = userTable.insertRow(1);
        newRow.innerHTML = `
            <td>${formData.get("email")}</td>
            <td>${formData.get("last-name")}</td>
            <td>${formData.get("first-name")}</td>
            <td>${formData.get("middle-name")}</td>
            <td>${formData.get("dob")}</td>
            <td>${formData.get("gender")}</td>
            <td>${phone}</td>
            <td>${formData.get("group")}</td>
            <td>${formData.get("file").name}</td>
            <td><input type="checkbox"></td>
        `;

        registrationForm.reset();
    }
});


deleteSelectedBtn.addEventListener("click", function () {
    const rows = userTable.rows;
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            userTable.deleteRow(i);
            i--;
        }
    }
});

duplicateSelectedBtn.addEventListener("click", function () {
    const rows = userTable.rows;
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const newRow = userTable.insertRow(i + 1);
            for (let j = 0; j < row.cells.length; j++) {
                const cell = newRow.insertCell(j);
                cell.innerHTML = row.cells[j].innerHTML;
            }
            checkbox.checked = false;
        }
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(element => {
        element.textContent = "";
    });
}
