# 變更日誌

## [最新更新] - 2024-11-23

### 🔥 重大變更

#### 移除 Flipper 支援

由於 Flipper 需要原生建置，不適用於 Expo managed workflow 和 Expo Go，因此決定從專案中移除 Flipper 相關配置。

**移除內容：**
- ❌ `redux-flipper` 套件（從 add_packages.sh 移除）
- ❌ `react-native-flipper` 套件（從 add_packages.sh 移除）
- ❌ README.md 中的 Flipper 安裝和配置說明
- ❌ README.md 中的 Flipper idb 問題解決方案

**理由：**
- Flipper 需要 `expo prebuild` 並進行原生建置
- 與 Expo managed workflow 的理念不符
- Expo DevTools Plugin 已提供完整的 Redux 除錯功能
- 簡化專案配置，降低學習曲線

**替代方案：**
- ✅ 使用 **Expo Redux DevTools Plugin**（推薦，已預先配置）
- ✅ 使用 **Reactotron**（支援網路請求監控）
- ✅ 使用 **Redux DevTools Extension**（Web 專用）

**如果需要使用 Flipper：**
```bash
# 轉換為 bare workflow
npx expo prebuild

# 手動安裝 Flipper 套件
yarn add -D redux-flipper react-native-flipper

# 按照 Flipper 官方文檔配置
```

---

## [版本 1.0] - 2024-11-23

### ✨ 新增功能

#### 1. 整合 Expo Redux DevTools Plugin

專案現在預設整合 Expo Redux DevTools Plugin，提供開箱即用的 Redux 除錯功能。

**新增檔案：**
- `docs/expo-redux-devtools.md` - 完整的使用指南和最佳實踐

**修改檔案：**
- `template/navigation/store/configureStore.ts` - 添加 `devToolsEnhancer` 配置
- `lastest/add_packages.sh` - 添加 `redux-devtools-expo-dev-plugin` 套件
- `README.md` - 更新 Redux DevTools 章節，添加 Expo DevTools 說明

**主要特點：**
- ✅ 零配置，初始化專案後即可使用
- ✅ 終端啟動（`shift + m`），無需額外安裝應用程式
- ✅ 全平台支援（iOS、Android、Web）
- ✅ 完整的 Redux DevTools 功能（時間旅行、State 檢視、手動 Dispatch）
- ✅ 無需原生建置，純 JavaScript 方案

**使用方式：**
```bash
# 1. 啟動專案
npx expo start

# 2. 按 shift + m
# 3. 選擇 redux-devtools-expo-dev-plugin
# 4. 在瀏覽器中自動開啟 Redux DevTools
```

#### 2. 解決 Flipper idb 配置問題

新增完整的 idb 安裝和配置指南，解決使用 Flipper 連接 iOS 實體設備時的問題。

**更新檔案：**
- `README.md` - 新增「Flipper idb 設定問題」常見問題章節

**提供三種解決方案：**
1. 使用 Homebrew 和 pip3 安裝 idb（推薦）
2. 使用 pip 單獨安裝
3. 停用實體設備支援（僅使用模擬器）

**關鍵步驟：**
```bash
# 安裝 idb-companion
brew tap facebook/fb
brew install idb-companion

# 安裝 idb CLI
pip3 install fb-idb

# 設定 PATH
echo 'export PATH="$HOME/Library/Python/3.9/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 驗證安裝
which idb
idb list-targets
```

**常見故障排除：**
- 終端找不到 idb 命令的解決方法
- Flipper 找不到 idb 的配置步驟
- idb 無法連接設備的檢查清單

---

## 📋 完整變更清單

### 新增檔案
1. `/docs/expo-redux-devtools.md` - Expo Redux DevTools Plugin 完整使用指南
2. `/CHANGELOG.md` - 本變更日誌

### 修改檔案

#### 1. `/template/navigation/store/configureStore.ts`
**變更內容：**
- 添加 `import devToolsEnhancer from 'redux-devtools-expo-dev-plugin'`
- 將 `devTools` 設為 `false`
- 添加 `enhancers` 配置使用 `devToolsEnhancer()`
- 更新註解說明使用方式

**影響：**
- 所有透過初始化腳本創建的新專案都會自動包含 Expo DevTools 配置

#### 2. `/lastest/add_packages.sh`
**變更內容：**
- 在 Redux 相關套件安裝命令中添加 `redux-devtools-expo-dev-plugin`

**變更前：**
```bash
yarn add @reduxjs/toolkit react-redux redux-thunk redux-saga
```

**變更後：**
```bash
yarn add @reduxjs/toolkit react-redux redux-thunk redux-saga redux-devtools-expo-dev-plugin
```

**影響：**
- 初始化專案時自動安裝 Expo DevTools 套件

#### 3. `/README.md`
**變更內容：**

**a) Redux DevTools 章節重組：**
- 新增「方法 1: Expo Redux DevTools Plugin」為首選推薦方案
- 原「方法 1: Flipper」改為「方法 2」
- 原「方法 2: Reactotron」改為「方法 3」
- 原「方法 3: Redux DevTools Extension」改為「方法 4」
- 更新 DevTools 功能比較表，添加 Expo DevTools 對比

**b) 常見問題章節：**
- 新增「問題 2: Flipper idb 設定問題」完整解決方案
- 提供三種解決方案和詳細步驟
- 添加常見故障排除指南
- 原有問題編號相應調整（2→3, 3→4, 4→5）

**c) 已安裝套件章節：**
- 在「狀態管理」部分添加 `redux-devtools-expo-dev-plugin`

**影響：**
- 提供更清晰的 Redux DevTools 使用指引
- 解決 Flipper idb 安裝配置問題
- 完整記錄專案使用的套件清單

---

## 🎯 升級指南

### 對現有專案的影響

如果您已經使用舊版本初始化了專案，可以手動升級以獲得新功能：

#### 升級到 Expo Redux DevTools Plugin

**步驟 1：安裝套件**
```bash
yarn add redux-devtools-expo-dev-plugin
```

**步驟 2：更新 configureStore.ts**
```typescript
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
  // ... 其他配置
  devTools: false,
  enhancers: (getDefaultEnhancers) => 
    getDefaultEnhancers().concat(devToolsEnhancer()),
});
```

**步驟 3：重新啟動專案**
```bash
npx expo start -c
```

#### 解決 Flipper idb 問題

參考 README.md 中的「Flipper idb 設定問題」章節，根據您的需求選擇合適的解決方案。

---

## 📚 相關文檔

- [README.md](./README.md) - 專案完整文檔
- [Expo Redux DevTools 使用指南](./docs/expo-redux-devtools.md) - DevTools 詳細說明
- [iOS 開發指南](./docs/ios.md) - iOS 相關配置
- [Android 開發指南](./docs/android.md) - Android 相關配置

---

## 🙏 致謝

感謝以下專案和社群的貢獻：
- [Expo](https://expo.dev/) - 提供優秀的開發工具
- [Redux Toolkit](https://redux-toolkit.js.org/) - 簡化 Redux 開發
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) - 強大的除錯工具
- [idb](https://github.com/facebook/idb) - iOS 設備橋接工具

---

**維護者：** RNSkelton Team  
**更新日期：** 2024-11-23

