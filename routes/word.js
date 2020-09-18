const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const Word = mongoose.model("Word")
const {app_id,app_key} = require('../config/key')

//code to post word details in database
router.post('/addword',(req,res)=>{
    const {wordid} = req.body
    if(!wordid){
        return res.status(422).json({error:"please fill the fields"})
    }
    //fetch oxford dictionary api to get details of word
    fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordid}?strictMatch=false`,{
        method:"GET",
        headers:{
            'Accept': 'application/json',
            "app_id":app_id,
            "app_key":app_key,
        },
    }).then(res=>res.json())
    .then(data=>{
    const word = new Word({
       wordid,
       metadata:data.metadata,
       results:data.results,
       word:data.word
    })
    //saving the fetched data in database
    word.save()
    console.log(word)
}).catch(err=>{
        console.log(err)
    })
})

//get request to get particular word details 
router.get('/word/:id',(req,res)=>{
    Word.findOne({wordid:req.params.id})
       .then(data=>{
                res.json({data})
       }).catch(err=>{
           console.log(err)
       })
 })
//  for getting words list
router.get('/fullwords',(req,res)=>{
    Word.find()
    .sort('-createdAt')
    .then(data=>{
        res.json({data})
    }).catch(err=>{
        console.log(err)
    })
})
// for seraching word
router.post("/search-word",(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    Word.find({wordid:{$regex:userPattern}})
    .select("_id wordid")
    .then(data=>{
        res.json({data})
    }).catch(err=>{
        console.log(err)
    })
})
module.exports = router