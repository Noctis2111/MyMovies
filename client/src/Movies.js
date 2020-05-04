import React, { Component } from 'react';

import { Card, CardImg, CardText,
  CardTitle, Col,CardBody} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';



class Movies extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.displayOnlyLike = 
        this.state = {like: this.props.movieLiked};
    }
    
    
    
    handleClick(){
        
        var isLike = !this.state.like;
        
        if (isLike === true){
            fetch('http://localhost:3000/mymovies',{
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `poster_path=${this.props.movieImg}&overview=${this.props.movieDesc}&title=${this.props.movieName}&idMovieDB=${this.props.idMovieDB}`
            }).catch(function(error) {
                console.log('Request failed', error)
                });
        }else if (isLike === false){
            fetch(`http://localhost:3000/mymovies/${this.props.idMovieDB}`,{
                method: 'DELETE'
            }).catch(function(error) {
                console.log('Request failed', error)
                });
        }
        this.setState({
            like: !this.state.like,
        })
      /*  .then(function(response) {
          return response.json();
        })
        .then((data) => {
            this.setState({
                movies: data
            })
        })
        .catch(function(error) {
          console.log('Request failed', error)
        });*/
      
        this.props.handleClickParent(!this.state.like,this.props.movieName);
        
        
    }
    
    
    render(){
        
        var styleHeart = {
          position:"absolute",
          top:"5%",
          left:"80%",
          color: "grey"
      }
        
        
        var iconeCoeur = faHeartRegular;  
        
        if (this.state.like){
            iconeCoeur = faHeart;
            styleHeart.color = "#fc6861"
            
        }
        
        var Display = {
            display : 'block',
        };
        
        if (this.props.displayOnlyLike == true ){
            if (this.state.like == true){
                Display.display = 'block' 
            }else{
                Display.display = 'none'
            }
        } 
        
        
        console.log("this.state.like",this.state.like)
         
        
        return( 
            <Col sm="3" style={Display}>
              <Card style={{marginBottom:"15px"}}>
               <FontAwesomeIcon onClick={this.handleClick} size="2x" style={styleHeart}  cursor="pointer" icon={iconeCoeur}/>
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500/${this.props.movieImg}`} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{this.props.movieName}</CardTitle>
                  <CardText>{this.props.movieDesc}</CardText>
                </CardBody>
            </Card>
          </Col>               
      )
    
    }
    
}

export default Movies;