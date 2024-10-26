const express = require('express');  
const cors = require('cors');  
const bodyParser = require('body-parser');  

const app = express();  
const PORT = 9090;  

app.use(cors());  
app.use(bodyParser.json());  

app.get('/api/ping', (req, res) => {  
    res.send('Server is running');  
});  

app.post('/api/registration', (req, res) => {  
    const success = Math.random() > 0.5;  
    
    if (success) {  
        res.status(200).json({ status: 'success', msg: 'Ваша заявка успешно отправлена' });  
    } else {  
        res.status(400).json({  
            status: 'error',  
            fields: {  
                inputName: 'Ошибка сервера. Попробуйте еще раз.'  
            }  
        });  
    }  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});