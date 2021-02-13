const { Router } = require("express");

const CollectionService = require("../../services/collection");

const router = Router();

router.get("/:id", async (req, res, _next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send();
        return;
    }

    try {
        const r = await CollectionService.getById(id);
        if (r !== null) {
            res.status(200).json(r);
        } else {
            res.status(404).json();
        }
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
});

router.post("/", async (req, res, _next) => {
    try {
        const r = await CollectionService.create(req.body);
        res.status(201).json({ _id: r._id.toString() });
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
});

router.put("/:id", async (req, res, _next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send();
        return;
    }
    try {
        const r = await CollectionService.update(id, req.body);
        res.status(200).json(r);
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
});

module.exports = router;
