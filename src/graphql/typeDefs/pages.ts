import { gql } from "apollo-server-core";

const typeDefs = gql`
  input updatePageData {
   id:     String 
  pageNumber:Int
  title:    String
  content:  String
  active: Boolean
  }

  input requestPagesData {
  pageNumber:Int
  title:    String
  content:  String
  active: Boolean
  documentId:String
  }

  type Pages {
    id:     String 
  documentId: String
  pageNumber:Int
  title:    String
  content:  String
  active: Boolean
  }
  
  type response{
  success:Boolean
  error:String
}

  type Query {
    getPages(documentId:String): [Pages]
  }

  type Mutation {
    updatePages(updatePageData: updatePageData): Pages
    createPages(requestPagesData:requestPagesData):response
    inactivatePage(id:String):response
  }
`;

export default typeDefs;

