#!bin/bash

echo "installing dependencies..."
cd StoreService && npm install
cd ../StoreUI && npm install

echo "building artifacts..."
cd ../StoreUI && npm run build
cd ../StoreService && mkdir -p uploads
chmod -R 777 uploads

echo "Generate prisma client..."
cd ../StoreService && npm run prisma:generate
