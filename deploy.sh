docker run --rm --privileged docker/binfmt:a7996909642ee92942dcd6cff44b9b95f08dad64
docker buildx build --platform linux/arm64 -t bmagic/twitch-auto-downloader:0.0.10 .
docker push bmagic/twitch-auto-downloader:0.0.10