import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then( res => this.setState({
            title: res.data[0].title,
            img: res.data[0].img,
            content: res.data[0].content,
            username: res.data[0].username,
            profile_pic: res.data[0].profile_pic
        }))
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Nav />
                <div>
                    <h1>{this.state.title}</h1>
                    <img src={this.state.img} alt=''/>
                    <p>{this.state.content}</p>
                    <h4>by {this.state.username} <img width='75px' src={this.state.profile_pic} alt=''/></h4>
                </div>  
            </div>
        )
    }
}

export default Post;