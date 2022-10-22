FROM node:gallium-alpine3.14
WORKDIR /src
ENV NODE_ENV=production

#copy application files
COPY src .
RUN npm i 

CMD node index.js
EXPOSE 3000