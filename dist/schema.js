'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Customer Type
var CustomerType = new _graphql.GraphQLObjectType({
  name: 'Customer',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      name: { type: _graphql.GraphQLString },
      email: { type: _graphql.GraphQLString },
      age: { type: _graphql.GraphQLInt }
    };
  }
});

// Root Query
var RootQuery = new _graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: _graphql.GraphQLString }
      },
      resolve: function resolve(parentValue, args) {
        return _axios2.default.get('http://localhost:3000/customers/' + args.id).then(function (response) {
          return response.data;
        });
      }
    },
    customers: {
      type: new _graphql.GraphQLList(CustomerType),
      resolve: function resolve(parentValue, args) {
        return _axios2.default.get('http://localhost:3000/customers').then(function (response) {
          return response.data;
        });
      }
    }
  }
});

var mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        email: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        age: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
      },
      resolve: function resolve(parentValue, args) {
        return _axios2.default.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        }).then(function (response) {
          return response.data;
        });
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
      },
      resolve: function resolve(parentValue, args) {
        return _axios2.default.delete('http://localhost:3000/customers/' + args.id).then(function (response) {
          return response.data;
        });
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        name: { type: _graphql.GraphQLString },
        email: { type: _graphql.GraphQLString },
        age: { type: _graphql.GraphQLInt }
      },
      resolve: function resolve(parentValue, args) {
        return _axios2.default.patch('http://localhost:3000/customers/' + args.id, args).then(function (response) {
          return response.data;
        });
      }
    }
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});