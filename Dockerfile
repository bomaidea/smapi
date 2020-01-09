FROM node:10

# create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
# following line only for production
# RUN npm ci --only=production

# byndle app source
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]


