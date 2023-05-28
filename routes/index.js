var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let counter = 0;
router.get('/test', function(req,res,next){
  res.send('this is some text ' + counter);
  counter++;
  console.log('this is a message ' + counter);
});

router.get('/apage', function(req, res,next){
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

router.get('/aposts', function(req, res,next){
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

let postdata = [{
  upvotes: 123,
  title: 'this is a post',
  url: '#',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.',
  tags: ['Tag1', 'Tag2'],
  timestamp: new Date().toISOString()
},
{
  upvotes: 123,
  title: 'this is a another post',
  url: '#',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.',
  tags: ['Tag1', 'Tag2'],
  timestamp: new Date().toISOString()
}];

router.get('/posts.json', function(req, res,next){


  res.json(postdata);
});


router.post('/newpost', function(req, res,next){
  let post = req.body;
  post.upvotes = 0;
  post.url = '#',
  post.timestamp = new Date().toISOString();

  postdata.push(post);

  /* terminate request */
  res.end();
});

module.exports = router;
