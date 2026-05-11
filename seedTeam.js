const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TeamMember = require('./models/TeamMember');

dotenv.config();

const teamMembers = [
  {
    name: "Ashu Tiwari",
    role: "GM Sales & Marketing",
    bio: "Driving strategic growth and market presence through leadership excellence.",
    image: "/about/ashu.jpeg",
    order: 1
  },
  {
    name: "Pragya Tiwari",
    role: "HR Head & Admin",
    bio: "Fostering a culture of excellence and operational efficiency.",
    image: "/about/pragya.jpeg",
    order: 2
  },
  {
    name: "Kundan Jha",
    role: "GM Sales",
    bio: "Expertise in high-value property transactions and bespoke client relations.",
    image: "/about/kundan.jpeg",
    order: 3
  },
  {
    name: "Prashant Chaudhary",
    role: "GM Sales",
    bio: "Committed to delivering unparalleled real estate solutions and client satisfaction.",
    image: "/about/prashant.jpeg",
    order: 4
  }
];

const seedTeam = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trx');
    console.log('Connected to MongoDB');
    
    await TeamMember.deleteMany({});
    console.log('Cleared existing team members');
    
    await TeamMember.insertMany(teamMembers);
    console.log('Team members seeded successfully');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding team:', error);
    process.exit(1);
  }
};

seedTeam();
