# smapi

Send Email HTTP API

# Install

```
git clone https://github.com/bomaidea/smapi.git && cd smapi
docker build -t smapi .
docker run -p 3000:3000 -d smapi
```

## Test

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from":"john@example.com","subject":"Subject Email Test","message":"Message Email Test"}' \
  http://localhost:3000/send
```
