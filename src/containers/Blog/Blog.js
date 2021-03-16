import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts : [],
        fullPostId: null,
        
    }
    componentDidMount(){

        axios.get('/posts').then((response)=> {
            const fourPosts = response.data.slice(0,4);
            const posts = fourPosts.map(post => {
                return {
                    ...post,
                    author: "Dony" + post.id
                }
            })

            this.setState({posts: posts});
         
        })
    }
  postSelected = (id) =>{
     this.setState({fullPostId: id });

     

  }
    render () {

        const posts = this.state.posts.map(post => {
            return <Post clicked ={()=> {
                this.postSelected(post.id)
            }} title={post.title} key={post.id} author={post.author}/>;
        })
     
        return (
            <div>
                <section className="Posts">
           {posts}
                </section>
                <section>
                <FullPost id={this.state.fullPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;