

import axios from 'axios';
import QS from 'qs';


import store from '@/store';

axios.interceptors.request.use(
    function (config) {
        //在所有请求头部增加 token 值

        console.log(config)
        const token = 'bearer ' + store.state.user.token;
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (store.state.user.token){

            // config.withCredentials = true

            //config.headers.Authorization = token
            config.headers.Authorization = token

            console.log('addToken')
            console.log(config)
        }else{
            console.log('none Token')
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)


export default axios;
// export function post(url: string, params : any) {
//     return new Promise(((resolve, reject) => {
//         axios.post(url, QS.stringify(params))
//             .then(res => {
//                 resolve(res.data);
//             })
//             .catch(err => {
//                 reject(err.data);
//             })
//     }))
//
// }

