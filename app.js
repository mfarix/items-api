/**
 * Created by Fariz on 13/08/2017.
 */

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let itemList = [
    {
        id: "123",
        name: "iPhone 7",
        price: "2999.90",
        brand: "Apple"
    }
];

// Parse POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log server requests
app.use(function (req, res, next) {
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});

// Routing
app.get('/items', function (req, res) {
    res.json(itemList);
});

app.post('/items', function (req, res) {
    itemList.push(req.body);
    res.json(itemList);
});

app.delete('/items/:id', function (req, res) {
    itemList = itemList.filter(function (item) {
        return item.id !== req.params.id;
    });
    res.json(itemList);
});

app.patch('/items/:id', function (req, res) {
    itemList = itemList.filter(function (item) {
        return item.id !== req.params.id;
    });
    itemList.push(req.body);
    res.json(itemList);
});

app.listen(3000);
console.log(`Server running at http://localhost:3000/`);

module.exports = app;