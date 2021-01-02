
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs('access.log', {
//     interval: '1d',
//     path: logDirectory
// });
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'blahsomething',
    db: 'development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'webdev0775@gmial.com',
            pass: 'abhi@8800w'
        }
    },
    google_client_id: '529671098897-8iut1jqqr9ro3ur2a9vfpao717n4stjs.apps.googleusercontent.com',
    google_client_secret: 'xV5WaoE5N28olB6tXPVcV6Bp',
    callbackURL: "http://localhost:4000/users/auth/google/callback",
    jwt_secret: 'Db9pV7yvkkMvDOqwUey4rbxwoU07TEKH',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);