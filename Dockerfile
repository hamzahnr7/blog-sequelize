FROM node:16-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
ENV NODE_ENV=production
COPY . .
RUN yarn build
EXPOSE 4000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
