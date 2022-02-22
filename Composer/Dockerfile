FROM  mcr.microsoft.com/dotnet/core/sdk:3.1-focal as base

RUN apt update
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs libgomp1
RUN npm install -g yarn

# Install BotFramework Composer
RUN git clone --branch release/2.1.1 https://github.com/microsoft/BotFramework-Composer.git
WORKDIR /BotFramework-Composer/Composer
RUN yarn install --network-timeout 100000
RUN yarn build

# The app is hosted at port 3000
EXPOSE 3000

# Start the service when the container starts
CMD ["yarn", "startall"]