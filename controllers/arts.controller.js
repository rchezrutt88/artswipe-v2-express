/**
 * Created by rdrutt on 2/17/17.
 */
const Art = require('../models/art');

module.exports = {
    showArts: showArts,
    seedArts: seedArts
}


function showArts(req, res) {
    Art.find({}, (err, arts) => {
        res.send(arts)
    });
}

// function showSingle(req, res) {
// }

function seedArts(req, res) {

    const arts = [
        {title: 'Mona Lisa', artist: 'Leonardo Da Vinci'},
        {title: 'Girl with a Pearl Earing', artist: 'Johannes Vermeer'}
    ];

    Art.remove({}, () => {

        for (art of arts) {
            var newArt = new Art(art);
            newArt.save();
        }

    });

    res.send('Database seeded!')

}