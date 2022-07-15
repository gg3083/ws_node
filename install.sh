docker rm -f wa_v1
docker build -f Dockerfile -t wa:v1  .
docker run --name wa_v1 \
-d -p 9001:9001 wa:v1
docker logs -f wa_v1
