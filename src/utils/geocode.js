const request= require('postman-request')

const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoiYW5vbnltb3VzMzIwOSIsImEiOiJja2RidXI3M3cwdzczMnNtaGl4NDFoZzdkIn0.IbzWRgG4J2rSQMHf6Wj2vw&limit=1'
    request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('network issue , couldnt connect to internet',undefined)
            }else if(body.features.length===0){
                callback('not a valid input ',undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        }
        )
} 

module.exports= geocode