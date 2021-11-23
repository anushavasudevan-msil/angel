
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
const responseStatus = {"ok":"success","no":"failure"}
const failureData = "No data Found";
const statusNotFound = "404";
const statusSuccess = "200";

function response(resStatus,resData,resCode) { 
    return JSON.stringify({status:resStatus,data:resData,code:resCode})
}

app.get('/', function (req, res) {
    var ch = Display();
  res.send(ch)
})

// get Route
app.get('/users', function (req, res) {
  res.json(userData)
  
})
app.get('/users/:userid', function (req, res) {
   const currUser = userData.find(i => i.userid === parseInt(req.params.userid));
   if(!currUser)
   res.status(404).send(response(responseStatus.no, failureData,statusNotFound));
   res.send(response(responseStatus.ok, currUser,statusSuccess));

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
    res.status(404).send(response(responseStatus.no, failureData,statusNotFound));
    user.username = req.body.name;
    user.gender = req.body.gender; 
    const index = userData.indexOf(user);
    const editedData = userData.splice(index,1);
    res.send(editedData)
})

app.delete('/users/delete/:userid' ,function(req,res) {
    const user = userData.find(i => i.userid === parseInt(req.params.userid));
    if(!user)
    res.status(404).send(response(responseStatus.no, failureData,statusNotFound));
    const index = userData.indexOf(user);
    const deletedData = userData.splice(index,1);
    res.send(deletedData);
})

app.listen(3000)
