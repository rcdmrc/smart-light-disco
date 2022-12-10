FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt upgrade -y
RUN apt install -y nodejs npm
COPY . /app
WORKDIR /app
ENTRYPOINT [ "npm", "start" ]