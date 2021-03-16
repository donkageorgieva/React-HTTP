import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        postId : this.props.id,
        postToDisplay: {},
    }
    componentDidUpdate(){
           if (this.props.id && this.props.id != this.state.postToDisplay.id) {
            axios.get('/posts/' + this.props.id).then(response=> {
                this.setState({postToDisplay: response.data})
                
             })
           }
           
    
    
        
    }
    deleteAPost = () =>{
           if (this.state.postToDisplay){
            axios.delete('/posts/' + this.props.id).then(response=> {
                console.log('Deleted' + response.data);
            })
           }
          
 
   
    }
    render () {

        let post;

        if (this.state.postToDisplay) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.postToDisplay.title}</h1>
                    <p>{this.state.postToDisplay.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick ={this.deleteAPost}>Delete</button>
                    </div>
                </div>
    
            );
        } else{
   
            post = <p>Please select a Post!</p>;
        }
        
        return post;
    }
}

export default FullPost;