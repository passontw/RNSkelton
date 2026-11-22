#!/bin/bash

echo "移除 package-lock.json"
rm -f package-lock.json

echo "安裝基礎依賴"
yarn install

# Redux 相關（版本需同步升級，不可單獨升級）
# 追蹤 issues：#7（redux）、#2（redux-persist）、#11（redux-saga）
echo "新增 Redux 相關套件..."
yarn add react-redux@^9.3.1 redux@^5.0.1 redux-saga@^1.6.0 redux-persist@^6.0.0 redux-devtools-expo-dev-plugin@^2.0.0

# Expo 管理套件（版本由 expo install 自動配對，不手動指定）
# 追蹤 issues：#1（Expo SDK 升級）
echo "安裝 AsyncStorage（redux-persist 在 RN 的儲存引擎）..."
npx expo install @react-native-async-storage/async-storage

echo "安裝 SecureStore（token 安全儲存，使用 iOS Keychain / Android Keystore）..."
npx expo install expo-secure-store

# 其他套件
# 注意事項：
# - flux-constants 已移除，改用 TypeScript as const（issue #12）
# - react-native-modal-overlay 已移除，改用 react-native-modal（issue #3）
# - babel-plugin-root-import 已移除，改用 tsconfig paths（issue #4）
# - react-native-vector-icons 已移除，模板使用 @expo/vector-icons（Expo SDK 內建，issue #5）
# - color v5 為 ESM only，注意 Metro 相容性（issue #8）
# - yup v1 有 breaking changes（issue #9）
echo "新增其他套件..."
yarn add yup@^1.7.1 color@^5.0.3 react-native-modal@^2.2.0 react-native-config@^1.7.2

echo "使用 expo install 安裝 React Native 相關套件（確保版本相容）..."
npx expo install react-native-safe-area-context react-native-svg

echo "修復套件版本相容性..."
npx expo install --fix

echo "套件安裝完成！"
echo ""
echo "未解決的追蹤 issues（需手動處理）："
echo "  #1  Expo SDK 升級 52 → 58（React 18 → 19，Node 22+ 環境）"
echo "  #6  TypeScript 5 → 7 breaking changes"
echo "  #8  color v5 需確認 Metro 設定啟用 unstable_enablePackageExports"
