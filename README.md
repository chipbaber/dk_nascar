# Nascar Data Composite Service Request
This code base is a exploration in MySQL/Node js with the goal of testing out composite REST service creation of public websites related to nascar.

### Node Setup
- clone down the code respo
  ```
  git clone https://github.com/chipbaber/dk_nascar.git
  ```
- Navigate into the directory
  ```
  cd dk_nascar
  ```

- Turn the following commands in order to install the following Node Modules into your directory. Please note that the git modules are not pushed to github. To modify edit the .gitignore file.
  ```
  npm init
  npm install express -save
  npm install mysql -save
  npm install body-parser
  npm install --save dotenv
  npm install node-fetch
  ```

- [Note to self] If using ATOM-runner alt-R will run the command, esc to close. Also install ATOM REST Client plugin for easily testing.

- Start Composite rest service
  ```
  node server.js
  ```

- Look at baseline composite rest results in your browser.
  ```
  http://localhost:8081/getPracticeData/4873&2020
  ```

- Create a file called .env

##Setting up Docker My SQL Image
###Key Commands

- Get and run the image.
```
docker run -d -it --name chipMySQL -p=3306:3306 --env="MYSQL_ROOT_PASSWORD=<add pwd>" mysql:5.7
```


- See if service is running
'''
docker ps
'''

- Start Service
'''
docker start chipMySQL
'''

- Connect into Database
```
mysql -uroot -p<your password>
```

- Create Database
```
CREATE DATABASE dk_nascar;
```

- Use Database
```
use dk_nascar;
```

- Create a table
```
CREATE TABLE IF NOT EXISTS `drivers` (   `id` int(11) NOT NULL AUTO_INCREMENT,   `name` varchar(200) NOT NULL,   `number` int(3) NOT NULL,   PRIMARY KEY (id) );
```

- Test insert

```
insert into drivers (name, number) values ('Brad Keselowski', 2), ('Kyle Bush', 18);
```
