var express = require('express');
const request = require('request');
const querystring = require('querystring');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sms_send', function(req, res, next) {
  let code = ("000000" + Math.floor(Math.random() * 999999)).slice(-6);
  let queryData = querystring.stringify({
    "mobile": req.body.phone,  // 接受短信的用户手机号码
    "tpl_id": req.body.tpl_id,  // 您申请的短信模板ID，根据实际情况修改
    "tpl_value": `#code#=${code}`,  // 您设置的模板变量，根据实际情况修改
    "key": req.body.key,  // 应用APPKEY(应用详细页查询)
  });

  let queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;

  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // 打印接口返回内容

      let jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
      res.json(jsonObj);
    } else {
      console.log('请求异常');
    }
  })
});

module.exports = router;
