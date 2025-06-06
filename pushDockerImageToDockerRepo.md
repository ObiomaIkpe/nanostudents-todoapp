## 🐳 Fixing Docker Push Error: "requested access to the resource is denied"

When you run:

```bash
docker push nanostudents-todoapp_app:latest
```

You may get this error:

```text
denied: requested access to the resource is denied
```

This happens because Docker tries to push the image to the **default public namespace (`library/`)** on Docker Hub, which **you do not have permission to write to**.

---

### ✅ Solution: Tag the image with your Docker Hub username

Assuming your Docker Hub username is `nanostudents`:

---

### 🔧 Step-by-Step Instructions

#### 1. **Tag your image correctly**

```bash
docker tag nanostudents-todoapp_app:latest nanostudents/nanostudents-todoapp_app:latest
```

This tells Docker to push to your personal Docker Hub repository.

---

#### 2. **Login to Docker Hub**

```bash
docker login
```

Enter your **username** and **password** when prompted.

---

#### 3. **Push the image**

```bash
docker push nanostudents/nanostudents-todoapp_app:latest
```

If successful, the image will be available at:

```
https://hub.docker.com/r/nanostudents/nanostudents-todoapp_app
```

---

### 🧠 Summary

```
- Docker requires images to be pushed to a repository you own.
- The default namespace "library/" is restricted.
- Always tag your image with your Docker Hub username before pushing.
```

**Use this pattern:**

```bash
docker tag local-image username/repo-name:tag
docker push username/repo-name:tag
```
