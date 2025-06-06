## 🐳 Dockerfile Explained (Node.js App)

The `Dockerfile` is a set of instructions Docker uses to build a custom image for our app.

```Dockerfile
# 1. Start with a base image of Node.js
#can use any version of node, but must be compatible with the node version you used to create the app.
FROM node:18 

# 2. Set the working directory inside the container
WORKDIR /app 

# 3. Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# 4. Install the app dependencies inside the container
RUN npm install

# 5. Copy the rest of the app’s code into the container
COPY . .

# 6. Expose the port that the app will run on
EXPOSE 3000

# 7. Start the application when the container runs
CMD [ "node", "index.js" ]
```

### 📝 Summary of What Happens:
- We're using **Node.js 18** as our starting point.
- We set `/app` as the folder inside the container to work in.
- We copy files and install packages using `npm install`.
- We then copy all our source code into the image.
- We tell Docker to expose **port 3000**, because that’s where our app listens.
- Finally, we tell Docker how to start the app: `npm start`.

---

## ⚙️ docker-compose.yml Explained

`docker-compose.yml` helps us run **multiple containers** (like app + database) with just one command: `docker-compose up`.

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - MONGO_URL=mongodb://mongo:27017/todoapp
    depends_on:
      - mongo

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### 🔍 Explanation of Sections:

#### `version: "3.8"`
- Specifies which version of the Docker Compose file format we're using.

#### `services:` 
- This is where we define the containers (services) we want to run.

#### `web:` (our Node.js app)
- **build: .** → Docker will use the Dockerfile in the current directory to build the app image.
- **ports:** → Maps port `3000` on your computer to port `3000` inside the container.
- **volumes:** → Mounts your code inside the container, so changes on your machine are reflected live.
  - `.:/app` → current folder to container’s `/app`.
  - `/app/node_modules` → avoids overwriting node_modules inside container.
- **environment:** → Sets environment variables (like the MongoDB URL).
- **depends_on:** → Makes sure the `mongo` container starts first.

#### `mongo:` (MongoDB database)
- **image: mongo** → Uses the official MongoDB image from Docker Hub.
- **ports:** → Maps port `27017` from container to your computer.
- **volumes:** → Stores MongoDB data in a named volume so it doesn't disappear when the container stops.

#### `volumes:`
- Declares a **named volume** called `mongo-data` to persist MongoDB data.

---

✅ With this setup, you can run both your app and the MongoDB database with a single command:

```bash
docker-compose up
```

This will build your app container and start both the app and MongoDB.