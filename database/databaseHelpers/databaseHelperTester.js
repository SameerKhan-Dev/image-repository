
const databaseHelper = require('./databaseHelpers');


// lets call the database function
databaseHelper.randomFunction()
.then(result => {
  
    console.log("createdDatabase!")
    
})
.catch(err => console.log("Error!", err));

