const request = require('request');

request('https://1829261908225492.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/aliyunFunDemo/aliyunFunDemo/?params=1', {json: true}, (err, res, body) => {
    if (err) {
        return console.log(err);
    }

    console.log(body);
});