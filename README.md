# 🚀 Job Management System (RBAC)

## 📌 Overview
This is a **Single Page Application (SPA)** built using **Angular 12+** with **Node.js**  The application demonstrates **Role-Based Access Control (RBAC)** by differentiating between "General Users" and "Admin Users." It includes **user authentication, role-based data access, and user management functionalities.**

## ✨ Features
- 🔐 **Login Page**
  - Users can log in with a **User ID, Password, and Role**.
  - Roles: `General User` and `Admin`.
  - Authentication handled via a **dummy API** with data storage in **XML, MongoDB, or AWS DynamoDB**.

- 🏠 **Dashboard (After Login)**
  - Displays **user details** and a list of records accessible to the logged-in user.
  - Uses an **API to fetch and display data** in a table format.
  - Implements **asynchronous API processing** with intentional delays to showcase async handling.

- 🛠️ **Admin Features**
  - **Manage users** stored in the database (**MongoDB/AWS DynamoDB/XML**).
  - **Add, update, and delete** user accounts.
  - Assign **roles and permissions** to users.

- ⚡ **Performance & Optimization**
  - **Modularized** services and components for maintainability.
  - Implements **lazy loading** and efficient API calls.
  - Uses **Async/Await and Observables** for handling API responses.

## 🏗️ Tech Stack
- **Frontend:** Angular 12+ ⚡
- **Backend:** Node.js 🟢
- **Database:** XML🗄️
- **Authentication:** Dummy API with session handling 🔑




## 🚀 Installation & Setup
### 📌 Prerequisites
- **Node.js** (v14+)
- **Angular CLI** (v12+)
- **MongoDB** (if using MongoDB as a database)

## 🔧 Backend Setup
```bash
cd backend
npm install
npm start
```

### 🎨 Frontend Setup
```bash
cd frontend
npm install
ng serve
```



## 📌 GitHub Repository
The source code is available at **[GitHub Repository](https://github.com/Amar9nani/Job-management-system-RBAC.git)**.


