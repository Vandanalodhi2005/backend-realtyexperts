const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars from the correct path
dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
    try {
        await connectDB();

        // Remove all existing admins to ensure only this one exists
        await Admin.deleteMany({});
        console.log('Cleared all existing admins');

        const admin = new Admin({
            username: 'trx.in',
            password: 'Krishna@123'
        });
        await admin.save();
        console.log('Admin User Created Successfully: trx.in / Krishna@123');
        
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
