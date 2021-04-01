const express = require('express');
const fs = require('fs');
const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.use(express.static('.'));

app.get('/data', (req, res) => {
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.send(data);
        }
    })
});

app.post('/data', (req, res) => {
    fs.readFile('../goods.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = JSON.parse(data);
            const id = goods.reduce((acc, good) => ac > good.id ? acc : good.id, 0) + 1;
            goods.push({
                id: id,
                title: req.body.title,
                price: req.body.price
            });
            fs.writeFile('../goods.json', JSON.stringify(goods), (err) = {});
        }
    });
});