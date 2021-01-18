# image-repository
This image repository webapp allows users to store private images on the cloud. It supports the following functionality:
  1. New user registration
  2. User login & logout
    - user information is store in a SQL database 
  3. User can upload image and specify title, description and tag the image
    - image information and other metadata is store in a SQL database 
    - images are stored on AWS S3
    - images are only accessible by the owner of the image
  4. View all images belonging to the authenticated user
  5. Search for images based on title or tag

## Download & See the Demo Video Now!
https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/demo.webm

## Tech Stack
### Backend: 
  1. Node JS
  2. Express
  3. Postgres SQL as database
  4. S3 to store images in the cloud
### Frontend:
  1. HTML
  2. CSS
  3. Javascript
  
## Setup
  1. Install Node (this repo was tested on v10.20.1)
  2. Setup Postgres SQL DB on localhost
      1. Create DB with name `imagerep`
      2. Setup tables using `databaseSchema.sql` script by using the following command: `psql --file=$repo/database/databaseSchema.sql`
  3. Create S3 bucket that is private
  4. Create IAM user with access to read and write to S3 bucket and enable programmatic access for user
  5. Add SQL DB & AWS access parameters to `creds.js`
  6. run `npm install`to install node dependencies
  7. run `node server.js` to run server
  
## Future Improvements
This section higlights areas where I would like to improve the app in the future.
  1. Improve unit testing
  2. Move CSS from html files to dedicated CSS files
  3. Improving styling of the content
  4. Secure user password using bcrypt instead of storing raw password in the database
  5. Investigate how to host SQL DB on the cloud using Amazon RDS
  6. Research ways to improve image load times
  7. Generate and add thumbnails for images in list view
  
## Screenshots of the App
### Unauthenticated Home Page
!["Unauthenticated Home Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/unauthenticated-homepage.png)

### Registration Page
!["Registration Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/registration-page.png)

### Login Page
!["Login Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/login-page.png)

### Upload Image Page
!["Upload Image Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/upload-image-page.png)

### Image List Page
!["Image List Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/user-image-list-page.png)

### Image View Page
!["Image View Page"](https://github.com/SameerKhan-Dev/image-repository/blob/main/docs/view-image-page.png)


