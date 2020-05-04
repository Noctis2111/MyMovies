var mongoose = require('mongoose');


var moviesSchema = mongoose.Schema({
    poster_path:String,
    overview: String,
    title: String,
    idMovieDB: Number
});

/*var MoviesModel = mongoose.model('movies', moviesSchema);*/


module.exports = mongoose.model('movies', moviesSchema);