
const express = require('express');
const app = express();


app.use(express.json());
const userData = [
    {
        userid : 1,
        username: "Anusha",
        gender: "F",
    },
    {
        userid : 2,
        username: "Anu",
        gender: "F",
    },
    {
        userid : 3,
        username: "Anush",
        gender: "M",
    }
        
]

// app.get();
// app.post();
// app.put();
// app.delete();


app.get('/', function (req, res) {
  res.send("heloo check")
})
// get Route
app.get('/users', function (req, res) {
  res.send(userData)
})
app.get('/users/:userid', function (req, res) {
   const currUser = userData.find(i => i.userid === parseInt(req.params.userid));
   console.log(req)
   if(!currUser)
   res.status(404).send(JSON.stringify({status:"Failure",data: "No data found",code:404}));
   res.send(JSON.stringify({status:"Success",data: currUser,code:200}));

  })
 
//Post

app.post('/users/create' ,function(req,res) {
    const newUser = {
        userid :userData.length + 1,
        username: req.body.name,
        gender: req.body.gender
    };
    userData.push(newUser);
    res.send(userData)
})

// put

app.put('/users/edit/:userid' ,function(req,res) {
    const user = userData.find(i => i.userid === parseInt(req.params.userid));
    if(!user)
    res.status(404).send(JSON.stringify({status:"Failure",data: "No data found",code:404}));
    user.username = req.body.name;
    user.gender = req.body.gender; 
    res.send(userData)
})

app.delete('/users/delete/:userid' ,function(req,res) {
    const user = userData.find(i => i.userid === parseInt(req.params.userid));
    if(!user)
    res.status(404).send(JSON.stringify({status:"Failure",data: "No data found",code:404}));
    var index = userData.indexOf(user);
    userData.splice(index,1);
    res.send(userData);
})

app.listen(3000)
