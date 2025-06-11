# 📝 WYSIWYG Editor Component

This is a customizable WYSIWYG (What You See Is What You Get) rich-text editor built with **React**, **TypeScript**, and **Draft.js**. It supports both **controlled** and **uncontrolled** modes and allows for custom toolbar rendering.

---

## ✨ Features

- ⚙️ Controlled and uncontrolled modes
- 🧠 Built with Draft.js & React Hooks
- 🧩 Customizable toolbar via `renderToolbar` prop
- 🪄 API to interact with uncontrolled editor via `ref`
- 💅 Supports common inline styles (Bold, Italic, Underline, Code, etc.)

---

---

## Controlled vs Uncontrolled Modes

- **Controlled Mode:**  
  In controlled mode, the editor’s content is managed via React state. You pass the content as a `value` prop and update it using `onChange`. This allows full control over the editor’s content and easy synchronization with other components or validation logic.

- **Uncontrolled Mode:**  
  In uncontrolled mode, the editor maintains its own internal state. You can interact with it imperatively via a `ref` by calling methods like `getRawContent` or `setRawContent` to read or update the content externally without needing to update React state on every change.

---

## 🧪 Running Tests

To run the tests, use the following command:

`````bash
npm run test



## 🚀 Getting Started

````bash
npm install
npm run dev

`````
