# Creating Docker image

After creating the server build the docker image

Create the file `Dockerfile` for the docker image, and write inside:

```
FROM node:10

# create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./package.json
RUN npm install
# following line only for production
# RUN npm ci --only=production

# byndle app source
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
```

Then create the file `.dockerignore` and write inside:

```
node_modules
npm-debug.log
```

Now build your image:

```
docker build -t bomaidea/smapi .
```

Then check that the images has been created correctly:

```
docker images
```

Now run the image:

```
docker run -p 8080:8080 -d bomaidea/smapi
```

Now check that the container is running and the server has been started correctly:

```
docker ps
docker logs <container id>
```

Finllay request the page on the server:

```
curl localhost:8080
```

