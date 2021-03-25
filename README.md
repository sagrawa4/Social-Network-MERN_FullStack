# To RUN
- npm run server

# To establish mongodb connection
- All db connection details is in db.js

# server.js
- This is the main file to make requests to each routes.

# Routers are User,Auth,Profile and Posts

# UserSchema is created under models in User.js
- All the models starts with Capital letters

# Registration request(Post) to api/users
- make sure to initialize middleware in server.js to console.log req.body

# Initialize Middleware
- app.use(express.json({ extended: false}));

# Validation of user request
- importing require('express-validator') is needed to validate if a req.body is valid or not.
- router.post takes in 3 field: router.post('/', [check('name', 'Name is required').not().isEmpty()],(req,res) => {..}
- next we check if a call request to validationResult return errors
- if errors are present, we want to generate a 404 response.
- if on validation req, no error is present,we destructor the body content:  
    const { name, email, password} = req.body;
-Further, we need to check if user is alreday prent in databse or not, we can do this by checking the mail id of user.
- Get users gravatar
- Encrypt password using bcrypt

# To Return json web token : to get user loggedin right way from frontend.
- Create jwtSecret in db.js
- import the config
- Create a payload that takes in the user id
- Use jwt.sign(), to generate a token