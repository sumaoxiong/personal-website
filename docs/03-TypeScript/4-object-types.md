---
title: 物件型別
description: TypeScript 物件型別（Object Types）
sidebar_position: 4
tags:
  - TypeScript
  - Object Types
---

# Object Types（物件型別）

## 為什麼要學這個？

在前端開發中，物件（Object）是非常常見的資料格式。

例如：

- 使用者資料
- 商品資料
- API 回傳資料
- React Props
- 表單資料
- 設定檔資料

在 JavaScript 中，物件可以很自由地新增、刪除或修改屬性：

```js
const user = {
  name: "Tom",
  age: 18,
};

user.email = "tom@example.com";
user.age = "18";
```

雖然彈性很高，但在大型專案中容易出現資料格式錯誤。

TypeScript 可以幫物件定義明確的型別，讓我們知道：

- 物件有哪些屬性
- 每個屬性的型別是什麼
- 哪些屬性是必填
- 哪些屬性是選填
- 哪些屬性不能被修改

---

## 這章知識點

- 如何定義物件型別
- 如何使用 Optional Property
- 如何使用 Readonly Property
- 如何定義巢狀物件型別
- 如何定義物件陣列
- `object`、`Object`、`{}` 的差異
- 實務開發中的常見使用方式

---

## Object Type 基本語法

TypeScript 可以直接在變數後方定義物件型別。

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Tom",
  age: 18,
};
```

語法結構：

```ts
const variableName: {
  propertyName: type;
} = {
  propertyName: value,
};
```

---

### 基本物件型別

```ts
const product: {
  id: number;
  title: string;
  price: number;
  isAvailable: boolean;
} = {
  id: 1,
  title: "iPhone",
  price: 30000,
  isAvailable: true,
};
```

這代表 `product` 必須符合以下格式：

```ts
{
  id: number;
  title: string;
  price: number;
  isAvailable: boolean;
}
```

---

### 屬性型別錯誤

如果屬性型別不符合，TypeScript 會報錯。

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Tom",
  age: "18",
};
```

錯誤：

```txt
Type 'string' is not assignable to type 'number'
```

---

### 缺少必要屬性

如果物件少了必要屬性，也會報錯。

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Tom",
};
```

錯誤原因：

```txt
Property 'age' is missing
```

因為 `age` 是必要屬性。

---

### 多出不存在的屬性

如果物件多出型別中沒有定義的屬性，也可能報錯。

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Tom",
  age: 18,
  email: "tom@example.com",
};
```

錯誤原因：

```txt
Object literal may only specify known properties
```

因為型別中沒有定義 `email`。

---

## Optional Property（選填屬性）

如果某個屬性不一定會存在，可以使用 `?`。

```ts
const user: {
  name: string;
  age: number;
  email?: string;
} = {
  name: "Tom",
  age: 18,
};
```

這裡的：

```ts
email?: string;
```

代表：

```txt
email 可以是 string，也可以不存在
```

---

### 有 email 的情況

```ts
const user: {
  name: string;
  age: number;
  email?: string;
} = {
  name: "Tom",
  age: 18,
  email: "tom@example.com",
};
```

合法。

---

### 沒有 email 的情況

```ts
const user: {
  name: string;
  age: number;
  email?: string;
} = {
  name: "Tom",
  age: 18,
};
```

也合法。

---

## Optional Property 的注意事項

選填屬性在使用前，通常要先判斷是否存在。

```ts
const user: {
  name: string;
  email?: string;
} = {
  name: "Tom",
};

console.log(user.email.toUpperCase());
```

可能會報錯：

```txt
'user.email' is possibly 'undefined'
```

因為 `email` 可能不存在。

---

### 正確寫法

```ts
if (user.email) {
  console.log(user.email.toUpperCase());
}
```

或使用 Optional Chaining：

```ts
console.log(user.email?.toUpperCase());
```

---

## Readonly Property（唯讀屬性）

如果某個屬性不希望被修改，可以使用 `readonly`。

```ts
const user: {
  readonly id: number;
  name: string;
} = {
  id: 1,
  name: "Tom",
};
```

---

### 錯誤示範

