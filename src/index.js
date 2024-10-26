import './styles.scss';  

// Маска для телефона  
import IMask from 'imask';  

document.addEventListener('DOMContentLoaded', () => {  
    const form = document.querySelector('form');  
    const modal = document.querySelector('.modal');  
    const openModalBtn = document.querySelector('.open-modal');  

    // Применение маски к полю телефона  
    const phoneInput = document.getElementById('phone');  
    IMask(phoneInput, {  
        mask: '+{7}(000)000-00-00'  
    });  

    form.addEventListener('submit', async (e) => {  
        e.preventDefault();  
        // Валидация...  

        const formData = new FormData(form);  
        const response = await fetch('http://localhost:9090/api/registration', {  
            method: 'POST',  
            body: JSON.stringify(Object.fromEntries(formData)),  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        });  
        const result = await response.json();  

        if (result.status === 'success') {  
            form.reset();  
            alert(result.msg);  
        } else {  
            for (const [key, value] of Object.entries(result.fields)) {  
                const field = document.querySelector(`[name=${key}]`);  
                const error = document.createElement('div');  
                error.className = 'error';  
                error.textContent = value;  
                field.parentNode.insertBefore(error, field.nextSibling);  
            }  
        }  
    });  

    // Открытие модального окна  
    openModalBtn.addEventListener('click', () => {  
        modal.classList.add('open');  
        document.body.classList.add('no-scroll');  
    });  

    // Закрытие модального окна  
    modal.querySelector('.close').addEventListener('click', () => {  
        modal.classList.remove('open');  
        document.body.classList.remove('no-scroll');  
    });  
});