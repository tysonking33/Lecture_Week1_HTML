var express = require('express');
var router = express.Router();

const CLIENT_ID = 'MY-CLIENT-ID.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let counter = 0;

// Send some text
router.get('/test', function (req,res,next) {
  res.send('This is some text '+counter);
  counter++;
  console.log('This is a message: '+counter);
});

// Send an entire webpage
router.get('/apage', function(req,res,next){

  let postdata = `<div class="post">

      <div class="votes">
          <button type="button">+</button>
          <p><span class="count">123</span><br />votes</p>
          <button type="button">-</button>
      </div>
      <div class="content">
          <h3><a href="post">This is a post</a></h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.</p>
          <span class="tag">Tag1</span><span class="tag">Tag2</span><span class="date">Date blah</span>
      </div>

  </div>`;

  let pagedata = `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>WDC Overflow</title>
          <link rel="stylesheet" href="stylesheets/style.css" >
          <script src="javascripts/page.js"></script>
      </head>
      <body>
          <header>
              <button type="button">Signup</button>
              <button type="button">Login</button>
              <img class="logo" src="images/logo.png" alt="WDC Overflow" />
              <ul>
                  <li>Products</li>
                  <li>Customers</li>
                  <li>Use Cases</li>
              </ul>
          </header>
          <main>

              <div class="search">
                  <button type="button" class="right">Ask Question</button>
                  <h2>Search Results</h2>
                  <button type="button" class="right">Search</button>
                  <input type="text" name="search" />
              </div>

              ${postdata}

              ${postdata}

              ${postdata}

              ${postdata}


          </main>
          <section>
              <h2>Ask a Question</h2>
              <input id="post-title" type="text" placeholder="Title" /><br />
              <textarea id="post-content" placeholder="Details..." ></textarea><br />
              <input id="post-tags" type="text"  placeholder="Tags" /><br />
              <button type="button" onclick="createPost();">Create Post</button>
          </section>
          <footer>
              <h4>This is a footer</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar. </p>
          </footer>
      </body>
  </html>`;

  res.send(pagedata);
});

// Send a single HTML post
router.get('/apost', function(req,res,next){

  let postdata = `<div class="post">

      <div class="votes">
          <button type="button">+</button>
          <p><span class="count">123</span><br />votes</p>
          <button type="button">-</button>
      </div>
      <div class="content">
          <h3><a href="post">This is a post</a></h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.</p>
          <span class="tag">Tag1</span><span class="tag">Tag2</span><span class="date">Date blah</span>
      </div>

  </div>`;

  res.send(postdata);
});

let users = {
  bob: {password: 'password'},
  alice: {password: 'foobar'}
};

router.post('/login', async function(req,res,next){

    if ('client_id' in req.body && 'credential' in req.body){


        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        //console.log(payload['sub']);
        console.log(payload['email']);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];

        req.pool.getConnection(function(cerr, connection) {
          if (cerr) {
            res.sendStatus(500);
            return;
          }

          let query = "SELECT id,handle,avatar,email,display_name FROM Users WHERE email = ?";

          connection.query(query, [payload['email']],function(qerr, rows, fields) {

            connection.release();

            if (qerr) {
              res.sendStatus(500);
              return;
            }

            console.log(JSON.stringify(rows));

            if (rows.length > 0){
              // There is a user
              [req.session.user] = rows;

              res.json(req.session.user);

            } else {
              // No user
              res.sendStatus(401);
            }

          });

        });


    } else if ('username' in req.body && 'password' in req.body) {


      req.pool.getConnection(function(cerr, connection) {
        if (cerr) {
          res.sendStatus(500);
          return;
        }

        let query = "SELECT id,handle,avatar,email,display_name FROM Users WHERE handle = ? AND pass = ?";

        connection.query(query, [req.body.username,req.body.password],function(qerr, rows, fields) {

          connection.release();

          if (qerr) {
            res.sendStatus(500);
            return;
          }

          console.log(JSON.stringify(rows));

          if (rows.length > 0){
            // There is a user
            [req.session.user] = rows;

            res.json(req.session.user);

          } else {
            // No user
            res.sendStatus(401);
          }

        });

      });

    } else {
      res.sendStatus(401);
    }

});

router.post('/signup', function(req,res,next){

  if ('username' in req.body && 'password' in req.body) {

    req.pool.getConnection(function(cerr, connection) {
      if (cerr) {
        res.sendStatus(500);
        return;
      }

      let query = `INSERT INTO Users (
                      handle,
                      pass,
                      avatar,
                      email,
                      display_name
                  ) VALUES (
                      ?,
                      ?,
                      NULL,
                      NULL,
                      ?
                  );`;

      connection.query(query, [req.body.username,req.body.password,req.body.username],function(qerr, rows, fields) {

        connection.release();

        if (qerr) {
          res.sendStatus(401);
          return;
        }

        res.end();

      });

    });

  } else {
    res.sendStatus(401);
  }

});

router.post('/logout', function(req,res,next){

  if ('username' in req.session){
    delete req.session.username;
    res.end();
  } else {
    res.sendStatus(403);
  }

});


router.post('/google_login', async function(req,res,next){

    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    //console.log(payload['sub']);
    console.log(payload['email']);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    res.redirect('/');


});


module.exports = router;
