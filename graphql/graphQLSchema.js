const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => 'hello world' };

module.exports = {
    schema,
    root
} ;