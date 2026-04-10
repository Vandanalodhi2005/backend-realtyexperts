const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');
const Contact = require('./models/Contact');
const Investment = require('./models/Investment');
const Project = require('./models/Project');
const SubmittedProperty = require('./models/SubmittedProperty');

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');
        
        const totalProperties = await Property.countDocuments();
        console.log('totalProperties:', totalProperties);
        const availableProperties = await Property.countDocuments({ status: 'available' });
        console.log('availableProperties:', availableProperties);
        const totalContacts = await Contact.countDocuments();
        console.log('totalContacts:', totalContacts);
        const unreadContacts = await Contact.countDocuments({ status: 'unread' });
        console.log('unreadContacts:', unreadContacts);
        const totalInvestments = await Investment.countDocuments();
        console.log('totalInvestments:', totalInvestments);
        const totalProjects = await Project.countDocuments();
        console.log('totalProjects:', totalProjects);
        const totalSubmissions = await SubmittedProperty.countDocuments();
        console.log('totalSubmissions:', totalSubmissions);
        const pendingSubmissions = await SubmittedProperty.countDocuments({ status: 'pending' });
        console.log('pendingSubmissions:', pendingSubmissions);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentProperties = await Property.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        console.log('recentProperties:', recentProperties);

        process.exit(0);
    } catch (err) {
        console.error('TEST ERROR:', err);
        process.exit(1);
    }
};

test();
