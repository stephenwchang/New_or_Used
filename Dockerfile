FROM node:6.9.5
RUN mkdir -p /project_one
WORKDIR /project_one
ADD . /project_one
RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn cache clean
EXPOSE 3000
