import React, { Component } from "react";
//import logo from './logo.svg';
/*import './index.css';*/
import {
  Button,
  Navbar,
  NavLink,
  Row,
  Container,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'*/
import "bootstrap/dist/css/bootstrap.css";
import Movies from "./Movies.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      popoverOpen: false,
      viewOnlyLike: false,
      moviesCount: 0,
      moviesNameList: [],
      movies: [],
      moviesLiked: [],
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  handleClickLikeOn() {
    this.setState({
      viewOnlyLike: true,
    });
  }
  handleClickLikeOff() {
    this.setState({
      viewOnlyLike: false,
    });
  }

  handleClick(like, name) {
    if (like === true) {
      var movieNameListCopy = [...this.state.moviesNameList];
      movieNameListCopy.push(name);

      this.setState({
        moviesCount: this.state.moviesCount + 1,
        moviesNameList: movieNameListCopy,
      });
    } else {
      var movieNameListCopy = [...this.state.moviesNameList];
      var index = movieNameListCopy.indexOf(name);
      movieNameListCopy.splice(index, 1);

      this.setState({
        moviesNameList: movieNameListCopy,
        moviesCount: this.state.moviesCount - 1,
      });
    }

    /*console.log("qsdfghjkoiuytrfvbn,",movieNameListCopy)
        console.log("ggggggggggggggggg",this.state.movieNameList)
        */
  }

  componentWillMount = () => {
    fetch("http://localhost:3000/movies")
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data,
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
    /*componentDidMount=()=>{*/
    fetch("http://localhost:3000/mymovies")
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          moviesLiked: data,
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  render() {
    var text = {
      color: "white",
    };

    console.log("tessssssssssssssssst", this.state.moviesLiked[0]);

    /* var tableauCard = [];
      for (var i = 0; i< 20; i++){
          tableauCard.push(<Movies/>)*/

    /*var moviesData = [
          {name : "L'Odyssée de Pi",
           desc: "Après que leur bateau est victime d'une violente tempête et coule au fond du Pacifique, un adolescent et un tigre du Bengale …",
           img : "../pi.jpg"},
           {name : "Maléfique",
            desc: "Poussée par la vengeance et une volonté farouche de protéger les terres qu'elle préside, Maléfique place ...",
            img : "../malefique.jpg"},
           {name : "Les Aventures de Tintin",
           desc: "Parce qu'il achète la maquette d'un bateau appelé la Licorne, Tintin, un jeune reporter, se retrouve entraîné dans une fantastique aventure...",
           img : "../tintin.jpg" } ]
      */

    if (this.state.movies.length != 0) {
      var moviesList = this.state.movies.results.map((movies, i) => {
        var isLike = false;
        console.log("film liker1", this.state.moviesLiked[i]);
        if (this.state.moviesLiked.length != 0) {
          if (this.state.moviesLiked[0].idMovieDB === movies.id) {
            console.log("film liker2", this.state.moviesLiked);
            isLike = true;
          }
        }

        return (
          <Movies
            movieName={movies.original_title}
            movieDesc={movies.overview}
            movieImg={movies.poster_path}
            idMovieDB={movies.id}
            movieLiked={isLike}
            displayOnlyLike={this.state.viewOnlyLike}
            handleClickParent={this.handleClick}
          />
        );
      });
    }

    /*var moviesNameList = [moviesData[1].name,moviesData[2].name,moviesData[2].name];*/
    //console.log(moviesNameList);

    /*var moviesCount = moviesNameList.length;*/
    //console.log(moviesCount);
    var moviesLast = this.state.moviesNameList.slice(-3);

    if (this.state.moviesNameList.length === 0) {
      moviesLast = "Aucun film sélectionné";
    } else if (this.state.moviesNameList.length <= 3) {
      moviesLast = this.state.moviesNameList.join(" , ");
    } else {
      moviesLast = this.state.moviesNameList.slice(1, 4).join(" , ") + "...";
    }
    //console.log(moviesLast);

    return (
      <div>
        <div>
          <Navbar style={{ backgroundColor: "#131A20" }} light expand="md">
            <img src="../logo.png" alt="" />

            <NavLink href="#" style={text} onClick={this.handleClickLikeOff}>
              Last Releases
            </NavLink>
            <NavLink href="#" style={text} onClick={this.handleClickLikeOn}>
              My Movies
            </NavLink>
            <Button id="Popover1" type="button">
              {this.state.moviesCount} Films
            </Button>
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen}
              target="Popover1"
              toggle={this.toggle}
            >
              <PopoverHeader>My Movies</PopoverHeader>
              <PopoverBody>{moviesLast}</PopoverBody>
            </Popover>
          </Navbar>
        </div>
        <Container>
          <Row>{moviesList}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
