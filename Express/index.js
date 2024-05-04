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
const userModel = require("./model/userModel");
app.use(express.json());

const port = 5000;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongodbSample")
  .then(() => console.log("connected to mongo database successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.post("/postdata", async (req, res) => {
  try {
    const { name, place, email, password } = req.body;
    const user = userModel.create({ name, place, email, password });
   
    res.send("data added successfully");
  } catch (err) {
    console.log(err + "error in post data");
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/getdata", async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.send(getUsers);
    console.log(getUsers);
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
});


// Route to delete a product
app.delete('/deletedata/:id', (req, res) => {
  try {
      const { id } = req.params;
      // Filter out the product with the specified id
      const newData = product.filter(item => item.id !== parseInt(id));

      if (newData.length !== product.length) {
          // Update the product array if a product was deleted
          product = newData;
          console.log(product);
          res.send("Data deleted successfully");
      } else {
          // If no product was deleted, send a 404 status
          res.status(404).send("Data not found");
      }
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
