import CreateProductForm from "@/components/CreateProduct/CreateProductForm";

const CreateProductPage = () => {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Product Management</h1>
          <p className="text-muted-foreground">Create and manage your automotive parts inventory</p>
        </div>
        <CreateProductForm />
      </div>
    </main>
  )
}


export default CreateProductPage;