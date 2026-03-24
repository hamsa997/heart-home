#!/bin/bash

# This script helps you configure your git remote with a Personal Access Token.
# Usage: sh setup-git.sh

echo "--- GitHub Authentication Helper ---"
echo "1. Go to https://github.com/settings/tokens"
echo "2. Generate a 'Classic' token with 'repo' scope."
echo ""

read -p "Enter your GitHub Username: " username
read -sp "Enter your Personal Access Token: " token
echo ""

# Set the new remote URL
git remote set-url origin "https://${username}:${token}@github.com/hamsa997/heart-home.git"

echo "Remote URL updated. Attempting to push..."
git push -u origin main
