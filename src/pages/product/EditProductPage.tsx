import EditProductForm from "@/components/EditProduct";

const EditProductPage = () => {
   return (
      <main className="min-h-screen bg-background py-8 px-4">
         <div className="mx-auto">
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-foreground mb-2">
                  Edit Product
               </h1>
               <p className="text-muted-foreground">
                  Update the details of your automotive part
               </p>
            </div>
            <EditProductForm />
         </div>
      </main>
   );
};

export default EditProductPage;
