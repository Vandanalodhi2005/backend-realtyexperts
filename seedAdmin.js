const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await Admin.findOne({ username: 'vandana' });

        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new Admin({
            username: 'vandana',
            password: 'vandana24'
        });

        await admin.save();

        console.log('Admin User Created Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
