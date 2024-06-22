# Order Management System

Welcome to the Order Management System! This comprehensive application is designed to manage orders, products, and user carts efficiently. Below, you'll find detailed information on how to set up the project, the available endpoints, and how to use them.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up the Environment](#setting-up-the-environment)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
  - [Auth Endpoints](#auth-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Order Endpoints](#order-endpoints)
  - [Cart Endpoints](#cart-endpoints)
  - [User Endpoints](#user-endpoints)
- [Swagger Documentation](#swagger-documentation)

## Prerequisites

Before you begin, ensure you have the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL database installed and running.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/zeyadwaleed03/slash-backend-technical-assesment.git
    cd slash-backend-technical-assesment
    ```

    <button onclick="copyToClipboard('git clone https://github.com/zeyadwaleed03/slash-backend-technical-assesment.git\ncd slash-backend-technical-assesment')">Copy Commands</button>

2. **Install dependencies:**

    ```bash
    npm install
    ```

    <button onclick="copyToClipboard('npm install')">Copy Command</button>

## Setting Up the Environment

Create a `.env` file in the `src` folder with the following content:

```dotenv
DATABASE_URL="your-database-url"
SECRET='your-secret-key'
PORT=your-port-number

<p>Ensure to replace the placeholder values with your actual database URL, secret key, and desired port number.</p><h2>Running the Project</h2><ol><li><p><strong>Start the PostgreSQL database:</strong></p><p>Ensure your PostgreSQL server is running and accessible with the credentials provided in the <code>.env</code> file.</p></li><li><p><strong>Run database migrations:</strong></p><pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Copy code</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npx prisma migrate dev
</code></div></div></pre><p>&lt;button onclick="copyToClipboard('npx prisma migrate dev')"&gt;Copy Command&lt;/button&gt;</p></li><li><p><strong>Start the server:</strong></p><pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>Copy code</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npm run start
</code></div></div></pre><p>&lt;button onclick="copyToClipboard('npm run start')"&gt;Copy Command&lt;/button&gt;</p></li></ol><p>The server will run on the port specified in your <code>.env</code> file.</p><h2>API Endpoints</h2><h3>Auth Endpoints</h3><h4>Create new user</h4><ul><li><strong>URL:</strong> <code>/api/auth/signup</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Register a new user with their email, password, name, and address.</li></ul><h4>Sign in a user</h4><ul><li><strong>URL:</strong> <code>/api/auth/login</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Authenticate a user using their email and password, returning a JWT token upon successful login.</li></ul><h3>Product Endpoints</h3><h4>Add a new product</h4><ul><li><strong>URL:</strong> <code>/api/products</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Add a new product to the inventory. Requires product details such as name, description, price, and stock quantity.</li></ul><h4>View all products</h4><ul><li><strong>URL:</strong> <code>/api/products</code></li><li><strong>Method:</strong> <code>GET</code></li><li><strong>Description:</strong> Retrieve a list of all products available in the inventory.</li></ul><h4>Delete a product</h4><ul><li><strong>URL:</strong> <code>/api/products/{productId}</code></li><li><strong>Method:</strong> <code>DELETE</code></li><li><strong>Description:</strong> Delete a specific product from the inventory using the product ID.</li></ul><h4>Update a product</h4><ul><li><strong>URL:</strong> <code>/api/products/{productId}</code></li><li><strong>Method:</strong> <code>PATCH</code></li><li><strong>Description:</strong> Update the details of a specific product using the product ID. You can update fields like name, description, price, and stock quantity.</li></ul><h3>Order Endpoints</h3><h4>Create a new order</h4><ul><li><strong>URL:</strong> <code>/api/orders</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Create a new order for the authenticated user, including details of the ordered products and their quantities.</li></ul><h4>Update order status by orderId</h4><ul><li><strong>URL:</strong> <code>/api/orders/{orderId}/status</code></li><li><strong>Method:</strong> <code>PUT</code></li><li><strong>Description:</strong> Update the status of an order by providing the order ID and the new status.</li></ul><h4>Get order details by orderId</h4><ul><li><strong>URL:</strong> <code>/api/orders/{orderId}</code></li><li><strong>Method:</strong> <code>GET</code></li><li><strong>Description:</strong> Retrieve detailed information about a specific order using the order ID.</li></ul><h4>Apply coupon to the latest order</h4><ul><li><strong>URL:</strong> <code>/api/orders/apply-coupon</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Apply a coupon code to the latest order of the authenticated user to receive discounts or other benefits.</li></ul><h3>Cart Endpoints</h3><h4>Add product to cart</h4><ul><li><strong>URL:</strong> <code>/api/cart/add</code></li><li><strong>Method:</strong> <code>POST</code></li><li><strong>Description:</strong> Add a product to the authenticated user's cart. Requires product ID and quantity.</li></ul><h4>View user cart</h4><ul><li><strong>URL:</strong> <code>/api/cart/{userId}</code></li><li><strong>Method:</strong> <code>GET</code></li><li><strong>Description:</strong> Retrieve the contents of the authenticated user's cart, including product details and quantities.</li></ul><h4>Update product quantity in cart</h4><ul><li><strong>URL:</strong> <code>/api/cart/update</code></li><li><strong>Method:</strong> <code>PUT</code></li><li><strong>Description:</strong> Update the quantity of a specific product in the user's cart. Requires product ID and the new quantity.</li></ul><h4>Remove product from cart</h4><ul><li><strong>URL:</strong> <code>/api/cart/remove/{productId}</code></li><li><strong>Method:</strong> <code>DELETE</code></li><li><strong>Description:</strong> Remove a specific product from the user's cart using the product ID.</li></ul><h3>User Endpoints</h3><h4>View user orders</h4><ul><li><strong>URL:</strong> <code>/api/users/{userId}/orders</code></li><li><strong>Method:</strong> <code>GET</code></li><li><strong>Description:</strong> Retrieve all orders made by the specified user, providing details of each order including status, products, and total price.</li></ul><h2>Swagger Documentation</h2><p>For detailed API documentation and testing, visit the Swagger UI at <code>http://localhost:your-port/api/docs</code>. Replace <code>your-port</code> with the port number specified in your <code>.env</code> file.</p><hr><p>Thank you for using the Order Management System! If you have any questions, feel free to open an issue or contact me. Happy coding!</p>