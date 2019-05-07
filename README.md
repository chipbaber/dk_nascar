# dk_nascar
This code base is a exploration in MySQL/Node js with the goal of testing out composite RESt service creation of public websites related to nascar and draftkings.

### Node Setup

- Install the following Node Modules into your directory
```
npm init
npm init –yes
npm install express -save
npm install mysql -save
npm install body-parser
npm install --save dotenv
npm install node-fetch
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

- Connect into MySQL Image
'''
https://github.com/chipbaber/dk_nascar.git
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
