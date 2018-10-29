# mongoDB in docker
在 docker 中运行 mongoDB, 并将数据库数据保存在 host 中.

## 执行环境
* docker
```
$ docker --version
Docker version 17.06.1-ce, build 874a737
```

* docker-compose
```
$ docker-compose --version
docker-compose version 1.16.0, build ea60ca1
```

## 业务环境
* mongoDB:3.4.7
* 数据库路径 `./db/`
* 数据库名称 `pipeline`
* 连接用户: mongouser, 密码: password, authdatabase: admin

## 生产执行
```
$ docker-compose up
```

## 开发模式
### 执行
```shell
$ docker-compose -f docker-compose.dev.yml up --build --force-recreate
```

### 数据库名称
开发模式的数据库名称为 `pipeline`

### 使用 mongo shell 连接 database
* 查看 containers
```
$ docker ps
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                      NAMES
094340a78222        pipelinemongodb_web   "docker-entrypoint..."   7 seconds ago       Up 4 seconds        0.0.0.0:27017->27017/tcp   pipelinemongodb_web_1
```

* 在新 terminal 进入 container
```shell
// 推荐方式
$ docker exec -it `docker ps -f name=pipeline -q` bash
// 使用 container id 进入
$ docker exec -it 094340a78222 bash
```

* 在 container 里面连接 monggoDB, 使用自带的 mongo shell
```
root@094340a78222:/# mongo
MongoDB shell version v3.4.7
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.7
Welcome to the MongoDB shell.
...
```

* 查看数据库
```
> show dbs
```

* 查看 collection
```
> show collections
```

### 重置数据库
* 删除 `db` 目录
```
$ rm -rf ./db
```
* 恢复 `db` 目录
```
$ git checkout ./db
```

### GUI 工具
[Robo 3T][Robo 3T]

## 初始化数据库
使用一个新的 container 连接 mongo, 并使用 mongo shell 执行 script 初始化数据库. 在 `docker-compose up` 时候运行 `mongo-seed`, 在初始化完成后自动退出.

* mongo script
> [Write Scripts for the mongo Shell][Write Scripts for the mongo Shell]

## 访问控制
为保障数据库安全, 连接时候需要用户认证, mongoDB 的用户认证需要在数据库中添加用户.

* docker 启动 mongo 添加用户
> [How to enable authentication on MongoDB through Docker](https://stackoverflow.com/questions/34559557/how-to-enable-authentication-on-mongodb-through-docker/42973849)

根用户: root / password

* mongod 启动验证
> https://docs.mongodb.com/manual/tutorial/enable-authentication/

* 用户认证方法
用户认证比较好的方式是先连接到认证数据库(如: admin), 然后在切换到业务数据库.

mongo shell 的连接方式, 使用 `--anthenticationDatabase` 指定认证数据库:
```sh
$ mongo -u user -p pass --authenticationDatabase databaseName mongodb:27017/db
```

mongoose 连接方式 -- [Support authSource](https://github.com/Automattic/mongoose/wiki/3.6-Release-Notes#support-authsource):
```js
mongoose.connect('mongodb://user:pass@host:27017/db?authSource=databaseName')
// or
mongoose.connect(uri, { auth: { authSource: 'databaseName' }})
```

## TODO
* [ ] seed shell script retry seed mongoDB when conection timeout
* [ ] add error control for create user

## References
* dockerfile 官方文档
> https://docs.docker.com/engine/reference/builder/

* compose 官方文档
> https://docs.docker.com/compose/compose-file/

* mongod 启动命令官方文档
> https://docs.mongodb.com/manual/reference/program/mongod/

[Robo 3T]: https://robomongo.org/

[Write Scripts for the mongo Shell]: https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

## EOF
