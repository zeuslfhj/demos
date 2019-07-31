const getRawBody = require('raw-body')

/*
if you open the initializer feature, please implement the initializer function, as below:
module.exports.initializer = function(context, callback) {
  console.log('initializing');
  callback(null, ''); 
};
*/

// module.exports.handler = function(event, context, callback) { 
//   console.log('hello world');
//   callback(null, 'hello world'); 
// };

module.exports.handler = function(req, response, context) {
  getRawBody(req, (err, body) => {
    const respBody = {
      headers: req.headers,
      url: req.url,
      path: req.path,
      queries: req.queries,
      method: req.method,
      clientIP: req.clientIP,
      body: body.toString()
    };
    
    response.setStatusCode(200);
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(respBody, null, 4));
  });
}