# 🧭 Travel Memo API

This project provides a simple **Express.js + MongoDB (Mongoose)** backend for managing users and travel memos.

---

## 🚀 Getting Started

1. Open the `backend` folder in terminal
2. Run:
   ```bash
   npm start
   ```

The API is documented with Swagger UI at:  
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🗂️ Database Structure

There are two main collections (schemas) in the database:

### 1. User

- `googleId`: Google login ID (**required, unique**)
- `name`: User’s name
- `email`: Email (**unique**)
- `avatar`: Profile picture
- Auto-generated `createdAt` and `updatedAt` timestamps

### 2. Memo

- `user`: Reference to a **User** (ObjectId, required)
- `location`: GeoJSON object
  - `type`: always `"Point"`
  - `coordinates`: `[longitude, latitude]` (**required**)
- `country`: Country (**required**)
- `city`: City (**required**)
- `title`: Title of the memo
- `notes`: Notes / travel description
- `photos`: Array of photo URLs
- Auto-generated `createdAt` and `updatedAt` timestamps
- Index on `location` for geospatial queries

---

## ⚙️ API Endpoints

Currently, the backend supports **basic CRUD operations** (only **GET** and **POST** for now):

### Users

- `POST /users` → Create a new user
- `GET /users` → Get all users

### Memos

- `POST /memos` → Create a new memo
- `GET /memos` → Get all memos

You can test these endpoints directly in **Swagger UI**.

---

## 🖥️ Example Frontend Usage

### Fetch all users

```js
fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((data) => console.log("All users:", data));
```

### Create a new user

```js
fetch("http://localhost:3000/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    googleId: "123456789",
    name: "Alice",
    email: "alice@example.com",
    avatar: "https://example.com/avatar.jpg",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Created user:", data));
```
