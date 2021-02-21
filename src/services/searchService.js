import { httpAxios } from './../utils/commonUtils'

const getSearchResults = () => {
    let result = httpAxios('https://api.npoint.io/559e22a5f259679392af', 'get')
    return result
};

export default {
    getSearchResults
};