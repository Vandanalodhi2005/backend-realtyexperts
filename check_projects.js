const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const checkProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Project.countDocuments();
        console.log(`Total projects in database: ${count}`);
        const projects = await Project.find({}, 'title type');
        console.log('Projects list:', projects);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkProjects();
