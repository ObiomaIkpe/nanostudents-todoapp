Understanding how to access data sent with an HTTP request in Express is fundamental for building robust APIs. Express provides several properties on the `req` (request) object to help you do this.

Here's a breakdown of the most common ones:

### `1. req.params`

* *   **Purpose:** Used to capture dynamic values directly from the URL path. These are typically used to identify specific resources or entities within a URL.
*     
* *   **How it's defined:** In your Express route definition, you use colons (`:`) to denote a URL parameter.
*     
* *   **Example Route Definition:**
*     
*     ```
*     router.get('/products/:productId/reviews/:reviewId', (req, res) => {
*         // ...
*     });
*     ```
*     
* *   **Example Request URL:** `GET /products/123/reviews/456`
*     
* *   **How to Access:**
*     
*     ```
*     // Inside the route handler:
*     const productId = req.params.productId; // Value: '123'
*     const reviewId = req.params.reviewId;   // Value: '456'
*     ```
*     
* *   **Common Use Cases:** Retrieving a specific user by ID (`/users/:id`), fetching a particular post (`/posts/:slug`).
*     

### `2. req.query`

* *   **Purpose:** Used to capture values from the URL's query string. These are typically used for filtering, sorting, pagination, or providing optional parameters.
*     
* *   **How it's defined:** Appears after a question mark (`?`) in the URL, with key-value pairs separated by ampersands (`&`).
*     
* *   **Example Request URL:** `GET /api/notes?status=completed&limit=10&sortBy=createdAt`
*     
* *   **How to Access:**
*     
*     ```
*     // Inside the route handler:
*     const status = req.query.status;     // Value: 'completed'
*     const limit = req.query.limit;       // Value: '10' (always a string)
*     const sortBy = req.query.sortBy;     // Value: 'createdAt'
*     ```
*     
* *   **Common Use Cases:** Filtering a list of items (`/products?category=electronics`), paginating results (`/articles?page=2&pageSize=20`), searching (`/search?q=nodejs`).
*     

### `3. req.body`

* *   **Purpose:** Used to capture data sent in the request's body. This is primarily used for sending data in `POST`, `PUT`, and sometimes `PATCH` requests, especially when creating new resources or updating existing ones with complex data.
*     
* *   **How it's defined:** The client sends this data, typically in JSON (`Content-Type: application/json`) or URL-encoded (`Content-Type: application/x-www-form-urlencoded`) format.
*     
* *   **Prerequisite:** You need middleware like `express.json()` or `express.urlencoded()` configured in your Express application to parse the incoming request body and make it available on `req.body`.
*     
* *   **Example Request (POST):**
*     
*     * *   **URL:** `POST /api/notes`
*     *     
*     * *   **Body (JSON):**
*     *     
*     *     ```
*     *     {
*     *         "title": "Buy Groceries",
*     *         "description": "Milk, eggs, bread"
*     *     }
*     *     ```
*     *     
* *   **How to Access:**
*     
*     ```
*     // Inside the route handler (after express.json() middleware):
*     const { title, description } = req.body;
*     // title: 'Buy Groceries'
*     // description: 'Milk, eggs, bread'
*     ```
*     
* *   **Common Use Cases:** Creating a new user, submitting a form, updating a document.
*     

### Other Related Request Properties:

* *   **`req.headers`:**
*     
*     * *   **Purpose:** An object containing the HTTP headers sent with the request.
*     *     
*     * *   **Example:** `req.headers.authorization` (for JWT tokens), `req.headers['content-type']`.
*     *     
*     * *   **Use Case:** Accessing authentication tokens, content type, user agent, etc.
*     *     
* *   **`req.cookies`:**
*     
*     * *   **Purpose:** An object containing cookies sent by the client.
*     *     
*     * *   **Prerequisite:** Requires `cookie-parser` middleware.
*     *     
*     * *   **Use Case:** Accessing session IDs or user preferences stored in cookies.
*     *     
* *   **`req.files`:**
*     
*     * *   **Purpose:** An object containing information about uploaded files.
*     *     
*     * *   **Prerequisite:** Requires a file upload middleware like `multer`.
*     *     
*     * *   **Use Case:** Handling file uploads (e.g., profile pictures, document attachments).
*     *     
* *   **`req.ip`:**
*     
*     * *   **Purpose:** The remote IP address of the request.
*     *     
*     * *   **Use Case:** Logging, rate limiting, geographical targeting.
*     *     
* *   **`req.method`:**
*     
*     * *   **Purpose:** The HTTP method of the request (e.g., `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`).
*     *     
*     * *   **Use Case:** Conditional logic based on the request type.
*     *     
* *   **`req.url` / `req.originalUrl`:**
*     
*     * *   **Purpose:** The request URL path. `req.url` is relative to the mount path, while `req.originalUrl` is the full request URL path.
*     *     
*     * *   **Use Case:** Logging, redirecting, constructing full URLs.
*     *     

In summary, choosing between `req.params`, `req.query`, and `req.body` depends entirely on _how_ the client sends data and _what kind_ of data is being sent. `req.params` for path segments, `req.query` for URL parameters, and `req.body` for data in the request payload.