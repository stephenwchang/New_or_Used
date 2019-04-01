FROM node:8.10.0
RUN mkdir -p /project_one_boiler
WORKDIR /project_one_boiler
ADD . /project_one_boiler
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN chmod a+rwx  /usr/local/bin/yarn*
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
EXPOSE 3000
