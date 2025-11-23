# 移除 Flipper 支援 - 變更總結

## 📋 變更日期
2024-11-23

## 🎯 變更原因

Flipper 是一個強大的除錯工具，但它有以下限制：

1. **需要原生建置** - 必須執行 `expo prebuild` 並進行原生建置
2. **不支援 Expo Go** - 無法在 Expo Go 中使用
3. **不符合 Expo 理念** - 與 Expo managed workflow 的簡化開發流程相違背
4. **已有更好替代方案** - Expo Redux DevTools Plugin 提供完整的 Redux 除錯功能

因此決定從專案中完全移除 Flipper 支援，專注於 Expo 生態系統。

---

## ✅ 已完成的變更

### 1. 移除套件安裝

**檔案：** `/lastest/add_packages.sh`

**變更前：**
```bash
yarn add -D babel-plugin-root-import redux-flipper react-native-flipper
```

**變更後：**
```bash
yarn add -D babel-plugin-root-import
```

**移除的套件：**
- ❌ `redux-flipper` - Flipper 的 Redux 插件
- ❌ `react-native-flipper` - Flipper 的 React Native 整合

---

### 2. 更新 README.md

#### a) 技術棧說明（第 13 行）

**變更前：**
```markdown
- **開發工具**: Flipper、Redux DevTools
```

**變更後：**
```markdown
- **開發工具**: Expo Redux DevTools Plugin
```

#### b) Redux DevTools 使用指南

**移除內容：**
- ❌ 完整的「方法 2: 使用 Flipper」章節
- ❌ Flipper Desktop 安裝說明
- ❌ Flipper Redux Store 配置範例
- ❌ Flipper 使用步驟

**保留內容：**
- ✅ 方法 1: Expo Redux DevTools Plugin（推薦）
- ✅ 方法 2: Reactotron（原方法 3）
- ✅ 方法 3: Redux DevTools Extension（原方法 4）

#### c) DevTools 功能比較表

**移除欄位：**
- ❌ Flipper 欄位及其所有功能比較

**新增說明：**
```markdown
**⚠️ 注意：** Flipper 需要原生建置，不適用於 Expo managed workflow 或 Expo Go，
因此本專案不包含 Flipper 支援。如果需要使用 Flipper，請使用 `expo prebuild` 
轉換為 bare workflow。
```

#### d) 已安裝套件清單

**移除項目：**
```markdown
- `redux-flipper` - Flipper Redux 插件
- `react-native-flipper` - Flipper React Native 整合
```

#### e) 常見問題

**移除章節：**
- ❌ 「問題 2: Flipper idb 設定問題」完整章節
  - 包含所有 idb 安裝步驟
  - 包含 PATH 環境變數設定
  - 包含 Flipper 配置說明
  - 包含故障排除指南

**更新編號：**
- 原「問題 3: Metro Bundler」→ 新「問題 2」
- 原「問題 4: iOS 模擬器」→ 新「問題 3」
- 原「問題 5: Android 模擬器」→ 新「問題 4」

#### f) Redux DevTools 最佳實踐

**變更前：**
```typescript
// ✅ Good
if (__DEV__) {
  const reduxFlipperMiddleware = createReduxFlipperMiddleware();
  middleware.push(reduxFlipperMiddleware);
}

// ❌ Bad: 生產環境也啟用
const middleware = [sagaMiddleware, createReduxFlipperMiddleware()];
```

**變更後：**
```typescript
// ✅ Good: 使用 Expo DevTools（專案已預設配置）
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
  // ...
  devTools: false,
  enhancers: (getDefaultEnhancers) => 
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

// ❌ Bad: 在生產環境啟用 DevTools
export const store = configureStore({
  devTools: true, // 生產環境也會啟用，影響效能
});
```

#### g) 延伸閱讀

**移除連結：**
```markdown
- [Flipper Documentation](https://fbflipper.com/docs/features/react-native/)
```

**新增連結：**
```markdown
- [Expo DevTools Plugins](https://docs.expo.dev/debugging/devtools-plugins/)
- [Redux DevTools 官方文檔](https://github.com/reduxjs/redux-devtools)
```

---

### 3. 更新 docs/expo-redux-devtools.md

#### a) 功能比較表

**移除 Flipper 欄位：**

| 功能 | ~~Flipper~~ |
|------|-------------|
| **終端啟動** | ~~❌ 需開啟應用程式~~ |
| **跨平台** | ~~✅ iOS/Android~~ |
| **安裝簡單** | ~~⚠️ 需安裝原生依賴~~ |
| **無需原生建置** | ~~❌~~ |

**新增說明：**
```markdown
**⚠️ 注意：** 本專案不支援 Flipper，因為 Flipper 需要原生建置，
不適用於 Expo managed workflow。
```

#### b) 相關資源連結

**變更前：**
```markdown
### 其他 DevTools 方案
- [Flipper 使用指南](./README.md#方法-1-使用-flipper-推薦)
- [Reactotron 使用指南](./README.md#方法-2-使用-reactotron-替代方案)
```

**變更後：**
```markdown
### 其他 DevTools 方案
- [Reactotron 使用指南](./README.md#方法-2-使用-reactotron替代方案)
- [Redux DevTools Extension 使用指南](./README.md#方法-3-redux-devtools-extension僅適用於-expo-web)
```

#### c) 常見問題 FAQ

**變更前：**
```markdown
**Q: 能同時使用 Expo DevTools 和 Flipper 嗎？**  
A: 不建議。兩者都會 hook Redux，可能造成衝突。建議擇一使用。
```

