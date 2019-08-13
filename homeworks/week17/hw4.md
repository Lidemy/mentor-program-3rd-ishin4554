```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??

```

# 輸出結果
2
2
undefined

# 流程

## Global 編譯
- 建立 global lexical environment 
- 建立 global execution context (EC)
- 設定 lexicalEnvironment, variableEnvironment
- 放入 Call Stack 

```javascript
golabalEC = {
  lexicalEnvironment: {
    environmentRecord: {
      ...(預設的基礎屬性),
      obj: undefined, 
      obj2: undefined,
      hello: undefined,
    },
    outer: null,
  },
  variableEnvironment: {
    environmentRecord: {
      globalObject: {},
      outer: null,
    }
  }
  this: undefined //非 strict 模式為 globalObject
}
```

## Global 執行
- obj 賦值物件位置在 lexicalEnvironment 之中
```javascript
{
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
```
- obj2 賦值 obj.inner 位置在 lexicalEnvironment 之中
- hello 賦值 obj.inner.hello 位置在 lexicalEnvironment 之中

## 匿名函數編譯
- 建立匿名函數 lexical environment 
- 建立匿名函數 execution context (EC)，由於呼叫方式是利用 obj.inner 來呼叫，所以 this 指向 obj.inner
- 設定 lexicalEnvironment, variableEnvironment
- 放入 Call Stack 


```javascript
anonymousEC = {
  lexicalEnvironment: {
    environmentRecord: {},
    outer: null,
  },
  variableEnvironment: {
    environmentRecord: {
      globalObject: {},
      outer: null,
    }
  }
  this: obj.inner
}
```

## 匿名函數執行
- `console.log(this.value)` 放入 call stack 
- 執行 `console.log(this.value)` log `2` pop 掉 `console.log(this.value)`
- pop 掉 hello()

## 匿名函數編譯
- 建立匿名函數 lexical environment 
- 建立匿名函數 execution context (EC)，由於呼叫方式是利用 obj2 來呼叫，所以 this 指向 obj2 指向 obj.inner
- 設定 lexicalEnvironment, variableEnvironment
- 放入 Call Stack 

```javascript
anonymousEC = {
  lexicalEnvironment: {
    environmentRecord: {},
    outer: null,
  },
  variableEnvironment: {
    environmentRecord: {
      globalObject: {},
      outer: null,
    }
  }
  this: obj2
}
```

## 匿名函數執行
- `console.log(this.value)` 放入 call stack 
- 執行 `console.log(this.value)` log `2` pop 掉 `console.log(this.value)`
- pop 掉 hello()

## hello 編譯
- 建立 hello 函數 lexical environment 
- 建立 hello 函數 execution context (EC)，由於呼叫方式沒有使用特定的 base 來呼叫，所以 this 指向 undefined 
- 設定 lexicalEnvironment, variableEnvironment
- 放入 Call Stack 
```javascript
anonymousEC = {
  lexicalEnvironment: {
    environmentRecord: {},
    outer: null,
  },
  variableEnvironment: {
    environmentRecord: {
      globalObject: {},
      outer: null,
    }
  }
  this: undefined
}
```

## hello 函數執行
- `console.log(this.value)` 放入 call stack 
- 執行 `console.log(this.value)` log `undefined` pop 掉 `console.log(this.value)`
- pop 掉 hello()

- pop 掉 global