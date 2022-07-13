FROM node:lts-alpine

WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk update && apk add --no-cache nmap && \
    echo @edge https://mirrors.aliyun.com/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://mirrors.aliyun.com/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . /app

RUN npm install
EXPOSE 9001
CMD ["npm", "run", "start"]
