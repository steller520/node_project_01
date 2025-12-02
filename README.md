# ShoppyGlobe E-commerce API

This repository contains the backend API for the ShoppyGlobe E-commerce application, built with Node.js, Express, and MongoDB.

## Features

*   **Product Management:** Full CRUD operations for products.
*   **User Authentication:** JWT-based user registration and login.
*   **Shopping Cart:** Persistent shopping cart for authenticated users.
*   **Input Validation:** All endpoints are protected with schema-based validation using Joi.
*   **Centralized Error Handling:** A global error handler ensures consistent error responses.

## Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm
*   MongoDB (A connection URI is required)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/steller520/node_project_01.git
    cd node_project_01
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create the environment file:**
    Create a file named `.env` in the root of the project and add the following variables:

    ```env
    # A long, random, and secret string for signing JWTs
    SECRET_KEY=your_jwt_secret_key_here

    # Your MongoDB connection string
    DB_URI=your_mongodb_connection_string_here

    # The port the server will run on (optional, defaults to 3000)
    PORT=3000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (or on port 3000 by default).

---

## API Documentation

### Authentication

To access protected routes, you must first register and then log in. The login endpoint will return a JWT. Include this token in the `Authorization` header for all protected requests.

**Header Format:** `Authorization: JWT <your_token_here>`

### User Routes

*   **`POST /register`**
    *   Registers a new user.
    *   **Body:**
        ```json
        {
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }
        ```

*   **`POST /login`**
    *   Authenticates a user and returns a JWT.
    *   **Body:**
        ```json
        {
            "email": "test@example.com",
            "password": "password123"
        }
        ```

### Product Routes

*   **`GET /products`**: Fetches a list of all products.
*   **`GET /products/:id`**: Fetches details of a single product by its ID.
*   **`POST /products`**: Creates a new product.
    *   **Body:**
        ```json
        {
            "name": "New Gadget",
            "price": 99.99,
            "description": "The latest and greatest gadget.",
            "stock": 100
        }
        ```
*   **`PUT /products/:id`**: Updates an existing product.
*   **`DELETE /products/:id`**: Deletes a product.

### Cart Routes (Protected)

*   **`GET /cart`**: Fetches the logged-in user's shopping cart.
*   **`POST /cart`**: Adds an item to the cart. If the item already exists, its quantity is increased.
    *   **Body:**
        ```json
        {
            "productId": "60d5f2c5c5b5c5e5f5f5f5f5",
            "quantity": 1
        }
        ```
*   **`DELETE /cart/:productId`**: Removes an item completely from the cart.

---

## Testing and Database Screenshots

This section provides screenshots from API testing with ThunderClient and from the MongoDB database, as required for the project submission.

### 1. API Testing (ThunderClient)

#### User Authentication

**POST /register - Register a New User**
![Register User](path/to/your/register-user-screenshot.png)

**POST /login - Login User and Get JWT**
![Login User](path/to/your/login-user-screenshot.png)

---

#### Product Routes

**GET /products - Fetch All Products**
![Fetch All Products](path/to/your/get-products-screenshot.png)

**POST /products - Create a New Product**
![Create Product](path/to/your/create-product-screenshot.png)

---

#### Cart Routes (Authenticated)

**GET /cart - Fetch User's Cart**
![Fetch Cart](path/to/your/get-cart-screenshot.png)

**POST /cart - Add Item to Cart**
![Add to Cart](path/to/your/add-to-cart-screenshot.png)

**PUT /cart - Update Item Quantity**
![Update Quantity](path/to/your/update-quantity-screenshot.png)

**DELETE /cart/:productId - Remove a Single Item**
![Remove Single Item](path/to/your/remove-item-screenshot.png)

**DELETE /cart - Empty the Entire Cart**
![Empty Cart](path/to/your/empty-cart-screenshot.png)

---

### 2. MongoDB Database Screenshots

**Users Collection**
![Users Collection](path/to/your/users-collection-screenshot.png)

**Products Collection**
![Products Collection](path/to/your/products-collection-screenshot.png)

**Carts Collection**
![Carts Collection](path/to/your/carts-collection-screenshot.png)

---
