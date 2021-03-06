import {
  CREATE_USER,
  GET_ALL_USERS,
  DISCHARGE_USER,
  LOGIN, 
  LOGOUT,
  GET_USER_BY_ID
} from '../constants/index';

const initialState = {
  user: {},
  users: [],
  loggedUser:{}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.user
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.user
      };
    case DISCHARGE_USER:
      return {
        ...state,
        user: [ state.user, action.user ]
      };
    case LOGIN:
      return {
        ...state,
        user: {
          token: action.user.token,
          logged: true,
          id: action.user.user
          
        }
      };
      case LOGOUT:
        return {
          ...state,
          user: {
            logged: false,
          },
          loggedUser: null
        };
      case GET_USER_BY_ID:
        return {
          ...state,
          loggedUser: action.user
        };
    default:
    return state;
  };
};

export default userReducer;
