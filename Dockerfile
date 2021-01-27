FROM node:14

# Create work directory
WORKDIR /src

# Install runtime dependencies
RUN npm install -g typescript pm2

# Copy app source to work directory
COPY . /src

# Install app dependencies
RUN yarn install

# Build
RUN yarn build

#Expose port
EXPOSE 3000

CMD ["yarn", "start"]
