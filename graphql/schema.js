import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql/type';
import {resolver} from 'graphql-sequelize';
import Project from '../storage/models/Project';

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
      resolve: resolver(Project)
    }
  }
});

const schema = new GraphQLSchema({
  query: RootType
});

export default schema;
