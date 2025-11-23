# Expo Redux DevTools Plugin 使用指南

## 📋 概述

本專案已整合 **Expo Redux DevTools Plugin**，提供強大的 Redux 狀態除錯功能。與傳統的瀏覽器擴充套件不同，Expo DevTools Plugin 可以直接在終端啟動，並在瀏覽器中顯示，適用於 iOS、Android 和 Web 平台。

## 🎯 優勢

相比其他 Redux DevTools 方案：

| 功能 | Expo DevTools | Reactotron | Redux DevTools Extension |
|------|---------------|------------|-------------------------|
| **終端啟動** | ✅ `shift + m` | ❌ 需開啟應用程式 | ❌ 僅瀏覽器 |
| **跨平台** | ✅ iOS/Android/Web | ✅ iOS/Android/Web | ❌ Web Only |
| **安裝簡單** | ✅ 零配置 | ⚠️ 需額外配置 | ✅ 瀏覽器擴充 |
| **無需原生建置** | ✅ | ✅ | ✅ |
| **Expo Go 支援** | ✅ | ✅ | ✅ (Web) |
| **時間旅行** | ✅ | ✅ | ✅ |
| **State 檢視** | ✅ | ✅ | ✅ |
| **手動 Dispatch** | ✅ | ✅ | ✅ |
| **網路請求監控** | ❌ | ✅ | ❌ |

**⚠️ 注意：** 本專案不支援 Flipper，因為 Flipper 需要原生建置，不適用於 Expo managed workflow。

## ✅ 已完成的配置

專案已自動配置好所有必要設定，無需額外操作：

### 1. package.json
```json
{
  "dependencies": {
    "redux-devtools-expo-dev-plugin": "^0.3.0"
  }
}
```

### 2. configureStore.ts
```typescript
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({...}).concat(sagaMiddleware),
  devTools: false, // 禁用內建的 devTools
  enhancers: (getDefaultEnhancers) => 
    getDefaultEnhancers().concat(devToolsEnhancer()), // 使用 Expo DevTools
});
```

## 🚀 使用方式

### 步驟 1：啟動專案

```bash
npx expo start
```

### 步驟 2：開啟 Redux DevTools

在終端中按 `shift + m`，會顯示 Dev Tools 選單：

```
┌─────────────────────────────────────┐
│  More tools                         │
│  ─────────────────────────────      │
│  › redux-devtools-expo-dev-plugin   │ ← 選這個！
│    @dev-plugins/react-navigation    │
└─────────────────────────────────────┘
```

使用方向鍵選擇 `redux-devtools-expo-dev-plugin`，按 Enter 確認。

### 步驟 3：在瀏覽器中查看

選擇後會自動在瀏覽器中開啟 Redux DevTools 介面，顯示：
- 📝 所有 Redux Actions 的歷史記錄
- 🔄 State 變化前後的差異（diff）
- 📦 Action 的詳細資訊和 Payload
- ⏱️ 時間旅行除錯功能
- 📊 狀態樹視圖

## 🧪 測試 Redux DevTools

### 測試帳號

使用內建的測試帳號來驗證 Redux 功能：

```
使用者名稱: demo
密碼: password
```

### 測試流程

1. **啟動專案**
   ```bash
   npx expo start --ios
   # 或
   npx expo start --android
   ```

2. **開啟 DevTools**
   - 在終端按 `shift + m`
   - 選擇 `redux-devtools-expo-dev-plugin`

3. **執行登入操作**
   - 在應用程式中點擊「前往登入」
   - 輸入測試帳號並登入

4. **觀察 Actions 流程**

   在 Redux DevTools 中會看到以下 Actions 依序觸發：

   ```
   @@INIT                    # Redux Store 初始化
   auth/loginRequest         # 觸發登入請求（Saga）
   auth/loginStart           # 開始登入流程
   auth/loginSuccess         # 登入成功
   ```

5. **檢查 State 變化**

   點擊任一 Action 可以看到：
   
   **loginStart 時的 State：**
   ```json
   {
     "auth": {
       "isAuthenticated": false,
       "user": null,
       "loading": true,
       "error": null
     }
   }
   ```
   
   **loginSuccess 時的 State：**
   ```json
   {
     "auth": {
       "isAuthenticated": true,
       "user": {
         "id": "1",
         "username": "demo",
         "name": "Demo User"
       },
       "loading": false,
       "error": null
     }
   }
   ```

## 🎮 DevTools 功能詳解

### 1. Action 歷史記錄

左側面板顯示所有觸發過的 Actions，可以：
- 🔍 搜尋特定的 Action
- 📌 固定重要的 Actions
- 🗑️ 清除歷史記錄

### 2. State 檢視器

右側面板顯示當前的 Redux State：
- **Tree 模式**：樹狀結構顯示
- **Raw 模式**：JSON 格式顯示
- **Diff 模式**：顯示前後差異

### 3. 時間旅行除錯

點擊任一 Action 可以：
- ⏮️ 跳回該時間點的 State
- ⏭️ 重放後續的 Actions
- 🔄 重新執行特定的 Action

### 4. 手動 Dispatch

在底部的輸入框可以手動觸發 Actions：

```javascript
// 手動觸發登入
{
  type: 'auth/loginRequest',
  payload: { username: 'test', password: 'test123' }
}

// 手動觸發登出
{
  type: 'auth/logout'
}
```

### 5. Action 過濾

可以根據條件過濾 Actions：
- 按類型過濾（如只顯示 auth 相關）
- 按時間範圍過濾
- 自定義正則表達式過濾

## 💡 最佳實踐

### 1. 開發環境限定

DevTools 已配置為只在開發環境啟用，生產環境自動禁用：

```typescript
// ✅ 正確配置
devTools: false,
enhancers: (getDefaultEnhancers) => 
  getDefaultEnhancers().concat(devToolsEnhancer()),
```

