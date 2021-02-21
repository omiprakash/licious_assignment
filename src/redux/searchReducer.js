import  searchService from '../services/searchService';

const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SEARCH':
            return action.data;
        default:
            return state;
    }
};

export const initSearch = () => {
    return async dispatch => {
       const search = searchService.getSearchResults(); 
       search.then(resp => {
           dispatch({
           type: 'INIT_SEARCH',
           data: resp.data,
       })
    }
       )
    };
};
export default searchReducer;