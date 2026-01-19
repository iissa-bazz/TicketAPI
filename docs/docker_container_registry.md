
## Publishing Images to GitHub Container Registry

### Prerequisites

1. **GitHub Personal Access Token (PAT)**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes: `write:packages`, `read:packages`, `delete:packages`
   - Copy the token (you'll only see it once!)

2. **Login to GitHub Container Registry**

```bash
# Set your token as an environment variable
export CR_PAT=YOUR_GITHUB_TOKEN

# Login to GitHub Container Registry (YOUR_USERNAME=iissa-bazz)
echo $CR_PAT | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

### Build and Tag Images

```bash
# Build images with proper tags
docker compose build

# Tag images for GitHub Container Registry
docker tag ticket-backend:latest ghcr.io/YOUR_USERNAME/ticketing-backend:latest
docker tag ticket-frontend:latest ghcr.io/YOUR_USERNAME/ticketing-frontend:latest

# Optional: Tag with version
docker tag ticket-backend:latest ghcr.io/YOUR_USERNAME/ticketing-backend:v1.0.0
docker tag ticket-frontend:latest ghcr.io/YOUR_USERNAME/ticketing-frontend:v1.0.0
```

### Push Images to Registry

```bash
# Push images to GitHub Container Registry
docker push ghcr.io/YOUR_USERNAME/ticketing-backend:latest
docker push ghcr.io/YOUR_USERNAME/ticketing-frontend:latest

# Push versioned tags
docker push ghcr.io/YOUR_USERNAME/ticketing-backend:v1.0.0
docker push ghcr.io/YOUR_USERNAME/ticketing-frontend:v1.0.0
```

### Make Images Public

By default, GitHub Container Registry images are private. To make them public:

1. Go to https://github.com/YOUR_USERNAME?tab=packages
2. Click on your package (ticketing-backend or ticketing-frontend)
3. Click "Package settings" (bottom right)
4. Scroll to "Danger Zone"
5. Click "Change visibility" → "Public"
6. Confirm the change





### Automated Publishing with GitHub Actions

Create `.github/workflows/docker-publish.yml`:

```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ main ]
    tags: [ 'v*.*.*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  BACKEND_IMAGE_NAME: ${{ github.repository }}-backend
  FRONTEND_IMAGE_NAME: ${{ github.repository }}-frontend

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata for Backend
        id: meta-backend
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.BACKEND_IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Build and push Backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ steps.meta-backend.outputs.tags }}
          labels: ${{ steps.meta-backend.outputs.labels }}

      - name: Extract metadata for Frontend
        id: meta-frontend
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.FRONTEND_IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Build and push Frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.meta-frontend.outputs.tags }}
          labels: ${{ steps.meta-frontend.outputs.labels }}
```

Now every push to `main` will automatically build and publish your images!

---

## Data Persistence Explained

### How Data is Stored

The ticket data is stored in two ways depending on your setup:

#### Local Build (docker-compose.yml)
```yaml
volumes:
  - ./backend/data:/data  # Maps to host filesystem
```
- ✅ Data stored in `backend/data/tickets.json` on your machine
- ✅ Easy to inspect and backup
- ✅ Persists even after `docker compose down -v`

#### Pre-built Images (docker-compose.prod.yml)
```yaml
volumes:
  - ticket-data:/data  # Docker named volume
```
- ✅ Data stored in Docker-managed volume
- ✅ Persists between container restarts
- ⚠️ Deleted with `docker compose down -v`

### Backup Your Data

```bash
# For local build (direct file access)
cp backend/data/tickets.json backend/data/tickets.backup.json

# For pre-built images (export from volume)
docker compose -f docker-compose.prod.yml exec backend cat /data/tickets.json > tickets.backup.json
```

### Restore Data

```bash
# For local build
cp backend/data/tickets.backup.json backend/data/tickets.json
docker compose restart backend

# For pre-built images
docker compose -f docker-compose.prod.yml exec -T backend sh -c 'cat > /data/tickets.json' < tickets.backup.json
docker compose -f docker-compose.prod.yml restart backend
```

---

## Troubleshooting

### Port 80 Already in Use

**Error:** `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution:** Change the port in docker-compose.yml:
```yaml
frontend:
  ports:
    - "8080:80"  # Use port 8080 instead
```
Then access at http://localhost:8080

### Containers Won't Start

```bash
# Check container status
docker compose ps

# Check logs for errors
docker compose logs

# Restart everything
docker compose down
docker compose up -d
```

### Frontend Shows "Cannot connect to server"

```bash
# Check backend is running
docker compose ps backend

# Check backend health
docker compose exec backend curl http://localhost:8000/tickets

# Check network connectivity
docker compose exec frontend ping backend
```

### Permission Denied on Linux

```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and back in, then verify
docker ps
```

### Clear Everything and Start Fresh

```bash
# Stop all containers
docker compose down -v

# Remove all images
docker rmi ticket-backend ticket-frontend

# Rebuild from scratch
docker compose build --no-cache
docker compose up -d
```

---

## Development vs Production

### Development Setup (Local Build)
- Use `docker-compose.yml`
- Hot reload enabled (if configured)
- Debug logging enabled
- Source code mounted as volumes

### Production Setup (Pre-built Images)
- Use `docker-compose.prod.yml`
- Optimized images from registry
- Production logging
- No source code dependencies

---

## Summary of Commands

### Local Build
```bash
# First time setup
git clone https://github.com/YOUR_USERNAME/ticketing-system.git
cd ticketing-system
docker compose build
docker compose up -d

# Daily use
docker compose up -d        # Start
docker compose logs -f      # View logs
docker compose down         # Stop
```

### Pre-built Images
```bash
# First time setup
curl -O https://raw.githubusercontent.com/YOUR_USERNAME/ticketing-system/main/docker-compose.prod.yml
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

# Daily use
docker compose -f docker-compose.prod.yml up -d     # Start
docker compose -f docker-compose.prod.yml logs -f   # View logs
docker compose -f docker-compose.prod.yml down      # Stop
docker compose -f docker-compose.prod.yml pull      # Update to latest
```

---

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Container Registry Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

---

## License

MIT License - See LICENSE file for details

## Contributing

Pull requests are welcome! Please open an issue first to discuss proposed changes.