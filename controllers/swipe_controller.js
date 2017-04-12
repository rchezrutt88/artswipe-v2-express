/**
 * Created by rdrutt on 4/12/17.
 */
const Art = require('../models/art');

module.exports = {
    showSwiper: showSwiper
}

function showSwiper(req, res) {
    res.render('art_swiper');
}