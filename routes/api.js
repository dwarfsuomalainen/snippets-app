var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken");
const extractToken = require("../auth/extractToken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Todos = require("../models/Todo");
const Recipes = require("../models/Recipes");
const Category = require("../models/Category");
const Images = require("../models/Images");
const bodyParser = require('body-parser');
const path = require('path');



/* GET users listing. */
router.get("/private", validateToken, (req, res, next) => {
  const { email } = extractToken(req);
  res.json({ email });

  /*User.find({}, (err, users) =>{
    if(err) return next(err);
    res.render("users", {users});
  })*/
});

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/login.html", (req, res, next) => {
  res.redirect("/login.html");
});

// todos

router.post("/todos/", validateToken, (req, res, next) => {
  const { id } = extractToken(req);

  Todos.findOne({ user: id }, (err, existingTodo) => {
    if (err) return next(err);
    if (!existingTodo) {
      new Todos({ user: id, items: req.body.items }).save((err) => {
        if (err) return next(err);
        return res.status(200).send("ok");
      });
    } else {
      existingTodo.items = [...existingTodo.items, ...req.body.items];
      existingTodo.save();
      return res.send("ok2");
    }
  });
});

router.get("/todos", validateToken, (req, res, next) => {
  console.log("O I N K ");
  const { id } = extractToken(req);

  Todos.findOne({ user: id }, (err, existingTodo) => {
    console.log(err, existingTodo);
    if (err) return next(err);

    res.status(200).send(existingTodo ? existingTodo.items : []);
  });
});

router.post("/user/login", upload.none(), (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, email) => {
    if (err) throw err;

    if (!email) {
      return res.status(403).json({ message: "Login failed" });
    } else {
      bcrypt.compare(req.body.password, email.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const jwtPayload = {
            id: email._id,
            email: email.email,
          };
          let emailX = jwtPayload.email;
          console.log(jwtPayload.email);
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 120,
            },
            (err, token) => {
              res.json({ success: true, token, emailX });
            }
          );
        } else {
          return res.status(403).json({ message: "Login failed" });
        }
      });
    }
  });
});

router.get("/register.html", (req, res, next) => {
  res.redirect("/register.html");
});
router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post(
  "/user/register/",
  body("email").isEmail().trim(),
  body("password").isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors", errors);
      const isPasswordError = errors
        .array()
        .some((x) => x.param === "password");
      if (isPasswordError) {
        return res.redirect("/register.html?error=password");
      } else {
        return res.redirect("/register.html");
      }
    }
    User.findOne({ email: req.body.email }, (err, email) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (email) {
        return res.redirect("/register.html?error=exists");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.create(
              {
                email: req.body.email,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.redirect("/login.html");
              }
            );
          });
        });
      }
    });
  }
);

router.get('/recipe/:food', (req, res, next)=> {
    let nameSEARCH = req.params.food;
    console.log(req.params.food)
    console.log(nameSEARCH + " line 50");
    Recipes.find({name: nameSEARCH}, (err, name) => {
        if (err) return next(err);
        if (name.length > 0) {
            console.log(name[0]); return res.json(name[0])}
    else { res.status(404).send("There is no recipies of "+ nameSEARCH +" in a cookBook");
}
});

    
})

// create a recipe

router.post('/recipe/', (req, res, next)=> {

    let items = Recipes.findOne({name: req.body.name}, (err, name) => {
        console.log(items);
        if(err) return next(err);
        if(!name){
                console.log(name);
                new Recipes({name: req.body.name,
                            ingredients: req.body.ingredients,
                            instructions: req.body.instructions,
                            categories: req.body.categories,
                            images: req.body.images
                            }).save((err) => {console.log(req.body);
                                if(err) return next (err);
                                return res.send(req.body);
                            });      
        } else { return res.status(403).send("This recipe already present");
    }
    })
 //console.log(req.body.name);      
});

//upload image

router.post("/images", upload.array("camera-file-input", 5), (req, res) => {
    let response1 = [];
    let response2 = {};
    for (let i = 0; i < req.files.length; i++) {
      let obj = {
        name: req.files[i].originalname,
        encoding: req.files[i].encoding,
        mimetype: req.files[i].mimetype,
        buffer: req.files[i].buffer,
      };
      response1.push(obj);
    }
  
    Images.insertMany(response1, function (error, response) {
      if (error) throw error;
      for (let i = 0; i < response.length; i++) {
        console.log(response[i]._id + "186");
        let idS = response[i]._id;
        response2[i] = idS;
      }
      console.log(response1); 
      console.log(response2); 
      res.json(response2);
    });
  });


// Categories 
router.get('/category/', (req, res, next)=>{

    Category.find({}, (err,name) => {
        let emptyArr = [];
        if (err) return next(err);
        if (name.length > 0) {return res.json(name)}
        else { res.send(emptyArr);
    }});
});

//Image ids 
router.get('/images/:imageId', (req, res, next)=>{
    let idfromDB = req.params.imageId
    Images.findOne({_id: idfromDB}, (err,img) => {
        if (err) return next(err);
        else {
        res.header('Content-Disposition', 'inline');
        res.header('content-type', 'image/jpeg');
    }
    res.send(Buffer.from(img.buffer, 'binary'));
    });
});

module.exports = router;
