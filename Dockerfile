FROM node:21-bookworm

# Install pipx & streamlink
RUN apt update -y && apt install -y pipx
RUN PIPX_HOME=/opt/pipx PIPX_BIN_DIR=/usr/local/bin pipx install git+https://github.com/streamlink/streamlink.git@6.7.4

# Install app
WORKDIR /usr
COPY main.js .
COPY package.json .
COPY package-lock.json .
RUN npm install 

# Run app
CMD ["node", "main.js"]
