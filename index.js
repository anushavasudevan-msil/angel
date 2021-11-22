
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

var responseStatus = ["success","failure"];
var responseData = "No data found";

function response(resStatus,resData,resCode) { 
    return JSON.stringify({status:resStatus,data:resData,code:resCode})
}


// app.get();
// app.post();
// app.put();
// app.delete();

// get Route
app.get('/users', function (req, res) {
  res.json(userData)
})

app.get('/users/:userid', function (req, res) {
   const currUser = userData.find(i => i.userid === parseInt(req.params.userid));
   if(!currUser)
   res.status(404).send(response(responseStatus[1], responseData ,404));
   res.send(response(responseStatus[0], currUser,200));
  })
 
//Post Route

app.post('/users/create' ,function(req,res) {
    const newUser = {
        userid :userData.length + 1,
        username: req.body.name,
        gender: req.body.gender
    };
    userData.push(newUser);
    res.send(userData)
})

// put Route

app.put('/users/edit/:userid' ,function(req,res) {
    const user = userData.find(i => i.userid === parseInt(req.params.userid));
    if(!user)
    res.status(404).send(response(responseStatus[1], responseData ,404));
    user.username = req.body.name;
    user.gender = req.body.gender; 
    res.send(userData)
})

//Delete Route
app.delete('/users/delete/:userid' ,function(req,res) {
    const user = userData.find(i => i.userid === parseInt(req.params.userid));
    if(!user)
    res.status(404).send(response(responseStatus[1], responseData ,404));
    var index = userData.indexOf(user);
    userData.splice(index,1);
    res.send(userData);
})

app.listen(3000)
