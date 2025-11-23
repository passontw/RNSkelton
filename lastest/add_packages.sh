#!/bin/bash

echo "移除 package-lock.json"
rm -f package-lock.json

echo "安裝基礎依賴"
yarn install

echo "新增 Redux 相關套件..."
yarn add @reduxjs/toolkit react-redux redux-thunk redux-saga redux-devtools-expo-dev-plugin

echo "新增其他套件..."
yarn add flux-constants yup color react-native-vector-icons react-native-modal-overlay react-native-config

echo "使用 expo install 安裝 React Native 相關套件（確保版本相容）..."
npx expo install react-native-safe-area-context react-native-svg

echo "新增開發套件..."
yarn add -D babel-plugin-root-import

echo "修復套件版本相容性..."
npx expo install --fix

echo "套件安裝完成！"
