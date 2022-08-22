FROM node:alpine                 
WORKDIR /app
COPY package.json .
RUN npm install -g npm
RUN npm install --force
COPY . .
ENV REACT_APP_REMOTE_SERVICE_BASE_URL="" 
EXPOSE 3000
CMD ["npm","start"]

