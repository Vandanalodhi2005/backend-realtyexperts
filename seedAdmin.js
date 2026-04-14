const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        let admin = await Admin.findOne({ username: 'trx.in' });

        if (admin) {
            console.log('Admin already exists. Updating password...');
            admin.password = 'Krishna@123';
            await admin.save();
            console.log('Admin password updated successfully');
        } else {
            admin = new Admin({
                username: 'trx.in',
                password: 'Krishna@123'
            });
            await admin.save();
            console.log('Admin User Created Successfully');
        }
        process.exit();
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