**變更後：**
```markdown
**Q: 為什麼不支援 Flipper？**  
A: Flipper 需要原生建置（需執行 `expo prebuild`），不適用於 Expo managed workflow 
和 Expo Go。本專案專注於 Expo 生態系統，因此選擇使用 Expo DevTools Plugin。
如果需要 Flipper 的功能（如網路監控、佈局檢視），可以考慮使用 Reactotron 或
轉換為 bare workflow。
```

---

### 4. 更新 docs/ios.md

**新增警告說明：**
```markdown
> **⚠️ 重要說明：** 本文檔中的配置僅適用於 **bare workflow** 或執行 
> `expo prebuild` 後的專案。如果您使用 **Expo managed workflow**，
> 這些配置不需要手動處理，Expo 會自動管理。
> 本專案預設使用 Expo managed workflow，因此以下內容僅供參考。
```

---

### 5. 更新 CHANGELOG.md

**新增「重大變更」章節：**
- 說明移除 Flipper 的原因
- 列出所有移除的內容
- 提供替代方案
- 說明如何在需要時重新啟用 Flipper

---

## 📊 變更統計

### 檔案變更
- 📝 修改：5 個檔案
- ➕ 新增：2 個檔案（CHANGELOG.md 內容更新，本總結文件）
- ❌ 刪除：0 個檔案

### 程式碼變更
- ➖ 移除：約 160 行（主要是 README.md 中的 Flipper 說明）
- ➕ 新增：約 50 行（警告說明、替代方案說明）
- ✏️ 修改：約 30 行（更新連結、比較表、範例代碼）

### 套件變更
- ❌ 移除：2 個開發依賴套件
- ✅ 保留：`redux-devtools-expo-dev-plugin`（主要 DevTools）

---

## 🎯 推薦的 Redux 除錯方案

### 1. 🥇 Expo Redux DevTools Plugin（強烈推薦）

**使用場景：**
- ✅ 開發 Redux 邏輯和狀態管理
- ✅ 除錯 Actions 和 State 變化
- ✅ 時間旅行除錯

**優勢：**
- 零配置，開箱即用
- 終端啟動（`shift + m`）
- 支援所有平台（iOS/Android/Web）
- 支援 Expo Go

**啟動方式：**
```bash
npx expo start
# 按 shift + m，選擇 redux-devtools-expo-dev-plugin
```

### 2. 🥈 Reactotron（需要額外功能時）

**使用場景：**
- ✅ 需要網路請求監控
- ✅ 需要 AsyncStorage 檢視
- ✅ 偏好獨立的除錯應用程式

**安裝方式：**
```bash
yarn add -D reactotron-react-native reactotron-redux
# 按照 README.md 中的說明配置
```

### 3. 🥉 Redux DevTools Extension（Web 開發時）

**使用場景：**
- ✅ 僅在 Web 平台開發
- ✅ 偏好瀏覽器開發者工具

**使用方式：**
```bash
npx expo start --web
# 瀏覽器按 F12，切換到 Redux 分頁
```

---

## 🔄 如何重新啟用 Flipper（如果需要）

如果您的專案需要 Flipper 的特定功能（如原生模組除錯、佈局檢視），可以按以下步驟重新啟用：

### 步驟 1：轉換為 Bare Workflow

```bash
npx expo prebuild
```

### 步驟 2：安裝 Flipper 套件

```bash
yarn add -D redux-flipper react-native-flipper
```

### 步驟 3：配置 Redux Store

```typescript
import { createReduxFlipperMiddleware } from 'redux-flipper';

const middleware = [sagaMiddleware];
if (__DEV__) {
  const reduxFlipperMiddleware = createReduxFlipperMiddleware();
  middleware.push(reduxFlipperMiddleware);
}

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
```

### 步驟 4：iOS 原生配置

參考 `docs/ios.md` 中的配置說明。

### 步驟 5：下載並啟動 Flipper

1. 下載 [Flipper Desktop](https://fbflipper.com/)
2. 安裝並啟動
3. 執行應用程式
4. 在 Flipper 中找到並連接您的應用

---

## ⚠️ 注意事項

### 對現有專案的影響

1. **新專案**
   - ✅ 無影響，使用最新的初始化腳本即可
   - ✅ 自動配置 Expo DevTools Plugin

2. **已初始化的專案**
   - ⚠️ 如果已安裝 Flipper 套件，可以選擇保留或移除
   - ⚠️ 如果正在使用 Flipper，請評估是否需要遷移到其他方案
   - ✅ 可以手動添加 `redux-devtools-expo-dev-plugin` 來使用 Expo DevTools

3. **Bare Workflow 專案**
   - ℹ️ 如果已經轉換為 bare workflow，仍可以使用 Flipper
   - ℹ️ 需要手動安裝和配置 Flipper 套件

---

## 📚 相關文檔

- [README.md](../README.md) - 完整的專案文檔
- [Expo Redux DevTools 使用指南](../docs/expo-redux-devtools.md) - 詳細的 DevTools 說明
- [CHANGELOG.md](../CHANGELOG.md) - 完整的變更日誌
- [Expo DevTools 官方文檔](https://docs.expo.dev/debugging/devtools-plugins/)

---

## 🙏 總結

移除 Flipper 支援是為了讓專案更專注於 Expo 生態系統，提供更簡單、更一致的開發體驗。Expo Redux DevTools Plugin 提供了完整的 Redux 除錯功能，對於大多數開發場景已經足夠。

如果您的專案有特殊需求需要 Flipper 的功能，仍然可以通過轉換為 bare workflow 來使用 Flipper。

**Happy Coding with Expo! 🚀**

---

**變更日期：** 2024-11-23  
**維護者：** RNSkelton Team

