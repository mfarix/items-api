/**
 * Created by Fariz on 13/08/2017.
 */

let express = require('express');
let bodyParser = require('body-parser');
let paginate = require('express-paginate');

let app = express();

let itemList = [
    {
        id: "123",
        name: "iPhone 7",
        price: "2999.90",
        brand: "Apple"
    }
];

// Pagination variables
let offset;
let totalPages;
let start;
let end;
let paginationInfo = [];

// Parse POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Log server requests
app.use(function (req, res, next) {
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});

// Pagination helper and set limits
app.use(paginate.middleware(30, 50));

// Routing
// For Pagination, use http://localhost:3000/items?page=2&limit=1
app.get('/items', function (req, res) {
    // Query string default values
    if (!req.query.page) {
        req.query.page = 1;
    }

    // Pagination variables
    offset = (req.query.page - 1) * req.query.limit;
    totalPages = Math.ceil(itemList.length / req.query.limit);
    start = offset;
    end = offset + req.query.limit;

    // Remove previous pagination and insert new data
    paginationInfo.length = 0;
    paginationInfo.push({
        totalResults: itemList.length,
        resultsPerPage: req.query.limit,
        currentPage: req.query.page,
        pages: totalPages
    });

    res.format({
        json: function () {
            res.json({
                items: itemList.slice(start, end),
                paginationInfo: paginationInfo
            });
        }
    });
});

// app.get('/items', function (req, res) {
//     res.json(itemList);
// });

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