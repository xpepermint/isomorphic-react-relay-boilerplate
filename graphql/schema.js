import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql/type';

const ProjectType = new GraphQLObjectType({
  name: 'ProjectType',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  }
});

const RootType = new GraphQLObjectType({
  name: 'RootType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() { // you'll replace this with a promise from a database
        return [
          {id: 1, name: `Project 1`},
          {id: 2, name: `Project 2`}
        ];
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootType
});

export default schema;
