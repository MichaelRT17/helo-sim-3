import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Nav(props) {
    return (
        <div>
            <h1>Nav</h1>
            <img width='75px' src={props.profile_pic} alt=''/>
            <p>{props.username}</p>
            <Link to='/dashboard' >
                <button>Home</button>
            </Link >
            <Link to='/new' >
                <button>New Post</button>
            </Link >
            <Link to='/' >
                <button>Logout</button>
            </Link >
        </div>
    )
}

function mapStateToProps(state) {
    return {
        username: state.username,
        profile_pic: state.profile_pic
    }
}

export default connect(mapStateToProps)(Nav);