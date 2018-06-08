import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { storeLogin } from '../../ducks/reducer';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: '',
            profilePicInput: '',
            redirect: false
        }
    }

    registerUser() {
        axios.post('/api/register', {
            username: this.state.usernameInput,
            password: this.state.passwordInput,
            profile_pic: this.state.profilePicInput
        }).then(res => this.props.storeLogin(res.data[0])
        ).then(this.setState({ redirect: true }))
    }

    loginUser() {
        axios.post('/api/login', {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        }).then(res => this.props.storeLogin(res.data[0])
        ).then(this.setState({ redirect: true }))
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to='/dashboard' />
            )
        }
        return (
            <div>
                <p>Username:</p>
                <input value={this.state.usernameInput} onChange={e => this.setState({ usernameInput: e.target.value })} />
                <p>Password:</p>
                <input type='password' value={this.state.passwordInput} onChange={e => this.setState({ passwordInput: e.target.value })} />
                <p>Profile Pic: (for new users only)</p>
                <input value={this.state.profilePicInput} onChange={e => this.setState({ profilePicInput: e.target.value })} />
                <br />
                <br />
                <button onClick={() => this.loginUser()}>Login</button>
                <button onClick={() => this.registerUser()}>Register</button>
            </div>
        )
    }
}

export default connect(null, { storeLogin })(Auth);