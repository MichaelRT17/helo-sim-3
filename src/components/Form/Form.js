import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router'

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleInput: '',
            imageInput: '',
            contentInput: '',
            redirect: false
        }
    }

    handlePost() {
        axios.post(`/api/createPost/${this.props.id}`, {
            title: this.state.titleInput,
            img: this.state.imageInput,
            content: this.state.contentInput
        }).then(this.setState({
            redirect: true
        }))
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to='/dashboard' />
            )
        }
        return (
            <div>
                <Nav />
                <h1>New Post</h1>
                <h4>Title:</h4>
                <input onChange={e => this.setState({ titleInput: e.target.value })} />
                <br />
                <img src={this.state.imageInput} alt='' />
                <h4>Image URL:</h4>
                <input onChange={e => this.setState({ imageInput: e.target.value })} />
                <h4>Content:</h4>
                <input onChange={e => this.setState({ contentInput: e.target.value })} />
                <button onClick={() => this.handlePost()}>Post</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        id: state.id
    }
}

export default connect(mapStateToProps)(Form);