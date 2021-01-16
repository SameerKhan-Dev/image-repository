
const databaseHelper = require('./databaseHelpers');

/*
// lets call the database function
databaseHelper.randomFunction()
.then(result => {
  
    console.log("createdDatabase!")
    
})
.catch(err => console.log("Error!", err));
*/
// lets call the database function
databaseHelper.getUserData(1)
.then(result => {
  
    console.log("result from database is:", result);
    
})
.catch(err => console.log("Error!", err));

databaseHelper.getResourceData(1)
.then(result => {
  
    console.log("result from database from images Table is:", result);
    
})
.catch(err => console.log("Error!", err));