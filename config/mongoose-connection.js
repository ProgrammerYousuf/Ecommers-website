const mongoose = require('mongoose')

mongoose
.connect("mogodb://127.0.0.1:27017/Ecommers").then(function(){
    console.log('connected')
})
.catch(function(err){
    console.log(err)
})

module.exports= mongoose.connection