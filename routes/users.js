var express = require('express');
var router = express.Router();

// Array storing data of our posts
let postdata = [{
  upvotes: 123,
  title: 'This is a post',
  url: '#',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.',
  tags: ['Tag1','Tag1'],
  timestamp: new Date().toISOString()
},
{
  upvotes: 123,
  title: 'This is another post',
  url: '#',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus, lorem non varius consequat, ipsum magna vestibulum lectus, et fringilla tellus augue id nisl. Donec tempus est a hendrerit ornare. Phasellus blandit est in malesuada interdum. Mauris finibus vehicula turpis vel lobortis. Phasellus tempor elit massa. Morbi vulputate leo a neque mollis varius. Donec ultricies aliquam vulputate. Nunc dapibus lectus a risus rutrum pulvinar.',
  tags: ['Tag1','Tag1'],
  timestamp: new Date().toISOString()
}];

// Sends the array in JSON format
router.get('/posts.json', function(req,res,next){
  res.json(postdata);
});

/////////////////////////////////////////////////////////////

router.use('/', function(req, res, next) {
  if (!('username' in req.session)){
    res.sendStatus(403);
  } else {
    next();
  }
});

/////////////////////////////////////////////////////////////

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/newpost', function(req,res,next){

  // Receive data from the client; we'll look more at post requests later this semester
  let post = req.body;
  /*
  Data from the client looks like
  {
    title: 'Some title',
    content: 'Some content',
    tags: ['Tag1','Tag2']
  }
  We need to add the remaining properties so it looks like:
  {
    upvotes: 123,
    title: 'Some title',
    url: '#',
    content: 'Some content',
    tags: ['Tag1','Tag1'],
    timestamp: "2023-03-21T04:30:00.000Z"
  }
  */
  post.upvotes = 0;
  post.url = '#';
  post.timestamp = new Date().toISOString(); // Use ISO format which can be universally interpreted

  // Add the new post to our array
  postdata.push(post);
  // Send confirmation that all is okay
  res.end();
});


module.exports = router;
