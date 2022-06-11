# FROM node:14
FROM node:16.13
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxshmfence-dev libdrm-dev \
    libdrm2 libgconf2-dev libgbm-dev xvfb dbus-x11 libxtst6 \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    libudev-dev libgtkextra-dev libgbm1\
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -d /spearmint spearmint
#creates home directory for the user and ensures bash is default shell 
# USER spearmint
USER root
# root here to bypass permissions, not the best way to do this 
WORKDIR /spearmint 
# WORKDIR sets the working directory for subsequent commands
COPY . .
COPY package.json .

# RUN npm run install-once
# # RUN npm install
RUN rm -rf node_modules
# remove node modules from the file and only leave dependencies to be installed later 
# RUN npm install -g npm@latest
# USER node 
RUN npm install -force 
# global configuration 
# RUN npm install --save --legacy-peer-deps
# "restor peer dependy instalatino behavrio from NPM v4 thru v6"
# RUN npx electron-forge package
# RUN npx electron-forge make
RUN npx electron-rebuild -f -w node-pty


# EXPOSE 3000
EXPOSE 3001
# Electron needs root for sandboxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /spearmint/node_modules/electron/dist/chrome-sandbox 
# adding additional layers to the image without deleteing the previos layer
RUN chmod 4755 /spearmint/node_modules/electron/dist/chrome-sandbox
# USER spearmint
#commands to try to run using XQuartz 
# RUN apt-get update && apt-get install -y firefox
# CMD ["/usr/bin/firefox"]

# ADD start.sh /
# RUN chmod +x /start.sh

# CMD ["/start.sh"]
USER root
CMD bash
# CMD npm run start
