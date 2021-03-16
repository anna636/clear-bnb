const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
const crypto = require('crypto');

module.exports = function (app, models) {

  const User = models.users;
  const secret = 'H!#45i12ip154?31!+';

  app.use(session({
    secret: 'very secret one', // choose your own...
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new connectMongo({ mongooseConnection: mongoose.connection })
  }));

  // Route to register a user
  app.post('/api/register', async (req, res) => {
    // Encrypt password
    const hash = crypto.createHmac('sha256', secret)
      .update(req.body.password).digest('hex');
    // Create new user
    let user = new User({ ...req.body, password: hash });
    // NOTE: This system is unsafe since you can 
    // choose your own role on registration!
    try {
      await user.save();
    } catch (err) {
      res.json('error!')
      return;
    }

    res.json({ success: true });
  });

  // Login
  app.post('/api/login', async (req, res) => {
    // note: req.session is unique per user/browser
    if (req.session.user) {
      res.json({ error: 'Someone is already logged in' });
      return;
    }
    // Encrypt password
    const hash = crypto.createHmac('sha256', secret)
      .update(req.body.password).digest('hex');
    // Search for user
    let user = await User.findOne({ email: req.body.email, password: hash });
    if (user) {
      // succesful login, save the user to the session object
      req.session.user = user;
      user = (({ fullName, email, _id }) => ({ fullName, email, _id }))(user) //create a  new object with only a subset of user properties
      res.json({ success: 'Logged in', user });
    }
    else {
      res.json({ error: 'No match.' });
    }
  });

  // Logout
  app.delete('/api/logout', (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      res.json({ success: 'Logged out' });
    }
    else {
      res.json({ error: 'Was not logged in' });
    }
  });

  // Check if logged in
  app.get('/api/whoami', (req, res) => {
    if (req.session.user) {
      let user = { ...req.session.user };
      delete user.password; // remove password in answer
      res.json(user);
    }
    else {
      res.json({ error: 'Not logged in' });
    }
  });

  // Example rotues and roles - ACL Access Control List
  app.get('/api/bird-admin-page', (req, res) => {
    if (req.session.user && req.session.user.role === 'bird admin') {
      res.json({ secret: 'The secret data, only for bird admins.' })
    }
    else {
      res.json({ error: 'No rights to see this route!' });
    }
  });

  // Example rotues and roles - ACL Access Control List
  app.get('/api/cat-admin-page', (req, res) => {
    if (req.session.user && req.session.user.role === 'cat admin') {
      res.json({ secret: 'The secret data, only for cat admins.' })
    }
    else {
      res.json({ error: 'No rights to see this route!' });
    }
  });

} //end of module.exports