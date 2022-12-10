FROM ubuntu
RUN apt update
RUN apt upgrade -y
RUN apt install -y nodejs npm
COPY . /app
WORKDIR /app
ENTRYPOINT [ "npm", "start" ]