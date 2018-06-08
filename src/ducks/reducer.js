let initialState = {
    username: '',
    id: null,
    profile_pic: ''
}

const STORE_LOGIN = 'STORE_LOGIN';

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case STORE_LOGIN: 
            return Object.assign({}, state, {username: action.payload.username, id: action.payload.id, profile_pic: action.payload.profile_pic})
        default:
            return state;
    }
}

export function storeLogin(currentInfo) {
    return {
        type: STORE_LOGIN,
        payload: currentInfo
    }
}