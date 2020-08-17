const path = require('path')
const express=require('express')
const hbs =require('hbs')
const forecast=require('./utils/forecast')
const geocode= require('./utils/geocode')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))


const app=express()

const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.use(express.static( publicDirectory))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'weather App',
        name:'shashank kumar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'dynamic',
        msg:'its my message'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        msg:'this is my message'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
       errorMessage:'Ohh... fuck this is an error'
    })
})


// app.get('',(req,res)=>{
//     res.send({
//         name:'shashank',
//         title:'kumar'
//     })
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>Title</h1>')
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide a valid address"
        })
    }
 geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
     if(error){
         return res.send({
             error:"unable to fetch location"
         })

     } 
     
     forecast(latitude,longitude,(error,forecastData)=>{
         if(error){
          return res.send({
              error:"you must provide a search term"
          })}
        
        
         
          res.send({
        
             forecast: forecastData,
             location,
             address:req.query.address
             
          })

         
     })
 })
})
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search item"
        })
    }
    res.send(
        {
            product:[]
        }
    )

})
app.get("*",(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Shashank',
        errorMessage:'page'

    })
})








app.listen(3000,()=>{
    console.log('server is up')
})

