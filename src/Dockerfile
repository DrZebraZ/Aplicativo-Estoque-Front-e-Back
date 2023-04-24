FROM node:18.12.0-alpine

WORKDIR /usr/app

COPY ./src ./src
RUN cd src && yarn install

WORKDIR /usr/app/src

EXPOSE 3001

CMD ["yarn", "dev"]

# cd DrZebra-Factory
# docker build -t dz:auth-api -f ./api/auth-api/Dockerfile .    
# docker run --restart always --ip 33.3.2.107 -p 5001:3000 dz:auth-api
