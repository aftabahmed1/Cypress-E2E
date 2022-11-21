FROM cypress/base:14.16.0

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --save-dev cypress

RUN npm install

RUN $(npm bin)/cypress verify

RUN $(npm bin)/cypress

ENTRYPOINT [ "npm","run","cypress:e2e" ]

