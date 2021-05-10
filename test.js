const express = require('express')
const gTTS = require('gtts')
const path = require('path')


const app = express()

app.use(express.static(__dirname+'/'))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs')


app.get('/', function(req, res) {
  res.render('index',{
    text : 'hello worlds',
    file : 'voice.mp3'
  })
})


app.post('/',(req,res)=>{
  const text = req.body.text
  var gtts = new gTTS(text,'en-us')
  gtts.save('voice.mp3',(err,res)=>{
    if(err) throw err
    console.log('file converted.')
  })
  return res.redirect('/')
})


app.listen(5000, function () {
    console.log("Server is listening on Port 5000")
})