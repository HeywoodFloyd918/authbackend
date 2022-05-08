const express = require('express'), bodyParser = require('body-parser');
const {validateTokenMiddleware} = require('./middlewares');
const {signIn,signUp,private} = require('./requestHandlers')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.post('/signin', signIn)
app.post('/signup', signUp)
app.post('/private', validateTokenMiddleware, private)
app.listen(3000, () => {
  console.log('server started');
})




// app.get('/test1',(req,res)=>{
//     console.log('ping');
// })
// app.get('/test2',firstMiddleware, (req,res)=>{
//     console.log('ping2');
// })
// app.listen(3000,()=>{
//     console.log('server started');
// },)