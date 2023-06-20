FROM node:18.12.0-alpine

WORKDIR /usr/app

COPY ./app ./app
RUN cd app && yarn install

WORKDIR /usr/app/app

EXPOSE 3000

CMD ["yarn", "start"]

# cd DrZebra-Factory
# docker build -t dz:auth-api -f ./api/auth-api/Dockerfile .    
# docker run --restart always --ip 33.3.2.107 -p 5001:3000 dz:auth-api
