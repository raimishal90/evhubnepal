```
initdb: error: directory "/var/lib/postgresql/data" exists but is not empty

```

### ✅ Step 1: Stop and remove old container (optional but clean)

```bash
docker compose down
```

### ✅ Step 2: Delete old data

```bash
sudo rm -rf ./api/postgres-data/*
```

*(If you are on macOS, remove `sudo` if not required)*

### ✅ Step 3: Start again

```bash
docker compose up -d
```

This time it will successfully initialize because the folder is empty.

---

### ✅ Extra Tip (to avoid this in the future)

Always pin a version for Postgres in your docker-compose:

```yaml
image: postgres:15
```

Without specifying a version (`image: postgres`), Docker may download a newer major version later, causing the same error.

---
