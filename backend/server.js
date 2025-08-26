require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.model('Contact', contactSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  liveLink: String,
  screenshot: String, // URL or path (e.g., Cloudinary URL)
  tech: [String], // Array of tech (e.g., ["React", "Node.js"])
  outcome: String, // e.g., "Reduced load time by 40%"
});
const Project = mongoose.model('Project', projectSchema);

// Skills Schema
const skillSchema = new mongoose.Schema({
  name: String,
  icon: String, // e.g., 'FaReact' or icon URL
  category: String, // e.g., 'Frontend'
  level: String, // e.g., 'Intermediate'
  usage: String, // e.g., 'Built 3 SPAs'
});
const Skill = mongoose.model('Skill', skillSchema);

// Middleware for Admin Authentication (simple API key)
const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) { // Add ADMIN_API_KEY in .env
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Contact Form Endpoint (public)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: '✅ Message saved & Email sent' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: '❌ Server error, please try again later' });
  }
});

// Get all projects (public)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ error: '❌ Error fetching projects' });
  }
});

// Add project (admin only)
app.post('/api/projects', adminAuth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(200).json({ message: '✅ Project added' });
  } catch (error) {
    console.error('❌ Error adding project:', error);
    res.status(500).json({ error: '❌ Error adding project' });
  }
});

// Delete project (admin only)
app.delete('/api/projects/:id', adminAuth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: '✅ Project deleted' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ error: '❌ Error deleting project' });
  }
});

// Get all skills (public)
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error('❌ Error fetching skills:', error);
    res.status(500).json({ error: '❌ Error fetching skills' });
  }
});

// Add skill (admin only)
app.post('/api/skills', adminAuth, async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.status(200).json({ message: '✅ Skill added' });
  } catch (error) {
    console.error('❌ Error adding skill:', error);
    res.status(500).json({ error: '❌ Error adding skill' });
  }
});

// Delete skill (admin only)
app.delete('/api/skills/:id', adminAuth, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: '✅ Skill deleted' });
  } catch (error) {
    console.error('❌ Error deleting skill:', error);
    res.status(500).json({ error: '❌ Error deleting skill' });
  }
});

// Start server
app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);