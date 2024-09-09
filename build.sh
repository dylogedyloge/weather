#!/bin/bash

# Build React app
npm run build

# Build landing page
npm run build:landing

# Copy landing page files to build directory
cp landing-page/index.html build/
cp landing-page/styles.css build/
cp landing-page/dist/main.js build/