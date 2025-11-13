#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Initializing upload directories...');
console.log('Environment:', process.env.NODE_ENV);

// Create uploads directory if in production and using persistent disk
if (process.env.NODE_ENV === 'production') {
  const uploadsDir = '/opt/render/project/data/uploads';

  console.log('📂 Checking directory:', uploadsDir);

  try {
    if (!fs.existsSync(uploadsDir)) {
      console.log('📁 Creating uploads directory...');
      fs.mkdirSync(uploadsDir, { recursive: true });

      // Set permissions
      fs.chmodSync(uploadsDir, 0o755);

      console.log('✅ Uploads directory created successfully');
      console.log('   Path:', uploadsDir);
      console.log('   Permissions: 755');
    } else {
      console.log('✅ Uploads directory already exists');

      // Verify it's writable
      fs.accessSync(uploadsDir, fs.constants.W_OK);
      console.log('✅ Directory is writable');
    }
  } catch (error) {
    console.error('❌ Error creating uploads directory:', error.message);
    process.exit(1);
  }
} else {
  console.log('📝 Development mode - using local uploads directory');
  const localUploadsDir = path.join(__dirname, '../public/uploads');

  if (!fs.existsSync(localUploadsDir)) {
    console.log('📁 Creating local uploads directory...');
    fs.mkdirSync(localUploadsDir, { recursive: true });
    console.log('✅ Local uploads directory created');
  }
}

console.log('✅ Upload directories initialization complete\n');
