FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install lightningcss-linux-x64-gnu

RUN npm cache clean --force
RUN npm ci --force

RUN npm rebuild lightningcss

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]