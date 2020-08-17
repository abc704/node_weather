const request = require('postman-request')

const forecast=(latitude,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9ccd89601c2851d37807a3a73a23ed2a&query='+latitude+','+long
    request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('couldnt connect to internet',undefined)
            }else if(body.error){
              callback('couldnt find the valid result',undefined)
            }
            else{
                callback(undefined,'It is currently'+body.current.temperature+'degree out'+body.current.feelslike)
            }
            })

        }
        module.exports=forecast