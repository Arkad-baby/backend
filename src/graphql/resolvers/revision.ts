import prisma from '../../../lib/prisma'

type updateRevisionData = {
    id:string
    title: string
    content: string
    published: boolean
}

type requestRevisionData = {
    pageId: string
    title: string
    content: string
    userId: string
}




const resolvers = {

    Query: {
        getAllRevision: async (_: any, args: { pageId: string }, context: any) => {
            const { pageId } = args;
            try {
                const allRevisionOfaPage = await prisma.revision.findMany({
                    where: { published: true, pageId }
                })
                return (allRevisionOfaPage)
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Pages not found.")
            }

        },
        getSingleRevision: async (_: any, args: { id: string }, context: any) => {
            const { id } = args;
            try {
                const aRevisionOfaPage = await prisma.revision.findMany({
                    where: { published: true, id }
                })
                return (aRevisionOfaPage)
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Revision not found.")
            }

        },


    },


    Mutation: {
        updateRevision: async (_: any, args: { updateRevisionData: updateRevisionData }, context: any) => {
            const {id,  title, content } = args.updateRevisionData;

            try {
                const updatedRevision = await prisma.pages.update({
                    where: {
                        id,
                    },
                    data: {
                        title,
                        content,
                     
                    },
                });

                return updatedRevision ? updatedRevision : null;
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Failed to update revision.");
            }
        },

        createPages: async (_: any, args: { requestRevisionData: requestRevisionData }, context: any) => {
            const { pageId, title, content, userId } = args.requestRevisionData;


            try {
                const createRevisionForaPage = await prisma.revision.create({
                    data: { pageId, title, content, published: true, userId }
                })

                return createRevisionForaPage ? { success: true } : { error: "Document not created." };
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Revision not created.");
            }
        },
        inactivateRevision: async (_: any, args: { id: string }, context: any) => {
            const { id } = args;

            try {
                const revisionState = await prisma.revision.findUnique({
                    where: { id },
                    select: { published: true }
                })


                const inactivateRevision = await prisma.revision.update({
                    where: { id },
                    data: { published: !(revisionState?.published) }

                })
                return inactivateRevision ? { success: true } : { error: "Revision is still active." }
            } catch (error) {
                throw new Error("Some error occured.")
            }


        }
    },


}

export default resolvers