# use node version 16.13
FROM node:16.13
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxshmfence-dev libdrm-dev \
    libdrm2 libgconf2-dev libgbm-dev xvfb dbus-x11 libxtst6 \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    libudev-dev libgtkextra-dev libgbm1\
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -d /spearmint spearmint

# root here to bypass permissions, not the best way to do this 
# USER spearmint
USER root

# WORKDIR sets the working directory for subsequent commands
WORKDIR /spearmint 

COPY . .
COPY package.json .

# remove node modules from the file and only leave dependencies to be installed later 
RUN rm -rf node_modules
# install node modules
RUN npm install -force 
RUN npx electron-rebuild -f -w node-pty


# EXPOSE port 3001
EXPOSE 3001

# Electron needs root for sandboxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /spearmint/node_modules/electron/dist/chrome-sandbox 
# adding additional layers to the image without deleteing the previos layer
RUN chmod 4755 /spearmint/node_modules/electron/dist/chrome-sandbox

# USER spearmint
USER root
CMD bash
