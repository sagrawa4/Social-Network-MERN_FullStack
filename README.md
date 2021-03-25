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