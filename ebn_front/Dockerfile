FROM node:latest

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

RUN npm install --save react-apexcharts apexcharts --force

COPY . .

EXPOSE 3000

CMD ["yarn","start"]