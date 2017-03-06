/**
 * Created by rdrutt on 2/17/17.
 */

module.exports = {
    showHome: showHome
}

function showHome(req, res) {
    res.render('home', {user: req.user ? req.user.local : false});
}