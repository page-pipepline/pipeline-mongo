/**
 * mongdoDB seed script
 * @Author: CntChen
 * @Date: 2017-09-16
 */

 /**
  * `db` is a global variable set to the mongoDB connection's specified database
  * example: `mongodb:27017/moonlihgt-local` will specified `moonlight-local` database
  */

const date = new Date();

const createTemplateParams = {
  condition: {
  },
  payload1: {
    id: 1,
    name: 'Vue框架模板',
    createTime: date,
    updateTime: date,
  },
  payload2: {
    id: 2,
    name: 'React框架模板',
    createTime: date,
    updateTime: date,
  },
};

try {
  if (db.templates.find(createTemplateParams.condition).toArray().length === 0) {
    db.templates.insertOne(createTemplateParams.payload1);
    db.templates.insertOne(createTemplateParams.payload2);
    print('seed data: seed management success');
  }
  print('seed data: success');
} catch (e) {
  print('seed data: fail');
  print('seed data: error:');
  printjson(e);
}
