# EGO - Event Grand Organization Reservation System

This repository is a reservation system for events. It allows you to manage reservations for any event effortlessly.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- Git

### Installation

1. **Clone the repository:**

   Open a terminal and run:

   ```powershell
   git clone <repository-url>

   ```

2. **Navigate through the directory**

```
cd path\to\your\repository\EGO
```

3. **install modules**

```
npm install

npm install express
npm i mongoose
npm i validator

node app.js #run javascript file
```

4. **set up your env file with the same names in the mongoose and index files**
   ```
   npm i dotenv
   ```
   set up your .env with the needed configrations
5. **additional configs**
   ```
   npm install --save-dev jest # for testing
   npm install bcrypt #password hashing
   npm install body-parser # read jason file to export into html views
   npm install --save-dev nodemon #for auto restart
   ```
6. **FRONTEND CONFIGS**
   ```
   cd src/View
   ```
   ```
   npm i
   npm i axios
   npm install react-icons
   npm run dev #to run your frontend
   ```
 
## Architecture
```
EGO/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── database/
│   └── View/         # React frontend (Vite)
├── .env
├── .gitignore
├── package.json      # Backend dependencies
└── index.js          # Server entry point
```
