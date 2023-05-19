import { gql } from "apollo-server-core";

const typeDefs = gql`
  input updateRevisionData {
    id:String
  title:    String
  content:  String
  published: Boolean
  }

  input requestRevisionData {
  pageId: String
  title:    String
  content:  String
  userId:String
  }

  type Revision {
    id:     String 
  pageId: String
  title:    String
  content:  String
  userId:String
  published: Boolean
  }
  
  type response{
  success:Boolean
  error:String
}

  type Query {
    getAllRevision(pageId:String): [Revision]
    getSingleRevision(id:String):Revision
  }

  type Mutation {
    updateRevision(updateRevisionData: updateRevisionData): Revision
    createRevision(requestRevisionData:requestRevisionData):response
    inactivateRevision(id:String):response
  }
`;

export default typeDefs;

