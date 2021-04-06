const express = require('express'); // подключили модуль для создания веб-приложения на Node.js
const fs = require('fs'); // модуль для работы с файлами
const bodyParser = require('body-parser'); // модуль для чтения содержимого POST-запроса

const app = express(); // записали объект с основными методами express

app.use(bodyParser.json()); // указываем формат содержимого json

app.listen(3000, () => {
    console.log('server is running on port 3000!');
}); // метод принимает номер порта с сервером и колбэк, который срабатывает после запуска сервера

app.use(express.static('.')); // объяснили серверу, что нужно отдавать статичные файлы из текущей папки, теперь по адресу localhost:3000/имя_файла можно можно обратиться к файлам через браузер. Если не указать имя файла, откроется index.html

// учим сервер обрабатывать http-запросы

// метод для GET-запросов
app.get('/data', (req, res) => {
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.send(data);
        } else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});

// метод для POST-запросов
app.post('/data', (req, res) => {
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = JSON.parse(data);
            const id = goods.reduce((acc, good) => acc > good.id ? acc : good.id, 0) + 1;
            goods.push({
                id: id,
                title: req.body.title,
                price: req.body.price
            });

            fs.writeFile('./goods.json', JSON.stringify(goods), (err) => {
                if (!err) {
                    res.end();
                } else {
                    console.log(err);
                    res.end(JSON.stringify(err));
                }
            });

        } else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});

//гет-запрос для просмотра корзины
app.get('/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        } else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});

//пост-запрос для добавления товара в корзину
app.post('/cart', bodyParser.json(), (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = JSON.parse(data);

            goods.push(req.body);
            console.log(req.body);

            fs.writeFile('./cart.json', JSON.stringify(goods), (err) => {
                if (!err) {
                    res.end();
                } else {
                    console.log(err);
                    res.end(JSON.stringify(err));
                }
            });

        } else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});

app.delete('/cart', bodyParser.json(), (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (!err) {
            const cart = JSON.parse(data);
            const id = req.body.id;
            const goodIndex = cart.findIndex((item) => item.id == id);
            cart.splice(goodIndex, 1);

            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (!err) {
                    res.end();
                } else {
                    console.log(err);
                    res.end(JSON.stringify(err));
                }
            });
        } else {
            console.log(err);
        }
    })
})
