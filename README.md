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

# Sending the token back to authenticate an access protected route
- Create a custom Middleware - file name auth.js
- Middle ware is a function with three paras(req,res,next)
- we first check if the token is present or not in the req.header
-if not, 401 generated
-if yes, check if it is valid token, if not 401 is generted
-if a valid token, can be checked using jwt.verify(token, config.get('jwtSecret));
- set the req.user as decoded.user

# Authenticating user token
- when a user make a get reg at /api/auth with token,
- routes auth api is called.
- it findById(req.user.id) and returns the res with user info

# To Register user
- Make posts request to api/users.. Registering the user, with name,email and password
- token is recived

# Creating a Middleware to verify the JWT
- auth middleware is created and the token is verfied.

# Use the auth middleware in auth api 
- making a Get req to api/auth without token returns no token error.
- now making a Get req to api/auth with valid token will return the user data from User model except password.

# Next to login the user.
- in api/auth, make a post request with username and password. 
- Use bcrypt to check the password validation.
- if incorrect, 404 error else return token.

# Get current users profile
- get req to api/profile/me
- check if the profile exists, if no generate 500 

# Post or generate profile for a user
-


# Adding POSTs 
- Create a Post Model(create a Schema)