```ts
user.id = 2;
```

錯誤：

```txt
Cannot assign to 'id' because it is a read-only property
```

---

### 可以修改非 readonly 屬性

```ts
user.name = "John";
```

合法。

因為 `name` 沒有設定 `readonly`。

---

## Nested Object（巢狀物件）

物件中也可以包含另一個物件。

```ts
const user: {
  name: string;
  address: {
    city: string;
    zipCode: string;
  };
} = {
  name: "Tom",
  address: {
    city: "Taipei",
    zipCode: "100",
  },
};
```

---

### 讀取巢狀物件屬性

```ts
console.log(user.address.city);
```

輸出：

```txt
Taipei
```

---

## Object Array（物件陣列）

API 回傳資料通常會是物件陣列。

```ts
const users: {
  id: number;
  name: string;
  email: string;
}[] = [
  {
    id: 1,
    name: "Tom",
    email: "tom@example.com",
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
  },
];
```

---

## 使用 type 定義物件型別

如果物件型別比較長，建議使用 `type` 抽出來。

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

---

### 使用 User 型別

```ts
const user: User = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
};
```

---

### User 陣列

```ts
const users: User[] = [
  {
    id: 1,
    name: "Tom",
    email: "tom@example.com",
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
  },
];
```

這種寫法比直接把型別寫在變數後方更清楚，也比較容易維護。

---

## 使用 interface 定義物件型別

除了 `type`，也可以使用 `interface` 定義物件型別。

```ts
interface Product {
  id: number;
  title: string;
  price: number;
}
```

---

### 使用 Product 介面

```ts
const product: Product = {
  id: 1,
  title: "iPhone",
  price: 30000,
};
```

---

## type 與 interface 在物件型別中的使用

在定義物件時，`type` 和 `interface` 都可以使用。

```ts
type User = {
  id: number;
  name: string;
};
```

```ts
interface Product {
  id: number;
  title: string;
}
```

初學階段可以先記：

```txt
定義物件資料格式時，type 和 interface 都可以
```

之後會有獨立章節比較：

```txt
type vs interface
```

---

## Function Property（函式屬性）

物件中的屬性也可以是函式。

```ts
const user: {
  name: string;
  sayHello: () => void;
} = {
  name: "Tom",
  sayHello: () => {
    console.log("Hello");
  },
};
```

---

### 有參數的函式屬性

```ts
const calculator: {
  add: (a: number, b: number) => number;
} = {
  add: (a, b) => {
    return a + b;
  },
};
```

---

## Index Signature（索引簽名）

有時候物件的 key 不固定，但 value 型別固定。

例如：

```ts
const scores = {
  Tom: 90,
  John: 80,
  Mary: 100,
};
```

這時可以使用 Index Signature。

```ts
const scores: {
  [key: string]: number;
} = {
  Tom: 90,
  John: 80,
  Mary: 100,
};
```

---

### 語法說明

```ts
{
  [key: string]: number;
}
```

意思是：

```txt
這個物件的 key 是 string
這個物件的 value 是 number
```

---

### 錯誤示範

```ts
const scores: {
  [key: string]: number;
} = {
  Tom: 90,
  John: "80",
};
```

錯誤：

```txt
Type 'string' is not assignable to type 'number'
```

---

## Record 工具型別

`Record` 也可以用來定義 key-value 物件。

```ts
const scores: Record<string, number> = {
  Tom: 90,
  John: 80,
  Mary: 100,
};
```

---

### Record 語法

```ts
Record<KeyType, ValueType>;
```

例如：

```ts
Record<string, number>;
```

表示：

```txt
key 是 string
value 是 number
```

---

## object、Object、{} 的差異

這三個看起來很像，但實務上不建議混用。

---

### object

`object` 代表非 Primitive Type 的資料。

```ts
let data: object;

data = {};
data = [];
data = function () {};
```

合法。

---

以下不合法：

```ts
data = "Hello";
data = 123;
data = true;
```

因為它們是 Primitive Types。

---

### Object

`Object` 是 JavaScript 的全域建構函式型別。

```ts
let data: Object;
```

通常不建議在一般開發中使用。

---

### {}

