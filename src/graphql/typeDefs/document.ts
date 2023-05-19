import { gql } from "apollo-server-core";

const typeDefs = gql`
  input UpdateData {
    name: String
    id: String
    description: String
    userId:String
  }
  input requestDocumentData {
    name: String
    description: String
    userId: String
  }

  type Document {
    id: String
    name: String
     description: String
     userId:String
  }
  
  type response{
  success:Boolean
  error:String
}

  type Query {
    getDocuments: [Document]
    searchDocument(id:String):[Document]
    searchUserDocument(userId:String):[Document]
  }

  type Mutation {
    updateDocument(updateData: UpdateData): Document
    createDocument(requestDocumentData:requestDocumentData):response
    inactivateDocument(id:String):response
  }
`;

export default typeDefs;

