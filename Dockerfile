FROM node:14
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN useradd -d /spearmint spearmint
USER spearmint
WORKDIR /spearmint
COPY package.json .
RUN npm run install-once 
COPY . .
EXPOSE 3000
USER root
RUN chown root /spearmint/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /spearmint/node_modules/electron/dist/chrome-sandbox
USER spearmint
CMD ["npm", "start"]