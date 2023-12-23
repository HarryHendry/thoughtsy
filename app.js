// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




const posts = [
    { id: 1, title: 'Welcome to Thoughtsy', content: 'Often we can get stuck in our own heads and it can be hard to get our focus back. The idea behind thoughtsy is to recognise when your mind starts to wonder then write(type) down your thoughts. Realise your mind is drifting, quickly self-reflect, then continue with your day!' },
    { id: 2, title: 'The Importance of Writing', content: 'Expressing your thoughts through writing can be a powerful and cathartic experience with numerous benefits for your overall well-being. Putting pen to paper, or fingers to keyboard, allows you to articulate and organize your thoughts, providing clarity to complex ideas. This process not only helps in self-reflection but also promotes emotional release, reducing stress and anxiety. Writing about your thoughts fosters self-awareness, enabling you to gain insights into your own motivations, desires, and fears. Moreover, it serves as a timeless record of your personal journey, offering a valuable perspective when revisited in the future. Whether in the form of a journal, blog, or creative writing, the act of writing empowers you to explore, understand, and appreciate the intricacies of your own mind, contributing to a healthier and more mindful lifestyle' },
    { id: 3, title: 'Self Analysis is Powerful', content: 'Engaging in self-analysis is a transformative practice that holds immense benefits for personal growth and development. Taking the time to introspect allows you to delve into the layers of your own psyche, understanding your strengths, weaknesses, and patterns of behavior. Through self-analysis, you gain a heightened sense of self-awareness, which is crucial for making informed decisions and navigating lifes challenges. It provides an opportunity for constructive self-critique, fostering continuous improvement and resilience. Moreover, self-analysis enables you to identify and break free from limiting beliefs, paving the way for a more positive mindset. Embracing self-analysis is akin to holding up a mirror to your inner self, promoting authenticity and alignment with your true values. Ultimately, the journey of self-analysis is an empowering one, leading to greater self-acceptance, improved relationships, and a more purposeful and fulfilling life.' },
    { id: 4, title: 'Growth is Knowing Yourself', content: 'Understanding oneself is a cornerstone of personal growth, offering a path to continuous self-improvement and fulfillment. Knowing yourself provides a solid foundation upon which you can build meaningful goals and aspirations. By recognizing your strengths, weaknesses, and core values, you gain clarity on what truly matters to you, enabling more intentional decision-making. Self-awareness facilitates a deeper connection with your passions and purpose, guiding you towards pursuits that align with your authentic self. Additionally, knowing yourself fosters resilience in the face of challenges, as you can draw upon your strengths and confront areas for improvement. This self-awareness creates a framework for cultivating healthy relationships, as you bring a genuine understanding of your needs and boundaries. Ultimately, the journey of knowing oneself is integral to personal growth, unlocking the potential for a more purposeful, balanced, and gratifying life.' },
  ];
  
  app.get('/', (req, res) => {
    res.render('index', { posts });
  });
  
  app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    res.render('post', { post });
  });
  
  app.get('/new', (req, res) => {
    res.render('new');
  });
  
  app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.redirect('/');
  });
  
  app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    res.render('edit', { post });
  });
  
  app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = {
      id: postId,
      title: req.body.title,
      content: req.body.content,
    };
    const index = posts.findIndex(p => p.id === postId);
    posts[index] = updatedPost;
    res.redirect('/');
  });
  
  app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);
    posts.splice(index, 1);
    res.redirect('/');
  });
  