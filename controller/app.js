const express = require("express");
var cors= require("cors");

let user = require('../model/loggin');
let addmovie = require('../model/addmovie');
let addgenre = require('../model/addgenre');
let displaymovie = require('../model/movie');
let displaygenre = require('../model/genre');
let searchmovie = require('../model/searchmovie');
let searchmoviegenreid = require('../model/searchmovieid')
let verifyToken = require("../auth/verifyTolen");
let deletegenre = require("../model/deletegenre");
let updatemovie = require("../model/updatemovie")

const app = express();
app.use(express.json());

app.use(cors()); // include before other routes

app.post('/loggedin',function(request,response){
  email = request.body.email;
  password = request.body.password;
  role = request.body.role;
  user.getLogginUser(email,role,password,function(err,result){
    if(!err){
        if(result.length > 0){  
          if(result[0].role === "user"){
              response.status = 404;
              response.setHeader("Content-Type", "text/html");
              response.send("<h1>The user is not admin</h1>");
          }
          else if(result) {
            response.send("You are logged in. Your JWT is " + result);
            }
        }else {
                response.status = 404;
                response.setHeader("Content-Type", "text/html");
                response.send("<h1>The user cannot be find in database</h1>");
    }}
    })
  
});

app.post('/addmovie',verifyToken,function(request,response){
    
    nameofmovie = request.body.nameOfMovie;
    description = request.body.descriptionOfMovie;
    releaseDate = request.body.releaseDate;
    image_URL  = request.body.image_URL;
    genreId  = request.body.genre_ID;
    active = request.body.active;
    
    addmovie.addmovie(nameofmovie,description,releaseDate,image_URL,genreId,active,function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        console.log(result.length)
        if(result.affectedRows === 1){
          response.status(200).setHeader("Text-Content","text/html").send("<h1>One record has been added to the movie table</h1>");
        }else {
          response.status(404).setHeader("Text-Content","text/html").send("<h1>Too many records inseted.</h1>")
        }
      }
    })
})

app.post('/addgenre',verifyToken,function(request,response){
    nameofgenre = request.body.name;
    description = request.body.description;
  
    addgenre.addgenre(nameofgenre,description,function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        console.log(result)
        if(result.affectedRows === 1){
          response.status(200).setHeader("Content-Type","text/html").send("<h1>I record inserted into the Genre Table.</h1>")
        }else {
          response.status(404).send("Too many records inseted.")
        }
    }
  })
})

app.get('/movie',function(request,response){
  
  displaymovie.displaymovie(function(err,result){
    if(err){
      response.status(505).send("Some error")
    }else {
      let words = ''; 
      for(let i=0;i<result.length;i++){
          words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 2px solid #B71C1C; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
        }
        // response.send(result);
        response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
        <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
        <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
  
}})
  })


  app.get('/genre',function(request,response){
  
    displaygenre.displaygenre(function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        let words = ''; 
        for(let i=0;i<result.length;i++){
            words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].genreID+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].nameOfGenre+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
         }
          // response.send(result);
          response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse; margin-left: auto; margin-right: auto"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Genre Id</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name of Genre</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Description</th>
          </tr>${words}</table>`)
    
  }})
    })

app.post('/searchmovie',function(request,response){
    if(request.body.name){
      searchmovie.displaysearchmovie(request.body.name,function(err,result){
        if(err){
          response.status(505).send("Some error")
        }else {
          let words = ''; 
          for(let i=0;i<result.length;i++){
              words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
            }
            // response.send(result);
            response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
            <th style="border: 2px solid #B71C1C; color:#BF360C,; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
            <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
      
    }}
  )}else if(request.body.genreid){
    searchmoviegenreid.searchmoviegenreid(request.body.genreid,function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        let words = ''; 
        for(let i=0;i<result.length;i++){
            words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
          }
          // response.send(result);
          response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
    
  }
})
  }
      })

app.delete("/deletegenre/:id",verifyToken,(request,response)=>{
    deletegenre.deletegenre(request.params.id,function(err,result){
      if(err){
        response.status(500).send("Some err!");
      }else {
        if(result.affectedRows >= 1){
          response.status(200).setHeader("Content-Type","text/html").send("<h1>Rows have been deleted</h1>");
      }else {
          response.status(404).setHeader("Content-Type","text/html").send("No row has been deleted");
      }
    }})
}),

app.put("/updatemovie/:id",verifyToken,(request,response)=>{
  if(!request.body.movieID){
    updatemovie.updatemovie(request.body,request.params.id,function(err,result){
      if(err){
        response.status(500).send("Some err!");
      }else {
        console.log(result.affectedRows)
        if(result.affectedRows > 0){
          response.status(200).setHeader("Content-Type","text/html").send("<h1>Rows have been updated</h1>");
        }else {
          response.status(404).setHeader("Content-Type","text/html").send("No row has been updated");
       }
    }
  })
}else {
  response.send("You cannot update ID");
}
})

module.exports = app;
