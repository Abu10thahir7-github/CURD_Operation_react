// const express = require('express');
// const app = express();
// const port = 5000;

// // Middleware to parse incoming JSON requests
// app.use(express.json());

// // Sample product data
// let product = [{
//         id: 1,
//         name: "laptop",
//         price: "10000",
//     },
//     {
//         id: 2,
//         name: "laptop AUS",
//         price: "210000",
//     },
// ];

// // Route to get all products
// app.get('/getProduct', (req, res) => {
//     try {
//         res.send(product);
//     } catch (error) {
//         console.log(error);
//     }
// });

// // Route to add a new product
// app.post('/postdata', (req, res) => {
//     try {
//         const {
//             id,
//             name,
//             price
//         } = req.body;
//         product.push({
//             id: id,
//             name: name,
//             price: price
//         });
//         res.send("data added successfully");
//     } catch (error) {
//         console.log(error);
//     }
// });

// // Route to update a product
// app.put('/updatedata/:id', (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         const {
//             name,
//             place
//         } = req.body;
//         const newData = product.map((item) => {
//             if (item.id == parseInt(id)) {
//                 return { ...item,
//                     name,
//                     place
//                 };
//             }
//             return item;
//         });
//         product = newData;
//         console.log(newData);
//     } catch (error) {
//         console.log(error);
//     }
// });

// // Route to delete a product
// app.delete('/deletedata/:id', (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         let newData = product.filter((item) => item.id != parseInt(id));

//         console.log(newData);
//         if (newData.length !== product.length) {
//             product = newData;
//             console.log(product);
//             res.send("data deleted successfully");
//         } else {
//             res.status(404).send("data not found");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("internal server error");
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log("server is running on port", port);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const UserModel = require("./model/UserModel");
app.use(express.json());

const port = 5000;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongodbSample")
  
  // .connect("mongodb+srv://abu10thahir7:OvtCeseyA4StMACC@cluster0.af4waob.mongodb.net/")

  .then(() => console.log("connected to mongo database successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.get("/", (req,res) =>{
  UserModel.find({})
  .then(users => res.json(users) )
  .catch(err => res.json(err))
}),

app.get('/getUSer/:id', (req,res)=>{
  const id = req.params.id;
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err=> res.json(err))
}),

app.put('/updateUser/:id', (req,res)=>{
const id = req.params.id;
UserModel.findByIdAndUpdate({_id:id},
  {name:req.body.name,
    email:req.body.email,
    password:req.body.password,
  place:req.body.place})
.then(users => res.json(users))
.catch(err=> res.json(err))
}),


app.post("/createUser", (req,res)=>{
UserModel.create(req.body)
.then(users => res.json(users)) 
.catch(err => res.json(err))
}),

app.delete('/deleteUser/:id',(req,res)=>{
const id=req.params.id;
UserModel.findByIdAndDelete({_id: id})
.then(res => res.json(res))
.catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("server is running on port", port);
});


// const express = require("express");
// const cors = require("cors");
// const app = express();
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");

// const port = 5000;

// mongoose.connect('mongodb://localhost:27017/image-curd');

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// const imageSchema = new mongoose.Schema({
//     image: String
// });

// const Image = mongoose.model('Image', imageSchema);

// app.post('/upload', upload.single('file'), (req, res) => {
//     Image.create({ image: req.file.filename })
//         .then(result => {
//             console.log(result);
//             res.send("file uploaded successfully");
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).send("Internal Server Error");
//         });
// });



