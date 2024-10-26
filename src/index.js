import IMask from 'imask'
import './style.scss'

// Инициализация маски для телефона
const phoneInput = document.querySelector('input[name="phone"]');
IMask(phoneInput, {
  mask: '+{7}(000)000-00-00'
});

// Валидация формы
const validateForm = (form) => {
  const errors = {};
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  if (!name) errors.name = "Введите имя";
  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Введите корректный E-mail";
  if (!phone) errors.phone = "Введите номер телефона";
  if (!message) errors.message = "Введите сообщение";
  
  return errors;
};

// Закрытие модального окна
const closeModal = () => {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// Обработка отправки формы
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');

form.addEventListener('input', () => {
  const errors = validateForm(form);
  submitButton.disabled = Object.keys(errors).length > 0;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errors = validateForm(form);
  if (Object.keys(errors).length > 0) {
    showStatusMessage("Пожалуйста, исправьте следующие ошибки: " + Object.values(errors).join(", "), 'error');
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch('http://localhost:9090/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    closeModal();  // Закрываем модальное окно при отправке формы
    if (result.status === 'success') {
      form.reset();
      showStatusMessage(result.msg, 'success');
    } else {
      Object.keys(result.fields).forEach(key => {
        const input = form[key];
        if (input) {
          input.style.borderColor = 'red';
        }
      });
      showStatusMessage("Некорректные данные, попробуйте снова.", 'error');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    showStatusMessage("Произошла ошибка, попробуйте еще раз.", 'error');
  }
});

// Показ модального окна
const showModal = (message) => {
  const modal = document.querySelector('.modal');
  const modalMessage = modal.querySelector('.modal-content');
  if (modalMessage.querySelector('.modal-message')) {
    modalMessage.querySelector('.modal-message').textContent = message;
  } else {
    modalMessage.insertAdjacentHTML('afterbegin', `<div class="modal-message">${message}</div>`);
  }
  modal.style.display = 'block';
};

// Закрытие модального окна при нажатии на кнопку закрытия
document.querySelector('.close').onclick = closeModal;

// Закрытие модального окна при клике вне его области
window.onclick = (event) => {
  const modal = document.querySelector('.modal');
  if (event.target === modal) {
    closeModal();
  }
};

// Функция для показывания сообщения о статусе
const showStatusMessage = (message, type) => {
  const statusMessageDiv = document.querySelector('.status-message');
  statusMessageDiv.textContent = message;
  statusMessageDiv.style.display = 'block';
  statusMessageDiv.style.color = (type === 'success') ? 'green' : 'red';
  setTimeout(() => {
    statusMessageDiv.style.display = 'none';
  }, 5000);
};

// Открытие модального окна по клику на кнопку
document.querySelector('.open-modal').addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
});
