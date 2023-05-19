import prisma from '../../../lib/prisma'

type updateData = {
    name: string;
    id: string;
    description: string;
}

type reqDatafromFrontend = {
    name: string
    description: string
    userId: string
}




const resolvers = {

    Query: {
        getDocuments: async () => {
            const allDocuments = await prisma.document.findMany({
                where: { active: true }
            })
            return (allDocuments)
        },
        searchUserDocument: async (_: any, args: { userId: string }, context: any) => {
            const { userId } = args;

            try {
                const userDocuments = await prisma.document.findMany({
                    where: { userId }
                })
                console.log(userDocuments)
                return userDocuments ? userDocuments : null;
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("User's document not found.")
            }

        },


        searchDocument: async (_: any, args: { id: string }, context: any) => {
            const { id } = args;

            try {
                const searchDocument = await prisma.document.findMany({
                    where: {
                        id,
                        active: true

                    }
                });
                return searchDocument ? searchDocument : null;
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Failed to update document");
            }
        },
    },


    Mutation: {
        updateDocument: async (_: any, args: { updateData: updateData }, context: any) => {
            const { name, id, description } = args.updateData;

            try {
                const updatedDocument = await prisma.document.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                        description,
                    },
                });

                return updatedDocument ? updatedDocument : null;
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Failed to update document");
            }
        },

        createDocument: async (_: any, args: { requestDocumentData: reqDatafromFrontend }, context: any) => {
            const { description, name, userId } = args.requestDocumentData;


            try {
                const createDocument = await prisma.document.create({
                    data: { description, name, userId, active: true }
                })

                return createDocument ? { success: true } : { error: "Document not created." };
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Document not created.");
            }
        },
        inactivateDocument: async (_: any, args: { id: string }, context: any) => {
            const { id } = args;

            try {
                const documentState = await prisma.document.findUnique({
                    where: { id },
                    select: { active: true }
                })


                const inactivateDocument = await prisma.document.update({
                    where: { id },
                    data: { active: !(documentState?.active) }

                })
                return inactivateDocument ? { success: true } : { error: "Document is still active." }
            } catch (error) {
                throw new Error("Some error occured.")
            }


        }
    },


}







export default resolvers