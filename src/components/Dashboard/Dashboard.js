import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userSearch: '',
            userPosts: true,
            posts: []
        }
    }

    componentDidMount() {
        axios.get(`/api/posts/${this.props.id}/?usersearch=${this.state.userSearch}&userpost=${this.state.userPosts}`)
            .then( res => this.setState({posts: res.data}))
    }

    resetSearch() {
        this.setState({userSearch: ''})
        this.componentDidMount()
            console.log(this.state)
    }

    render() {
        let mappedPosts = this.state.posts.map((post, i) => {
            return (
                <Link to={`/post/${post.post_id}`} key={i}>
                <div >
                    <h3>{post.title}</h3>
                    <p>{post.username}</p>
                    <img width='75px' src={post.profile_pic} alt=''/>
                </div> 
                </Link>
            )
        })
        return (
            <div>
                <Nav />
                <input value={this.state.userSearch} placeholder='Search by Title' onChange={e => this.setState({userSearch: e.target.value})}/>
                <button>Search</button>
                <button onClick={() => this.resetSearch()}>Reset</button>
                <input type='checkbox' defaultChecked onClick={() => this.setState({userPosts: !this.state.userPosts})}/>
                <br />
                {mappedPosts}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        id: state.id
    }
}

export default connect(mapStateToProps)(Dashboard);