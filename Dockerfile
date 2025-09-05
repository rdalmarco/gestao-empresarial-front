FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 3000

ENV NEXT_PUBLIC_API_URL=http://localhost:3000

CMD ["npm", "start"]