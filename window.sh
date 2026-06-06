#!bin/bash

echo "installing dependencies..."
cd StoreService &&  pnpm install
cd ../StoreUI &&  pnpm install

echo "building artifacts..."
cd ../StoreUI &&  pnpm run build
cd ../StoreService &&  mkdir -p uploads