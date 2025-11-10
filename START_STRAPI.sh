#!/bin/bash

# Quick start script for Strapi with Node 20

echo "🚀 Starting Strapi CMS in development mode..."
echo ""

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 20
nvm use 20

echo ""
echo "📊 Admin panel will be available at: http://localhost:1337/admin"
echo "🔌 API will be available at: http://localhost:1337/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start Strapi
npm run develop
