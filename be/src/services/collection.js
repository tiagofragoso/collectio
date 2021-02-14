const Collection = require("../models/collection");

const create = (dto) => Collection.create(dto);

const getById = (id) => Collection.findById(id);

const update = (id, dto) => Collection.findByIdAndUpdate(id, dto);

const getAll = () => Collection.find({});

module.exports = {
    create,
    getById,
    update,
    getAll,
};
