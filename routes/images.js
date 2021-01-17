// Router to handle requests to prefix path /images
const router = require("express").Router();
const databaseHelper = require('../database/databaseHelpers/databaseHelpers');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get("/addImage", (req, res) => {
  let user_id = req.session.user_id;
  let email;

  if(user_id){
    databaseHelper.getUserData(user_id)
    .then (result => {
      email = result.email;
      let templateVars = {
        email: email

      }
      res.render('addImage', templateVars);
    })


  } else {

    res.send("error: you must be logged in to view this page.");
  }
 
});

router.get("/myImages", (req, res) => {

  let user_id = req.session.user_id;
  let allImages;
  let email;
 
  
  if(user_id){
    
    // user the user_id to retrieve all the images belonging to user.
    databaseHelper.getUserData(user_id)
    .then (result => {
      email = result.email;

    })
    .then (result => {

      return databaseHelper.getAllImagesByUserId(user_id)
    })
    .then (result => {
      
      allImages = result;
      
      let templateVars = {

        allImages: allImages,
        email: email,
        
      }
      console.log("allImages variable inside myImages is: ", allImages);
      res.render('myImagesList', templateVars);
    });

   
  } else {

    res.send("error: you must be logged in to view this page.");

  }

});


router.post("/search", (req, res) => {
  // check if user is logged in and if yes, otherwise redirect to index page with message.
  let user_id = req.session.user_id;

  if(user_id) {

    let searchInput = req.body.searchInput;
    let email;
    let allImages;
    console.log("SEARCH INPUT IS: ", searchInput);
    

    databaseHelper.getUserData(user_id)
    .then(result => {

      email = result.email;

      //res.send(result);

      //console.log('result is: ', result);
      // get all resources from the user
      return databaseHelper.getAllImagesMatchingSearch(searchInput);

      // send the templateVars with all the resources inside ejs template.

    }).then(result => {

      allImages = result;

      //resourceDate = allResources.created_at;

      let templateVars = {

        allImages: allImages,
        email: email,
     
      }

      res.render("myImagesList", templateVars);

    });
  }else {
    res.send("Please login or register to view requested page");
    console.log("Please login or register to view requested page");
  }

});


router.get("/user/:image_id", (req, res) => {

  let user_id = req.session.user_id;
  let image_id = req.params.image_id;
  let email;
  let imageInfo;
  
  if(user_id){
    
    // user the user_id to retrieve the specific email for user
    databaseHelper.getUserData(user_id)
    .then (result => {
      email = result.email;

    })
    .then (result => {
      // get the specific image info using the image_id
      return databaseHelper.getImageByImageId(image_id);
    })
    .then (result => {
      // check if image belongs to user'
      //res.send(result);
      if(result[0].owner_id === user_id){
        imageInfo = result[0];
      
        let templateVars = {
  
          imageInfo: imageInfo,
          email: email
  
        }
        res.render('specific_image', templateVars);
      } else {

        res.send("error: image does not belong to currently logged in user, so can not view.");
      }


    });

   
  } else {

    res.send("error: you must be logged in to view this page.");

  }

});

/*
var uploadField = document.getElementById("file");

uploadField.onchange = function() {
    if(this.files[0].size > 2097152){
       alert("File is too big!");
       this.value = "";
    };
};
*/
// add a resource  (POST a resource)
router.post("/addImage", (req, res) => {
  
  let user_id = req.session.user_id;
  let category = req.body.category_id;
  let image_id;

  if(user_id){
    console.log("hello there!");
    let title = req.body.title;
    console.log("title is: ", title);
    let description = req.body.description;
   console.log("description is: ", description);
    let imageUpload = req.body.imageUpload;
  
    console.log("imageUpload is: ", imageUpload);
    databaseHelper.addImage(user_id,title,description, '/filePath', category)
    .then(result => {
    image_id = result[0].id;
    //req.session.test = "Test";
    console.log("MADE IT HERE!");
      //res.send(result);
      res.redirect(`/images/user/${image_id}`);
    })
  } else {

    res.send("error: you must be logged in to post to this site.");
  }
});

// all resources (GET all resources titles for user)


module.exports = router;