This is an express server to run an extremely basic blog.

To run, ensure Node.js is properly installed. Then, navigate to the install location using command prompt.

Run the following commands.

npm run build
npm run start

The server will then run on the port specificed in server.ts. By default, this port is 3000.

GET / To display home page.
GET /posts/:id to display a specific post by id
POST /add with an applictation like Postman to add a new post. Required fields are postid, title, and content