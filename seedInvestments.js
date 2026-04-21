const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Investment = require('./models/Investment');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const investmentTestData = [
  {
    title: 'Premium Industrial Land in Noida',
    description: 'Excellent industrial land opportunity in Noida. Strategic location near Delhi border with excellent connectivity via NH-24. Perfect for manufacturing, warehousing, or logistics operations. 24/7 security and fully developed infrastructure.',
    location: 'Sector 63, Noida',
    city: 'Noida',
    area: 1200,
    areaUnit: 'sq.ft',
    pricePerUnit: 34000,
    totalPrice: 4080000,
    landType: 'industrial',
    status: 'upcoming',
    highlights: [
      'Near Delhi-Meerut Expressway',
      '24/7 Security & Surveillance',
      'Ready Infrastructure',
      'Flexible Payment Terms',
      'Easy Bank Financing',
      'High ROI Potential'
    ],
    nearbyPlaces: 'Noida City Center, Ecotech Extn, Greater Noida',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      'https://images.unsplash.com/photo-1585399866471-0f06cc4ce795?w=800'
    ],
    mapUrl: 'https://maps.google.com/?q=Noida+Sector+63'
  },
  {
    title: 'Residential Agricultural Land - Greater Noida',
    description: 'Beautiful agricultural land in Greater Noida with residential potential. Recently converted to residential use zone. Ideal for building farmhouse or residential complex. Plot is well-connected with main roads and utilities.',
    location: 'Greater Noida West',
    city: 'Greater Noida',
    area: 2500,
    areaUnit: 'sq.yard',
    pricePerUnit: 25000,
    totalPrice: 6250000,
    landType: 'agricultural',
    status: 'available',
    highlights: [
      'Residential Zone Approved',
      'Excellent Road Access',
      'Water & Electricity Available',
      'Near Metro Station',
      'Appreciating Area',
      'Flexible Ownership'
    ],
    nearbyPlaces: 'Greater Noida West Station, Ecotech City, GN Extn',
    images: [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
      'https://images.unsplash.com/photo-1500382017468-6049ee94f563?w=800',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
    ],
    mapUrl: 'https://maps.google.com/?q=Greater+Noida+West'
  },
  {
    title: 'Commercial Plaza Land - Delhi NCR',
    description: 'Premium commercial land perfect for shopping mall or office complex development. High footfall location with excellent visibility. All utility connections available. Investment grade commercial property.',
    location: 'Dwarka, Sector 21',
    city: 'Delhi',
    area: 5000,
    areaUnit: 'sq.ft',
    pricePerUnit: 85000,
    totalPrice: 42500000,
    landType: 'commercial',
    status: 'available',
    highlights: [
      'Prime Commercial Zone',
      'High Visibility Location',
      'All Utilities Connected',
      'Easy Accessibility',
      'High ROI Guaranteed',
      'Commercial Ready'
    ],
    nearbyPlaces: 'Dwarka Metro, DLF Mall, ITC Grand Bharat',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1487930591697-ef277dbe2e06?w=800'
    ],
    mapUrl: 'https://maps.google.com/?q=Dwarka+Sector+21+Delhi'
  },
  {
    title: 'Mixed-Use Development Land - Gurgaon',
    description: 'Versatile land perfect for mixed-use development including residential, commercial, and retail components. Strategic location in the heart of Gurgaon. Prime investment opportunity with excellent development potential.',
    location: 'Sector 88',
    city: 'Gurgaon',
    area: 8000,
    areaUnit: 'sq.yard',
    pricePerUnit: 120000,
    totalPrice: 96000000,
    landType: 'mixed',
    status: 'available',
    highlights: [
      'Multi-Use Zoning',
      'Integrated Development Potential',
      'Growing Micro Market',
      'Excellent Connectivity',
      'Premium Investor Base',
      'Government Support'
    ],
    nearbyPlaces: 'Golf Course Road, MG Road, Artemis Hospital',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
      'https://images.unsplash.com/photo-1508098682722-e3c76f4f0e6f?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    mapUrl: 'https://maps.google.com/?q=Gurgaon+Sector+88'
  },
  {
    title: 'Residential Plot Development - Faridabad',
    description: 'Ready for possession residential plots in an approved society in Faridabad. Modern amenities and green spaces. Perfect for individual buyers or developers. Payment plans available.',
    location: 'Sector 31',
    city: 'Faridabad',
    area: 450,
    areaUnit: 'sq.yard',
    pricePerUnit: 35000,
    totalPrice: 1575000,
    landType: 'residential',
    status: 'available',
    highlights: [
      'DTCP Approved',
      'Modern Infrastructure',
      'Green Spaces',
      'Community Facilities',
      'Loan Available',
      'Ready Possession'
    ],
    nearbyPlaces: 'Sector 31 Metro, City Center, NIT',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45a003fc3ce1?w=800',
      'https://images.unsplash.com/photo-1480074568153-71b99cc5d4d7?w=800',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
    ],
    mapUrl: 'https://maps.google.com/?q=Faridabad+Sector+31'
  }
];

const seedInvestments = async () => {
  try {
    await connectDB();
    console.log('Database connected...');

    // Optional: Clear existing investments (uncomment if you want to reset)
    // await Investment.deleteMany({});
    // console.log('Cleared all existing investments');

    // Insert new investments
    const createdInvestments = await Investment.insertMany(investmentTestData);
    console.log(`✅ Successfully created ${createdInvestments.length} investment records`);
    
    createdInvestments.forEach((inv, idx) => {
      console.log(`   ${idx + 1}. ${inv.title} (${inv.landType}) - ₹${inv.totalPrice.toLocaleString()}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedInvestments();
