import express from 'express';
import open from 'open';

// environtment variable for heroku
const PORT = process.env.PORT || 3000;

// creating our app
// calling express library
const app = express();

// using express middleware for redirectiong openweathermap traffic from https to http
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

// telling, which folder we wanna run
app.use(express.static('public'));

// starting the server using port and callback function
app.listen(PORT, () => {
  console.log(`Express server is up on port 3000`);
  open(`http://localhost:${PORT}`);
});
