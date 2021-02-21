//Common utility 
import Axios from 'axios'

export const httpAxios = (url, method = 'GET', data) =>  {
    let instance
    const config = {timeout: 120000}
    let axiosUrl = url
    if(method.toLowerCase() === 'get'){ 
        instance = Axios.get(axiosUrl, { params: data})
    } else if(method.toLowerCase() === 'post') {
        instance = Axios.post(axiosUrl, data, config)
    }
    return instance
} 

export const getDiscountedAmount = (dis, baseValue) => {
    let discountedAmt = baseValue - ((baseValue * dis)/100)
    return discountedAmt
}
