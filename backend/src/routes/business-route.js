const configObect = require("../base/config");
const BusinessBase = require("../modules/business-base");
const { isAuthenticated } = require("../utils/helper");
const router = require("express").Router();

const classMap = new Map();
router.all("/:businessObjectName", isAuthenticated, (req, res, next) => {
    const { businessObjectName } = req.params;
    if (!businessObjectName) return res.sendStatus(404);
    const businessConfig = configObect[businessObjectName.toUpperCase()];
    if (!businessConfig) return res.sendStatus(404);
    if (!classMap.has(businessObjectName))
        classMap.set(businessObjectName, new BusinessBase(businessConfig));
    req.businessObject = classMap.get(businessObjectName);
    next();
});

router.post("/:businessObjectName/list", async (req, res) => {
    const { businessObject } = req;
    if (!(businessObject instanceof BusinessBase)) return res.sendStatus(500);
    const data = await businessObject.list(req.body);
    res.json(data);
});

router.post("/:businessObjectName/save", async (req, res) => {
    const { businessObject } = req;
    if (!(businessObject instanceof BusinessBase)) return res.sendStatus(500);
    const data = await businessObject.insert(req.body);
    res.status(201).json(data);
});

router.post("/:businessObjectName/update", async (req, res) => {
    const { businessObject } = req;
    if (!(businessObject instanceof BusinessBase)) return res.sendStatus(500);
    const data = await businessObject.delete(req.body);
    res.json(data);
});

router.post("/:businessObjectName/delete", async (req, res) => {
    const { businessObject } = req;
    if (!(businessObject instanceof BusinessBase)) return res.sendStatus(500);
    const data = await businessObject.delete(req.body);
    res.json(data);
});

module.exports = router;
