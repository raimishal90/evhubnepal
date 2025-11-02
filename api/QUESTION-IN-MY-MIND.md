### What difference between String and string in typescript

`string` Refers to the primitive string

```javascript
let name: string = "John"; // ✅ Correct
```

`String` Refers to the String object wrapper like `new String()`

```javascript
let name: String = new String("John"); // ⚠️ Not recommended
```

```javascript
const a: string = "hello";           // primitive string
const b: String = new String("hi");  // String object

console.log(typeof a); // "string"
console.log(typeof b); // "object"
```
