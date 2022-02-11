# FROM node:14
FROM node:16.13
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN useradd -d /spearmint spearmint
USER spearmint
WORKDIR /spearmint 
# WORKDIR sets the working directory for subsequent commands
COPY . .
COPY package.json .
# RUN npm run install-once
# RUN npm install
RUN npm install -g npm@latest
RUN npm install --save --legacy-peer-deps
RUN npx electron-rebuild
# EXPOSE 3000
EXPOSE 3001
# Electron needs root for sandboxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /spearmint/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /spearmint/node_modules/electron/dist/chrome-sandbox
USER spearmint

# ADD start.sh /
# RUN chmod +x /start.sh

# CMD ["/start.sh"]

CMD ["npm","start"]
