import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
getFormOutput();

function onFormSubmit(e) {
  if (formData.email && formData.message) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('Email or message must not be empty');
  }
}

function onInput(e) {
  const userMessage = e.target.value;
  const userEmail = e.target.name;
  formData[userEmail] = userMessage;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    email.value = savedFormData.email || '';
    message.value = savedFormData.message || '';
  }
}
