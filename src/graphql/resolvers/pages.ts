import prisma from '../../../lib/prisma'

type updatePageData = {
    id: string
    pageNumber:number
    title: string
    content: string
    active: boolean
}

type requestPagesData = {
    pageNumber: number
    title: string
    content: string
    active: boolean
    documentId :string
}




const resolvers = {

    Query: {
        getPages: async (_: any, args: { documentId: string }, context: any) => {
            const {documentId}=args;
            try{
                     const allPagesOfaDocument = await prisma.pages.findMany({
                where: { active: true, documentId }
            })
            return (allPagesOfaDocument)  
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Pages not found.")
            }
     
        },


    },


    Mutation: {
        updatePages: async (_: any, args: { updatePageData: updatePageData }, context: any) => {
            const { pageNumber, id, title,content,active } = args.updatePageData;

            try {
                const updatedPage = await prisma.pages.update({
                    where: {
                        id,
                    },
                    data: {
                        pageNumber,
                        title,
                        content,
                        active,
                    },
                });

                return updatedPage ? updatedPage : null;
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("Failed to update page.");
            }
        },

        createPages: async (_: any, args: { requestPagesData: requestPagesData }, context: any) => {
            const { pageNumber, title, content, active,documentId } = args.requestPagesData;


            try {
                const createPageForaDocument = await prisma.pages.create({
                    data: { pageNumber, title, content, active: true,documentId }
                })

                return createPageForaDocument ? { success: true } : { error: "Document not created." };
            } catch (error) {
                // Handle any errors that occur during the update process
                console.error(error);
                throw new Error("page not created.");
            }
        },
        inactivatePage: async (_: any, args: { id: string }, context: any) => {
            const { id } = args;

            try {
                const PageState = await prisma.pages.findUnique({
                    where: { id },
                    select: { active: true }
                })


                const inactivatePages = await prisma.pages.update({
                    where: { id },
                    data: { active: !(PageState?.active) }

                })
                return inactivatePages ? { success: true } : { error: "Page is still active." }
            } catch (error) {
                throw new Error("Some error occured.")
            }


        }
    },


}







export default resolvers