/**
 * Created by rdrutt on 2/13/17.
 */
const data = require('../data/data.json');

module.exports = (req, res) => {
    const models = data.models;

    res.status(200).json({ models });
};