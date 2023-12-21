import { combineReducers } from 'redux';


const initialAppState = {
    fontSize: 16,
    fontColor: '#000000', // Initial font color
    bgColor: '#ffffff', // Initial background color
    fontfamily: 'Arial'
};

const appReducer = (state = initialAppState, action) => {
    switch (action.type) {
        case 'SET_FONT_SIZE':
            return {
                ...state,
                fontSize: action.payload,
            };
        case 'SET_FONT_COLOR':
            return {
                ...state,
                fontColor: action.payload,
            };
        case 'SET_BG_COLOR':
            return {
                ...state,
                bgColor: action.payload,
            };
        case 'SET_FONT_FAMILY':
            return {
                ...state,
                fontfamily: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({
    app: appReducer,
});