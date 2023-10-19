const firstForm = document.getElementById('first-form');
const secondForm = document.getElementById('second-form');
const messagesContainer = document.querySelector('.messages-container');

firstForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);

    const newMessageContainer = document.createElement('div');
    newMessageContainer.setAttribute('id', 'left-part')

    newMessageContainer.innerHTML += formValues.message;

    messagesContainer.append(newMessageContainer);
    firstForm.reset();
});

secondForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);

    const newMessageContainer = document.createElement('div');
    newMessageContainer.setAttribute('id', 'right-part');
    newMessageContainer.innerHTML += formValues.message;

    messagesContainer.append(newMessageContainer);
    secondForm.reset();
});
