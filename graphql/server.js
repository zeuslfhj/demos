const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphql } = require('graphql');
const { schema, root } = require('./graphQLSchema');
const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();
app.use(express.static('views'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/playground', expressPlayground({ endpoint: '/graphql-test' }));

app.post('/graphql-test', (req, res) => {
    const { body : queryStr } = req;

    graphql(schema, queryStr.query, root).then(queryRet => res.json(queryRet));
});

app.post('/query', (req, res) => {
    const { body : queryStr } = req;

    graphql(schema, queryStr.query, root).then((queryRet) => {
        console.log('response', queryRet);
        if (queryRet.errors) {
            throw queryRet.errors;
        }
        res.json(queryRet.data);
    }).catch(() => {
        res.status(500);
    });
});

app.listen(3000, () => {
    console.log('server has started');
});