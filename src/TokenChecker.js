import React, { useEffect } from 'react'
import url from './Domain.json'
import axios from 'axios'

const TokenChecker = (level) => {

    let token = localStorage.getItem('token')

    console.log(token)

    if (token != undefined || token != null) {

        axios.get(url.api+'/api/tokenChecker',{
            headers: { 
              'Authorization':  `token=${token}`
            }
          }).then(res=>{
            if (res.data.tipe_data !== level) {
                
                localStorage.clear()
                alert('Access Forbidden')
                window.location.href = "/login"
            }
          })

    } else {

        return window.location.href = "/login"
    
    }

}


export { TokenChecker }