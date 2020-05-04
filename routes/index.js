var express = require("express");
var request = require("request");
var mongoose = require("mongoose");
var router = express.Router();

var MoviesModel = require("../models/movies");

/* GET home page. */

router.get("/", function (req, res, nest) {
  var list = "back ok";
  res.json(list);

  console.log(list);
});

router.get("/movies", function (req, res, next) {
  request(
    "https://api.themoviedb.org/3/discover/movie?api_key=0e4149aeff6c91ab012a4b20e257debc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1",
    function (error, response, body) {
      var body = JSON.parse(body);

      res.json(body);
    }
  );
});

router.get("/mymovies", function (req, res, next) {
  MoviesModel.find(function (err, movies) {
    res.json(movies);
  });
});

router.post("/mymovies", function (req, res, next) {
  /*request("https://api.themoviedb.org/3/discover/movie?api_key=0e4149aeff6c91ab012a4b20e257debc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1", 
    function(error, response, body) {
        
        var body = JSON.parse(body)*/

  var newmovies = new MoviesModel({
    poster_path: req.body.poster_path,
    overview: req.body.overview,
    title: req.body.title,
    idMovieDB: req.body.idMovieDB,
  });

  console.log(req.body);

  newmovies.save(function (error, cities) {
    console.log("newwwwwwwwwwwww", newmovies);
    res.json(req.body);
  });
});

router.delete("/mymovies/:moviesid", function (req, res, next) {
  console.log(req.params);

  MoviesModel.deleteOne({ idMovieDB: req.params.moviesid }, function (error) {
    res.json({ result: true });
  });
});

module.exports = router;
