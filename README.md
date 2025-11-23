# React Native Expo Skeleton

基於 Expo 和 React Navigation 的 React Native 專案骨架，整合了 Redux Toolkit、Redux Saga、TypeScript 等現代化開發工具。

## 📦 技術棧

- **框架**: [Expo](https://expo.dev/) - React Native 開發框架
- **路由**: [React Navigation](https://reactnavigation.org/) - 原生導航方案
- **狀態管理**: [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Saga](https://redux-saga.js.org/)
- **語言**: TypeScript
- **UI 組件**: React Native 原生組件 + 自定義組件
- **主題**: 支援深色/淺色模式切換
- **開發工具**: Expo Redux DevTools Plugin

## 🚀 快速開始

### 安裝與初始化

```bash
# 克隆或進入專案目錄
cd /path/to/RNSkelton

# 給腳本執行權限
chmod +x lastest/init_project.sh lastest/add_packages.sh

# 執行初始化腳本（替換 YourProjectName 為你的專案名稱）
./lastest/init_project.sh YourProjectName
```

初始化腳本會自動完成：
- 建立 Expo 專案（基於 React Navigation 範例）
- 複製模板檔案到 `src` 目錄
- 安裝所有必要的依賴套件
- 使用 `expo install` 確保套件版本相容
- 將專案檔案提升到當前目錄
- 清理無用檔案（docs、lastest、template 等）

### 啟動開發伺服器

```bash
# 使用 Expo 開發伺服器
npx expo start

# 或使用特定平台
npx expo start --ios      # iOS 模擬器
npx expo start --android  # Android 模擬器
npx expo start --web      # 網頁版
```

## 📁 專案結構

```
src/
├── App.tsx                      # 應用程式入口，配置 Redux Provider
├── assets/                      # 靜態資源
│   ├── fonts/                   # 字體檔案
│   └── images/                  # 圖片資源
├── components/                  # 可重用組件
│   ├── Collapsible.tsx          # 可折疊組件
│   ├── ExternalLink.tsx         # 外部連結組件
│   ├── HapticTab.tsx            # 帶觸覺回饋的 Tab
│   ├── HelloWave.tsx            # 動畫揮手組件
│   ├── ParallaxScrollView.tsx   # 視差滾動視圖
│   ├── ThemedText.tsx           # 主題化文字組件
│   ├── ThemedView.tsx           # 主題化視圖組件
│   └── ui/                      # UI 基礎組件
│       ├── IconSymbol.tsx       # 圖示符號組件
│       └── TabBarBackground.tsx # Tab 欄背景
├── constants/
│   └── Colors.ts                # 顏色常數定義
├── hooks/                       # 自定義 Hooks
│   ├── useColorScheme.ts        # 顏色方案 Hook
│   └── useThemeColor.ts         # 主題顏色 Hook
├── navigation/                  # 導航配置
│   ├── index.tsx                # 根導航組件
│   ├── screens/                 # 畫面組件
│   │   ├── ExploreScreen/       # 探索頁面
│   │   ├── HomeScreen/          # 首頁
│   │   ├── LoginScreen/         # 登入頁面
│   │   ├── NotFoundScreen/      # 404 頁面
│   │   └── PublicScreen/        # 公開頁面
│   └── store/                   # Redux Store
│       ├── actions/             # Action Creators
│       │   └── authActions.ts   # 認證相關 Actions
│       ├── configureStore.ts    # Store 配置
│       ├── hooks.ts             # 型別安全的 Redux Hooks
│       ├── sagas/               # Redux Saga
│       │   ├── authSagas.ts     # 認證 Saga
│       │   └── index.ts         # 根 Saga
│       └── slices/              # Redux Toolkit Slices
│           └── authSlices.ts    # 認證 Slice
├── scripts/
│   └── reset-project.js         # 專案重置腳本
└── types.d.ts                   # TypeScript 型別定義
```

## 🏗️ 架構說明

### 導航架構

專案使用**條件式路由**設計，根據使用者認證狀態顯示不同的導航堆疊：

#### 1. Loading State（載入中）
```typescript
if (loading) {
  return <LoadingScreen />;
}
```

#### 2. Authenticated Stack（已認證用戶）
```typescript
if (isAuthenticated) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
}
```

**HomeTabs** 包含：
- 🏠 **Home**: 首頁
- 🔍 **Explore**: 探索頁面

#### 3. Public Stack（未認證用戶）
```typescript
return (
  <Stack.Navigator>
    <Stack.Screen name="Public" component={PublicScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
```

### Redux 狀態管理

#### Store 配置

使用 **Redux Toolkit** 的 `configureStore` 自動配置：
- ✅ Redux DevTools（開發環境自動啟用）
- ✅ Redux Thunk（處理非同步邏輯）
- ✅ 序列化檢查中間件
- ✅ Redux Saga（處理複雜的副作用邏輯）

```typescript
// src/navigation/store/configureStore.ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: { /* ... */ },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
```

#### 型別安全的 Hooks

專案提供了型別安全的 Redux Hooks：

```typescript
// ❌ 不要使用原生 hooks
import { useDispatch, useSelector } from 'react-redux';

// ✅ 使用型別安全的 hooks
import { useAppDispatch, useAppSelector } from '@/navigation/store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();        // 型別安全的 dispatch
  const user = useAppSelector(state => state.auth.user); // 自動補全
}
```

#### Redux Saga 使用範例

```typescript
// 1. 定義 Action
// src/navigation/store/actions/authActions.ts
export const loginRequest = (payload: LoginRequest) => ({
  type: AUTH_SAGA_ACTIONS.LOGIN_REQUEST,
  payload,
});

// 2. 在組件中 dispatch
function LoginScreen() {
  const dispatch = useAppDispatch();
  
  const handleLogin = () => {
    dispatch(loginRequest({ username: 'user', password: 'pass' }));
  };
}

// 3. Saga 處理副作用
// src/navigation/store/sagas/authSagas.ts
function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
```

## 🛠️ Redux DevTools 使用指南

本專案提供多種 Redux DevTools 方案，推薦使用 **Expo DevTools Plugin**（已預先配置，開箱即用）。

### 方法 1: 使用 Expo Redux DevTools Plugin（✨ 強烈推薦）

**已預先配置完成，無需額外設定！** Expo DevTools Plugin 是最簡單且功能完整的 Redux 除錯方案。

#### 為什麼選擇 Expo DevTools？

- ✅ **零配置**：專案已自動整合，無需任何設定
- ✅ **終端啟動**：按 `shift + m` 即可開啟，無需額外安裝應用程式
- ✅ **全平台支援**：iOS、Android、Web 都能使用
- ✅ **無需原生建置**：純 JS 方案，不影響原生建置
- ✅ **功能完整**：時間旅行、State 檢視、手動 Dispatch 等全部支援
- ✅ **效能優異**：輕量級設計，對應用效能影響極小

#### 快速開始

**步驟 1：啟動專案**

```bash
npx expo start
```

**步驟 2：開啟 Redux DevTools**

在終端中按 `shift + m`，選擇 `redux-devtools-expo-dev-plugin`：

```
┌─────────────────────────────────────┐
│  More tools                         │
│  ─────────────────────────────      │
│  › redux-devtools-expo-dev-plugin   │ ← 選這個！
│    @dev-plugins/react-navigation    │
└─────────────────────────────────────┘
```

**步驟 3：在瀏覽器中查看**

Redux DevTools 會自動在瀏覽器中開啟，您可以看到：
- 📝 所有 Redux Actions 的歷史記錄
- 🔄 State 變化前後的差異（diff）
- 📦 Action 的詳細資訊和 Payload
- ⏱️ 時間旅行除錯功能
- 📊 狀態樹視圖

#### 測試功能

使用測試帳號驗證 Redux 功能：

```
使用者名稱: demo
密碼: password
```

在應用程式中執行登入，在 DevTools 中觀察以下 Actions：

```
@@INIT                    # Redux Store 初始化
auth/loginRequest         # 觸發登入請求（Saga）
auth/loginStart           # 開始登入流程
auth/loginSuccess         # 登入成功
```

#### 完整文檔

詳細使用說明請參閱：[Expo Redux DevTools Plugin 使用指南](./docs/expo-redux-devtools.md)

---

### 方法 2: 使用 Reactotron（替代方案）

#### 安裝 Reactotron

```bash
yarn add -D reactotron-react-native reactotron-redux
```

#### 配置 Reactotron

建立 `src/config/ReactotronConfig.ts`：

```typescript
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure({
    name: 'YourAppName',
  })
  .use(reactotronRedux())
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

export default reactotron;
```

在 `App.tsx` 最頂部引入：

```typescript
if (__DEV__) {
  require('./config/ReactotronConfig');
}
```

在 `configureStore.ts` 中整合：

```typescript
import Reactotron from './config/ReactotronConfig';

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  enhancers: __DEV__ ? [Reactotron.createEnhancer!()] : [],
});
```

#### 使用 Reactotron

1. 下載並啟動 [Reactotron Desktop](https://github.com/infinitered/reactotron/releases)
2. 執行應用程式
3. 在 Reactotron 中查看 Redux 狀態和 Actions

### 方法 3: Redux DevTools Extension（僅適用於 Expo Web）

當使用 Expo Web 時，可以直接使用瀏覽器的 Redux DevTools Extension。

**注意**：由於專案已配置 Expo DevTools Plugin，需要修改 `configureStore.ts` 才能使用瀏覽器擴充套件。

**安裝瀏覽器擴充功能：**
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox](https://addons.mozilla.org/firefox/addon/reduxdevtools/)

**使用方式：**
1. 執行 `npx expo start --web`
2. 在瀏覽器中按 F12 開啟開發者工具
3. 切換到 **Redux** 分頁

**配置修改（如需使用）：**

```typescript
// 將 configureStore.ts 中的配置改為：
export const store = configureStore({
  // ...
  devTools: process.env.NODE_ENV !== 'production', // 改為 true
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(), // 移除 devToolsEnhancer
});
```

### DevTools 功能比較

| 功能 | Expo DevTools | Reactotron | Redux DevTools Ext |
|------|---------------|------------|-------------------|
| **支援平台** | iOS, Android, Web | iOS, Android, Web | Web Only |
| **安裝難度** | ⭐ 零配置 | ⭐⭐ 需配置 | ⭐ 瀏覽器擴充 |
| **終端啟動** | ✅ shift + m | ❌ | ❌ |
| **Redux 狀態檢視** | ✅ | ✅ | ✅ |
| **時間旅行除錯** | ✅ | ✅ | ✅ |
| **手動 Dispatch** | ✅ | ✅ | ✅ |
| **網路請求監控** | ❌ | ✅ | ❌ |
| **效能監控** | ❌ | ⚠️ 有限 | ❌ |
| **AsyncStorage 檢視** | ❌ | ✅ | ❌ |
| **Expo Go 支援** | ✅ | ✅ | ✅ (Web) |
| **學習曲線** | ⭐ 極簡單 | ⭐⭐ 簡單 | ⭐⭐ 簡單 |
| **官方支援** | Expo 官方 | 社群 | Redux 官方 |

**推薦使用順序：**
1. 🥇 **Expo DevTools** - 開發 Redux 邏輯（強烈推薦，適用於 Expo 專案）
2. 🥈 **Reactotron** - 需要網路請求監控和 AsyncStorage 檢視
3. 🥉 **Redux DevTools Ext** - 僅在 Web 平台開發時

**⚠️ 注意：** Flipper 需要原生建置，不適用於 Expo managed workflow 或 Expo Go，因此本專案不包含 Flipper 支援。如果需要使用 Flipper，請使用 `expo prebuild` 轉換為 bare workflow。

## 💡 最佳實踐

### 1. 程式碼組織

#### 功能模組化
```
src/navigation/store/
├── slices/
│   ├── authSlices.ts      # 認證狀態
│   ├── userSlices.ts      # 使用者資料
│   └── productsSlices.ts  # 產品資料
├── sagas/
│   ├── authSagas.ts       # 認證相關副作用
│   ├── userSagas.ts       # 使用者相關副作用
│   └── index.ts           # 組合所有 sagas
└── actions/
    ├── authActions.ts     # 認證 actions
    └── userActions.ts     # 使用者 actions
```

#### Slice 設計原則
```typescript
// ✅ Good: 單一職責
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
  },
});

// ❌ Bad: 職責混雜
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile,
    deleteAccount,
    fetchProducts,  // ❌ 應該在 productsSlice
    updateCart,     // ❌ 應該在 cartSlice
  },
});
```

### 2. TypeScript 型別安全

```typescript
// ✅ 使用型別安全的 hooks
import { useAppDispatch, useAppSelector } from '@/navigation/store/hooks';

// ✅ 定義明確的 Action Payload 型別
export interface LoginRequest {
  username: string;
  password: string;
}

// ✅ 使用 TypeScript 的型別推斷
export const loginRequest = (payload: LoginRequest) => ({
  type: AUTH_SAGA_ACTIONS.LOGIN_REQUEST,
  payload,
});
```

### 3. Redux DevTools 最佳實踐

#### 使用 Expo DevTools Plugin（推薦）
```typescript
// ✅ Good: 使用 Expo DevTools（專案已預設配置）
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
  // ...
  devTools: false, // 禁用內建 devTools
  enhancers: (getDefaultEnhancers) => 
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

// ❌ Bad: 在生產環境啟用 DevTools
export const store = configureStore({
  devTools: true, // 生產環境也會啟用，影響效能
});
```

#### 清晰的 Action 命名
```typescript
// ✅ Good: 清晰的命名
dispatch({ type: 'auth/login/request', payload: credentials });
dispatch({ type: 'user/profile/update/success', payload: profile });

// ❌ Bad: 模糊的命名
dispatch({ type: 'LOGIN', payload: credentials });
dispatch({ type: 'a1', payload: profile });
```

#### 避免在 State 中存放敏感資料
```typescript
// ❌ Bad: 密碼不應該存在 state 中
interface AuthState {
  username: string;
  password: string;  // ❌ 危險！
}

// ✅ Good: 只存必要的資料
interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;  // 如需儲存 token，應該加密
}
```

### 4. 性能優化

#### 使用 Selector 優化
```typescript
// ✅ Good: 使用 selector 選擇特定資料
const userName = useAppSelector(state => state.auth.user?.name);

// ❌ Bad: 選擇整個 state 會導致不必要的重渲染
const authState = useAppSelector(state => state.auth);
const userName = authState.user?.name;
```

#### 使用 useMemo 和 useCallback
```typescript
function UserList() {
  const users = useAppSelector(state => state.users.list);
  
  // ✅ 使用 useMemo 避免重複計算
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);
  
  // ✅ 使用 useCallback 避免重複創建函數
  const handleUserClick = useCallback((userId: string) => {
    navigation.navigate('UserDetail', { userId });
  }, [navigation]);
}
```

### 5. 錯誤處理

```typescript
// ✅ Good: 完整的錯誤處理
function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    yield put(loginStart());
    const response = yield call(api.login, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    // 記錄詳細錯誤資訊
    console.error('Login failed:', error);
    
    // 提供友善的錯誤訊息給使用者
    const errorMessage = error instanceof Error 
      ? error.message 
      : '登入失敗，請稍後再試';
    
    yield put(loginFailure(errorMessage));
  }
}
```

## 📦 已安裝套件

### 核心套件
- `expo` - Expo SDK
- `react` - React 核心函式庫
- `react-native` - React Native 核心函式庫

### 狀態管理
- `@reduxjs/toolkit` - Redux 官方工具包
- `react-redux` - React Redux 綁定
- `redux-saga` - 處理副作用的中介軟體
- `redux-thunk` - Thunk 中介軟體
- `redux-devtools-expo-dev-plugin` - Expo Redux DevTools 除錯工具

### 路由導航
- `@react-navigation/native` - React Navigation 核心
- `@react-navigation/native-stack` - 原生堆疊導航器
- `@react-navigation/bottom-tabs` - 底部標籤導航器
- `react-native-safe-area-context` - 安全區域處理
- `react-native-screens` - 原生畫面管理

### UI 工具
- `react-native-svg` - SVG 支援
- `react-native-vector-icons` - 圖示庫
- `react-native-modal-overlay` - 模態框組件
- `color` - 顏色處理工具

### 開發工具
- `babel-plugin-root-import` - 路徑別名支援

### 其他工具
- `yup` - Schema 驗證
- `flux-constants` - Flux 常數生成器
- `react-native-config` - 環境變數管理

## 🔧 配置說明

### 路徑別名

專案使用 `babel-plugin-root-import` 支援路徑別名：

```typescript
// ✅ 使用別名（推薦）
import { ThemedText } from '@/components/ThemedText';
import { useAppDispatch } from '@/navigation/store/hooks';

// ❌ 相對路徑（不推薦）
import { ThemedText } from '../../../components/ThemedText';
```

### 主題配置

專案內建深色/淺色模式支援：

```typescript
// src/constants/Colors.ts
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    // ...
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    // ...
  },
};
```

使用主題化組件：

```typescript
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function MyScreen() {
  return (
    <ThemedView>
      <ThemedText>這段文字會自動適應主題</ThemedText>
    </ThemedView>
  );
}
```

## 🚨 常見問題

### 1. 套件版本相容性警告

如果看到類似以下的警告：

```
The following packages should be updated for best compatibility:
  react-native@0.81.4 - expected version: 0.81.5
```

**解決方法：**
```bash
npx expo install --fix
```

本初始化腳本已自動執行此命令。

### 2. Metro Bundler 快取問題

如果遇到奇怪的錯誤，嘗試清除快取：

```bash
npx expo start -c
```

### 3. iOS 模擬器無法啟動

確保已安裝 Xcode 和 Command Line Tools：

```bash
xcode-select --install
```

### 4. Android 模擬器無法啟動

確保已安裝 Android Studio 和設定 ANDROID_HOME：

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 📚 延伸閱讀

### 官方文檔
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)

### 推薦資源
- [React Native Best Practices](https://github.com/facebook/react-native/wiki/Best-Practices)
- [TypeScript React Native Guide](https://reactnative.dev/docs/typescript)
- [Expo DevTools Plugins](https://docs.expo.dev/debugging/devtools-plugins/)
- [Redux DevTools 官方文檔](https://github.com/reduxjs/redux-devtools)

## 📄 授權

本專案骨架基於 MIT 授權。

---

**Happy Coding! 🎉**
