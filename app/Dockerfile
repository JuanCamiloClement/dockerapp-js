FROM node:18
COPY . .
WORKDIR /app
RUN npm i
RUN useradd -ms /bin/bash admin
USER admin
CMD ["npm", "run", "dev"] 