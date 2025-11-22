#!/bin/bash

PROJ_NAME=$1

if [ -z "$PROJ_NAME" ]; then
  echo "錯誤: 請提供專案名稱"
  echo "使用方式: ./init_project.sh <專案名稱>"
  exit 1
fi

echo "初始化 React Native 專案: $PROJ_NAME"
npx create-expo-app $PROJ_NAME --example with-react-navigation
cd $PROJ_NAME

echo "remove node_modules folder"
rm -rf node_modules

echo "remove package-lock.json"
rm -f package-lock.json

echo "yarn install dependencies"
yarn install

echo "move files"
rm -rf src
mkdir src
cp -a -R ../template/* ./src/
# 只複製特定的隱藏檔案，避免複製 . 和 ..
if [ -f ../template/.gitignore ]; then
  cp ../template/.gitignore ./src/
fi
if [ -f ../template/.env.example ]; then
  cp ../template/.env.example ./src/
fi
rm -f src/App.js

echo "安裝套件"
../lastest/add_packages.sh

cd ..

echo "提升專案檔案到當前目錄"
# 使用 find 來移動所有檔案（包括隱藏檔案），但排除 . 和 ..
shopt -s dotglob
mv $PROJ_NAME/* ./ 2>/dev/null || true
shopt -u dotglob

echo "清理無用檔案和資料夾"
rm -rf ./$PROJ_NAME ./lastest ./template ./README.md ./docs

echo "初始化專案 $PROJ_NAME 完成！"
echo "專案已準備就緒，所有檔案已提升到當前目錄"