`{}` 代表非 `null`、非 `undefined` 的值。

```ts
let data: {};

data = {};
data = [];
data = "Hello";
data = 123;
data = true;
```

這些都可能合法。

所以 `{}` 很容易造成誤解，也不建議隨便使用。

---

### 實務建議

不要這樣寫：

```ts
let user: object;
let data: Object;
let value: {};
```

更推薦明確定義屬性：

```ts
type User = {
  id: number;
  name: string;
};
```

---

## Excess Property Checking（多餘屬性檢查）

TypeScript 對物件字面量會做多餘屬性檢查。

```ts
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
};
```

錯誤原因：

```txt
email 不存在於 User 型別中
```

---

### 為什麼這很重要？

可以避免 API 資料、表單資料或元件 Props 傳錯欄位。

例如原本應該是：

```ts
type User = {
  username: string;
};
```

但寫成：

```ts
const user: User = {
  userName: "Tom",
};
```

TypeScript 可以提前幫你發現錯誤。

---

## 實務開發範例：API 使用者資料

```ts
type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
};
```

---

### API 回傳資料

```ts
const users: User[] = [
  {
    id: 1,
    name: "Tom",
    email: "tom@example.com",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Mary",
    email: "mary@example.com",
    avatarUrl: "https://example.com/avatar.png",
    isAdmin: true,
  },
];
```

---

### 使用資料

```ts
users.forEach((user) => {
  console.log(user.name);
  console.log(user.email);

  if (user.avatarUrl) {
    console.log(user.avatarUrl);
  }
});
```

---

## 實務開發範例：React Props

在 React + TypeScript 中，Props 通常也是物件型別。

```ts
type UserCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};
```

---

```tsx
function UserCard(props: UserCardProps) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      {props.avatarUrl && <img src={props.avatarUrl} alt={props.name} />}
    </div>
  );
}
```

---

## 常見錯誤

### 錯誤 1：缺少必要屬性

```ts
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
};
```

錯誤：

```txt
Property 'name' is missing
```

---

### 錯誤 2：屬性型別錯誤

```ts
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: "1",
  name: "Tom",
};
```

錯誤：

```txt
Type 'string' is not assignable to type 'number'
```

---

### 錯誤 3：修改 readonly 屬性

```ts
type User = {
  readonly id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Tom",
};

user.id = 2;
```

錯誤：

```txt
Cannot assign to 'id' because it is a read-only property
```

---

### 錯誤 4：使用選填屬性前沒有判斷

```ts
type User = {
  name: string;
  email?: string;
};

const user: User = {
  name: "Tom",
};

console.log(user.email.toUpperCase());
```

錯誤：

```txt
'user.email' is possibly 'undefined'
```

---

## 實務開發建議

### 1. 小型物件可以直接寫型別

```ts
const point: {
  x: number;
  y: number;
} = {
  x: 100,
  y: 200,
};
```

---

### 2. 重複使用的物件建議抽成 type 或 interface

```ts
type User = {
  id: number;
  name: string;
};
```

---

### 3. API 資料一定要定義型別

```ts
type Product = {
  id: number;
  title: string;
  price: number;
};
```

---

### 4. 不確定是否存在的欄位使用 `?`

```ts
type User = {
  name: string;
  avatarUrl?: string;
};
```

---

### 5. 不希望被修改的欄位使用 `readonly`

```ts
type User = {
  readonly id: number;
  name: string;
};
```

---

### 6. 避免使用太籠統的 object

不推薦：

```ts
let user: object;
```

推薦：

```ts
type User = {
  id: number;
  name: string;
};
```

---

## 本章重點

✅ Object Type 可以定義物件的資料格式

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Tom",
  age: 18,
};
```

---

✅ 選填屬性使用 `?`

```ts
type User = {
  name: string;
  email?: string;
};
```

---

✅ 唯讀屬性使用 `readonly`

```ts
type User = {
  readonly id: number;
  name: string;
};
```

---

✅ 物件型別建議抽成 `type` 或 `interface`

```ts
type User = {
  id: number;
  name: string;
};
```

---

✅ 不建議使用太籠統的型別

```ts
object;
Object;
{
}
```
