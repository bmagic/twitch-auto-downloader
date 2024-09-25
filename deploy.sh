docker run --privileged --rm tonistiigi/binfmt --install all
docker --debug buildx build --platform linux/arm64 --tag bmagic/twitch-auto-downloader:0.0.11 --push .