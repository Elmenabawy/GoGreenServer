const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const logging = require('./middlewares/logging');
const studentsRouter = require('./routes/Students');
const userRouter = require('./routes/User');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const consumptionRouter = require('./routes/Package');

const app = express();

// Set up session
app.use(
    session({
        secret: 'your secret key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using https
    })
);

// Connect to MongoDB
mongoose.connect('mongodb+srv://ahhossam68:c2RmScIUYX0H3gsw@cluster0.ihphmxf.mongodb.net/iti', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log('Connected to Database...');
    })
    .catch((err) => {
        console.log(err);
    });

// Enable CORS
app.use(cors());

// Use helmet to set Content Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'https://gogreenserver-1.onrender.com'],
            // Add other directives as needed based on your application's requirements
        },
    })
);

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware for logging
app.use(logging);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/Students', studentsRouter);
app.use('/api/Users', userRouter);
app.use('/api/login', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/package', consumptionRouter);

// Authentication middleware to protect routes
const authenticateUser = (req, res, next) => {
    if (req.session) {
        // User is authenticated, allow access to the route
        next();
    } else {
        // User is not authenticated, redirect to login page or handle accordingly
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Example route that requires authentication
app.get('/home.html', authenticateUser, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 50000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
