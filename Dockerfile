FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY start.sh .

RUN chmod +x /app/start.sh

EXPOSE 3000

CMD ["npm", "start"]

ENTRYPOINT [ "/app/start.sh" ]