### 2. 清晰的 Action 命名

使用語義化的 Action 名稱，便於在 DevTools 中追蹤：

```typescript
// ✅ Good: 清晰的命名
auth/loginRequest
auth/loginSuccess
auth/loginFailure
user/profile/update

// ❌ Bad: 模糊的命名
LOGIN
UPDATE
ACTION_1
```

### 3. 合理的 State 結構

保持 State 扁平化，方便在 DevTools 中查看：

```typescript
// ✅ Good: 扁平結構
{
  auth: { user, token, loading },
  users: { list, selectedId },
  products: { items, filters }
}

// ❌ Bad: 過度巢狀
{
  app: {
    data: {
      users: {
        current: {
          profile: {
            details: { ... }
          }
        }
      }
    }
  }
}
```

### 4. 避免存放敏感資料

不要在 Redux State 中存放敏感資訊：

```typescript
// ❌ Bad: 密碼、Token 明文存放
{
  auth: {
    password: 'secret123',      // ❌ 危險！
    apiKey: 'sk_live_xxx'        // ❌ 危險！
  }
}

// ✅ Good: 只存必要的資料
{
  auth: {
    user: { id, name, email },
    isAuthenticated: true
  }
}
```

## 🐛 故障排除

### 問題 1：按 shift + m 沒看到 Redux DevTools

**可能原因：**
- 套件未正確安裝
- Metro bundler 快取問題

**解決方法：**
```bash
# 1. 確認套件已安裝
yarn list redux-devtools-expo-dev-plugin

# 2. 重新安裝依賴
rm -rf node_modules
yarn install

# 3. 清除快取並重新啟動
npx expo start -c
```

### 問題 2：Redux DevTools 顯示空白或錯誤

**可能原因：**
- `devTools: false` 未設定
- `devToolsEnhancer()` 未正確添加

**解決方法：**
```typescript
// 檢查 configureStore.ts
export const store = configureStore({
  // ...
  devTools: false,  // ⭐ 必須設為 false
  enhancers: (getDefaultEnhancers) => 
    getDefaultEnhancers().concat(devToolsEnhancer()), // ⭐ 必須添加
});
```

### 問題 3：看不到 Actions

**可能原因：**
- Saga middleware 未正確啟動
- Actions 未正確 dispatch

**解決方法：**
```typescript
// 1. 確認 Saga 已啟動
const sagaMiddleware = createSagaMiddleware();
// ...
sagaMiddleware.run(rootSaga); // ⭐ 必須執行

// 2. 使用 useAppDispatch
import { useAppDispatch } from '@/navigation/store/hooks';
const dispatch = useAppDispatch();
dispatch(loginRequest({ username, password }));
```

### 問題 4：瀏覽器無法自動開啟

**可能原因：**
- 瀏覽器阻止彈出視窗
- 防火牆設定

**解決方法：**
1. 檢查終端輸出，手動複製 URL 到瀏覽器
2. 允許 Expo 的彈出視窗權限
3. 檢查防火牆設定，允許 localhost 連線

## 📊 效能考量

### DevTools 對效能的影響

| 環境 | DevTools 狀態 | 效能影響 |
|------|--------------|---------|
| 開發環境 | 啟用 | 輕微影響（可接受） |
| 生產環境 | 自動禁用 | 無影響 |

### 優化建議

1. **限制 Action 頻率**
   ```typescript
   // 對於高頻 Actions，考慮使用 throttle 或 debounce
   import { debounce } from 'lodash';
   
   const debouncedSearch = debounce((query) => {
     dispatch(searchRequest(query));
   }, 300);
   ```

2. **避免過大的 Payload**
   ```typescript
   // ❌ Bad: 傳遞整個大型物件
   dispatch(updateData({ hugeObject: [...] }));
   
   // ✅ Good: 只傳遞必要的資料
   dispatch(updateData({ id: 123, changes: { name: 'New Name' } }));
   ```

## 🔗 相關資源

### 官方文檔
- [Expo DevTools Plugins](https://docs.expo.dev/debugging/devtools-plugins/)
- [Redux DevTools 官方文檔](https://github.com/reduxjs/redux-devtools)
- [Redux Toolkit 文檔](https://redux-toolkit.js.org/)

### 其他 DevTools 方案
- [Reactotron 使用指南](./README.md#方法-2-使用-reactotron替代方案)
- [Redux DevTools Extension 使用指南](./README.md#方法-3-redux-devtools-extension僅適用於-expo-web)

## ❓ 常見問題 FAQ

**Q: 為什麼不支援 Flipper？**  
A: Flipper 需要原生建置（需執行 `expo prebuild`），不適用於 Expo managed workflow 和 Expo Go。本專案專注於 Expo 生態系統，因此選擇使用 Expo DevTools Plugin。如果需要 Flipper 的功能（如網路監控、佈局檢視），可以考慮使用 Reactotron 或轉換為 bare workflow。

**Q: 在 CI/CD 環境會影響建置嗎？**  
A: 不會。DevTools 在生產建置時會自動被 tree-shaking 移除。

**Q: 支援 Redux Saga 的 Effects 檢視嗎？**  
A: 支援查看 Saga 觸發的 Actions，但不支援 Effects 的詳細追蹤（建議使用 redux-saga-devtools）。

**Q: 可以在實體設備上使用嗎？**  
A: 可以！只要設備和開發電腦在同一網路，就能正常使用。

---

## 🎉 開始使用

現在您已經了解 Expo Redux DevTools 的所有功能，開始使用它來提升開發效率吧！

```bash
# 啟動專案
npx expo start

# 按 shift + m，選擇 Redux DevTools
# 開始除錯！
```

**Happy Debugging! 🚀**

