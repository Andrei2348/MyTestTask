import IMask from 'imask';  
import './style.scss';  

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

  if (!name) errors.name = "Поле обязательно к заполнению"; // Сообщение для имени  
  if (!email) errors.email = "Поле обязательно к заполнению"; // Сообщение для email  
  if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Введите корректный E-mail"; // Проверка корректности email  
  if (!phone) errors.phone = "Поле обязательно к заполнению"; // Сообщение для телефона  
  if (!message) errors.message = "Поле обязательно к заполнению"; // Сообщение для сообщения   

  return errors;  
};  

// Очистка сообщений об ошибках  
const clearErrors = (form) => {  
  const errorMessages = form.querySelectorAll('.error-message');  
  errorMessages.forEach(msg => msg.remove());  
  const inputs = form.querySelectorAll('input, textarea');  
  inputs.forEach(input => input.style.borderColor = '');  
};  

// Показ сообщения об ошибке под полем  
const showFieldError = (field, message) => {  
  const error = document.createElement('div');  
  error.className = 'error-message';  
  error.textContent = message;  
  field.style.borderColor = 'red';  
  if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {  
    field.insertAdjacentElement('afterend', error);  
  }  
};  

// Закрытие модального окна  
const closeModal = () => {  
  const modal = document.querySelector('.modal');  
  if (modal) {  
    modal.style.display = 'none';  
    document.body.classList.remove('modal-open');  
    document.body.style.paddingRight = '0';  
  }  
};  

// Обработка отправки формы  
const form = document.getElementById('contact-form');  

// Проверка полей формы при отправке  
form.addEventListener('submit', async (e) => {  
  e.preventDefault();  
  clearErrors(form);  
  const errors = validateForm(form);  
  let hasErrors = false;  

  if (Object.keys(errors).length > 0) {  
    Object.keys(errors).forEach(key => {  
      const field = form[key];  
      if (field) {  
        showFieldError(field, errors[key]);  
        hasErrors = true;  
      }  
    });   
  }  

  // Если есть ошибки, прекращаем выполнение  
  if (hasErrors) {  
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

    // Закрываем модальное окно после завершения запроса  
    closeModal();  

    if (response.ok) {  
      form.reset();  
      // Выводим сообщение об успехе после закрытия модального окна  
      showStatusMessage(result.message, 'success');  
    } else {  
      const fields = result.fields || {};  
      Object.entries(fields).forEach(([key, value]) => {  
        const input = form[key];  
        if (input) {  
          showFieldError(input, value);  
        }  
      });  
      // Выводим сообщение об ошибке после закрытия модального окна  
      showStatusMessage("Некорректные данные, попробуйте снова.", 'error');  
    }  
  } catch (error) {  
    console.error('Ошибка:', error);  
    // Выводим сообщение об ошибке после закрытия модального окна  
    showStatusMessage("Произошла ошибка, попробуйте еще раз.", 'error');  
  }  
});  

// Показ модального окна  
const showModal = () => {  
  const modal = document.querySelector('.modal');  
  form.reset();  
  clearErrors(form);  
  modal.style.display = 'block';  
  document.body.classList.add('modal-open');  

  // Создаем временный элемент для определения ширины скролла  
  const scrollDiv = document.createElement('div');  
  scrollDiv.style.visibility = 'hidden';  
  scrollDiv.style.overflow = 'scroll';  
  scrollDiv.style.width = '100px';  
  scrollDiv.style.height = '100px';  
  document.body.appendChild(scrollDiv);  
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;  
  document.body.removeChild(scrollDiv);  

  // Добавляем отступ справа  
  document.body.style.paddingRight = `${scrollBarWidth}px`;  
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
document.querySelector('.open-modal').addEventListener('click', showModal);
