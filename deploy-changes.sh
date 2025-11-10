#!/bin/bash
set -e

cd /Users/richardhopp/Desktop/Tools/CMS

echo "Removing git lock file if exists..."
rm -f .git/index.lock

echo "Staging all changes..."
git add -A

echo "Showing status..."
git status

echo ""
echo "Ready to commit!"
