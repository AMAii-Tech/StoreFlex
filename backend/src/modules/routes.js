const database = require("../modules/database");
const express = require("express");
const configObj = require('../base/config');
const router = express();

/* The code `router.use('/:businessObjectName', ...)` is a middleware function that is used to handle
requests with a dynamic parameter `:businessObjectName`. */
router.use('/:businessObjectName', (req, res, next) => {
    const businessObjectName = req.params.businessObjectName.toUpperCase();
    const module = configObj[businessObjectName];
    if (!module) {
        throw new Error(`Business object ${req.params.businessObjectName} not found.`);
    }
    req.module = module;
    next();
});

/* The code `router.post('/:businessObjectName/list', async (req, res) => { ... })` is defining a route
handler for POST requests to the path `/:businessObjectName/list`. */
router.post('/:businessObjectName/list', async (req, res) => {
    const { module } = req;
    const { source } = module;

    const { start = 0, limit = 10, sort = module.defaultSort, groupBy, where } = req.body;

    const data = await database.listData({ source, start, limit, sort, groupBy, where });
    res.send(data);
});

/* The code `router.post('/:businessObjectName/save', async (req, res) => { ... })` is defining a route
handler for POST requests to the path `/:businessObjectName/save`. */
router.post('/:businessObjectName/save', async (req, res) => {
    const { module } = req;
    const { source } = module;

    const data = await database.insertData({ source, ...req.body });
    res.send(data);
});

/* The code `router.delete('/:businessObjectName/delete/:id', async (req, res) => { ... })` is defining
a route handler for DELETE requests to the path `/:businessObjectName/delete/:id`. */
router.delete('/:businessObjectName/delete/:id', async (req, res) => {
    const { module } = req;
    const { source, idProperty } = module;

    const { id } = req.params;

    const data = await database.deleteData({ source, id, idProperty });
    res.send(data);
});

/* The code `router.put('/:businessObjectName/put', async (req, res) => { ... })` is defining a route
handler for PUT requests to the path `/:businessObjectName/put`. */
router.put('/:businessObjectName/put', async (req, res) => {
    const { module } = req;
    const { source, idProperty } = module;

    const data = await database.updateData({ source, idProperty, ...req.body });
    res.send(data);
});

module.exports = router;