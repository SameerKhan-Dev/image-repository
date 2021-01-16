
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

/*
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
*/
/*
databaseHelper.addResource(2, 'Boat', 'www.filepath.com/', 'image of best boat')
.then(result => {
  
    console.log("result from database from images Table is:", result);
    
})
.catch(err => console.log("Error! Here ub addResource", err));
*/
/*
databaseHelper.addUser('Jordan', 'jordan@basketball.com', 'basketball')
.then(result => {
  
    console.log("result from addUser is:", result);
    
})
.catch(err => console.log("Error! Here ub addResource", err));
*/

databaseHelper.getAllResources()
.then(result => {
  
    console.log("result from getAllResources is: ", result);
    
})
.catch(err => console.log("Error! Here ub addResource", err));
