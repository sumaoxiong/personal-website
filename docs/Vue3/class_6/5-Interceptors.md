---
title: 6.5 - 攔截器
sidebar_label: "6.5 - 攔截器"
keywords:
  - Vue3
tags:
  - Vue3
---

在專案中，**攔截器 (Interceptors)** 是 Axios 的強大功能之一。  
它可以在 **請求發送前 (Request)** 和 **回應回來後 (Response)** 進行統一處理，避免在每個 API 呼叫中重複寫一樣的程式。

## 1. Request 攔截器

### 功能

- 在每次發送請求前，統一加上設定，例如：
  - 加上 **Authorization Token**。
  - 設定 **全域 Header**（如 Content-Type）。
  - 請求發送前的 Loading 狀態處理。

### 範例

```js
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

// Request 攔截器
api.interceptors.request.use(
  (config) => {
    // 模擬從 localStorage 取出 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 加上統一的 Content-Type
    config.headers["Content-Type"] = "application/json";

    console.log("🚀 發送請求：", config.method, config.url);
    return config;
  },
  (error) => {
    // 請求錯誤處理
    return Promise.reject(error);
  }
);

export default api;
```

📌 **說明**

- `config` 代表這次請求的設定，可以在這裡修改 header 或其他參數。
- 常見用途：統一加上 Token、Debug 請求。

## 2. Response 攔截器

### 功能

- 在回應資料進入應用程式前，統一處理：
  - 成功回應 → 簡化資料結構（例如只取 `res.data`）。
  - 錯誤回應 → 根據狀態碼進行處理（例如 401 跳轉登入頁）。
  - 自動顯示錯誤訊息。

### 範例

```javascript
// src/utils/api.js (接續前面)
api.interceptors.response.use(
  (response) => {
    console.log("✅ 收到回應：", response.status, response.config.url);
    // 統一回傳 response.data，減少組件層的負擔
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // 401 未授權 → 跳轉登入
      if (status === 401) {
        alert("請先登入");
        window.location.href = "/login";
      }

      // 403 禁止存取
      if (status === 403) {
        alert("權限不足");
      }

      // 500 伺服器錯誤
      if (status >= 500) {
        alert("伺服器發生錯誤，請稍後再試");
      }
    } else {
      // 例如網路錯誤、timeout
      console.error("❌ 請求失敗：", error.message);
      alert("網路錯誤，請檢查連線");
    }

    return Promise.reject(error);
  }
);
```

📌 **說明**

- `response`：成功的回應，可以統一 return `response.data`，這樣在組件裡就不用每次寫 `res.data`。
- `error.response`：失敗回應，可以根據 **HTTP 狀態碼** 做處理。
- `error.message`：用來處理網路錯誤或 timeout。

## 3. 實務應用範例

### (1) 自動帶 Token + 刷新 Token

```javascript
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // 呼叫 refresh token API
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("/auth/refresh", { token: refreshToken });

        // 更新 Token
        localStorage.setItem("token", res.data.token);

        // 重新發送原本失敗的請求
        error.config.headers.Authorization = `Bearer ${res.data.token}`;
        return api(error.config);
      } catch (err) {
        // Refresh token 也失敗 → 登出
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
```

### (2) 全域 Loading 效果

```javascript
import { ref } from "vue";

export const isLoading = ref(false);

api.interceptors.request.use((config) => {
  isLoading.value = true;
  return config;
});

api.interceptors.response.use(
  (res) => {
    isLoading.value = false;
    return res.data;
  },
  (err) => {
    isLoading.value = false;
    return Promise.reject(err);
  }
);
```

然後在組件中：

```vue
<template>
  <div v-if="isLoading">載入中...</div>
</template>

<script setup>
import { isLoading } from "@/utils/api";
</script>
```

### (3) 統一錯誤訊息顯示

```javascript
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || "發生未知錯誤";
    alert(message);
    return Promise.reject(err);
  }
);
```

## 4. 小結

- **Request 攔截器**：請求發送前處理，例如加上 Token、設定 Header。
- **Response 攔截器**：統一處理回應，簡化資料結構、處理錯誤狀態碼。
- 常見實務應用：
  - 自動攜帶與刷新 Token
  - 全域 Loading 效果
  - 統一錯誤訊息顯示
