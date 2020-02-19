# Bulk-Purchase-App

## About

- Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.

- The app will has an option for sellers to host their products along with the minimum bulk dispatch quantity.

- Various customers can select from the listed products and order them with their own required quantity.

- When enough orders are placed for the product and bulk quantity requirements are met, the vendor can dispatch the order

## Requirements:

- Python3
- Nodejs
- Reactjs
- Expressjs
- MongoDb

## Running the program

### Node

- sudo apt-get update
- sudo apt-get install nodejs
- sudo apt-get install npm

### MongoDB

- sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
- echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
- sudo apt-get update
- sudo apt-get install -y mongodb-org
- sudo systemctl start mongod
- sudo systemctl status mongod
- sudo systemctl enable mongod

### React

- npm install -g create-react-app

### Express

- npm i express

## Running the code

Run Express:

```
cd backend/
npm install
npm start
```

Run React:

```
cd fronted/
npm install/
npm start
```

---

_Coded by:_
**Akshat Goyal**
