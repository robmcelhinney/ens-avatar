FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE $PORT
ENV PROXY_API=$PROXY_API
CMD ["npm", "run", "buildrun"]
