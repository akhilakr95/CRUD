var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var movie =mongoose.model("Addmovie");

var Addmovie = require('../model/addmovie')

  router.get('/AddorEdit', function(req, res) {
    res.render('admin/AddorEdit',{
      viewtitle : "Insert details of "
    });
  });

  router.post("/AddorEdit",(req,res)=>{
    var add = new Addmovie({
      moviename : req.body.moviename,
            date:req.body.date,
            time:req.body.time,
           type:req.body.type,
           trailer:req.body.trailer,
          // image:req.body.image,
      
    })
    add.save(function(err,doc){
      console.log("akila"+doc);
          
            if(!err){
              res.redirect('/list');
            }
              
              else{
                console.log('error during record insertion :'+ err);
              }
          });
  })

  router.get('/list',(req,res)=>{
   
    movie.find((err,docs)=>{
        if(!err)
        res.render('admin/list',{data:docs})
        else
        res.send('error:'+err)
       console.log("akki"+docs)
    })
})


  router.get('/edit/:id',(req, res)=>{
  movie.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
    console.log("binu"+doc)
      if(!err){
          
        res.render("admin/edit",{ viewTitle: "Update movie",data: doc });
      }
    });
  });


  router.post('/edit/:id',(req,res)=>{
    movie.findByIdAndUpdate({_id:req.params.id},req.body,(err,body)=>{
        if(!err){
            res.redirect("/list")
        }
    })
  })

  router.get('/delete/:id',(req,res)=>{
      movie.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
          if(err){
              res.send(err)
          }else{
              res.redirect('/list')
          }
      })
  })


module.exports = router;
