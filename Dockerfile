#stage 1: build from official docker hub node.js images
#docker image base untuk build aplikasi
FROM node:lts-alpine as build

#set the working directory
WORKDIR /app

#copy the package.json and package-lock.json
COPY package*.json ./

#install the depedencies
RUN npm install

ARG NEXT_PUBLIC_TMDB_API_KEY
ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY

#copy the rest of the application code
COPY . .
RUN npm run build
#start app
EXPOSE 3000
CMD ["npm", "run", "start"]