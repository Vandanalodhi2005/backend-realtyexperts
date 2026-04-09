const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const contactRoutes = require('./routes/contact');
const investmentRoutes = require('./routes/investments');
const projectRoutes = require('./routes/projects');
const submittedPropertyRoutes = require('./routes/submittedProperties');

app.use('/api/admin', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/submitted-properties', submittedPropertyRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
