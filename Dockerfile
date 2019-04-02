FROM node:latest
RUN mkdir -p /project_one_boiler
WORKDIR /project_one_boiler
ADD . /project_one_boiler
RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn cache clean
EXPOSE 3000
