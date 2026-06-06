#!bin/bash

echo "installing dependencies..."
cd StoreService && sudo pnpm install
cd ../StoreUI && sudo pnpm install

echo "building artifacts..."
cd ../StoreUI && sudo pnpm run build
cd ../StoreService && sudo mkdir -p uploads
sudo chmod -R 777 uploads

echo "Generate prisma client..."
cd ../StoreService && sudo pnpm prisma generate