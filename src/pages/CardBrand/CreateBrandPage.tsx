import DynamicForm from "@/components/CarBrand/DynamicForm"
import type React from "react"
import { useState } from "react"

const initialData = {
  models: [
    {
      modelName: "",
      generations: [
        {
          generationName: "",
          body: "",
          productionStart: "",
          productionEnd: "",
          engines: [
            {
              engineCode: "",
              kw: "",
              hp: "",
              ccm: "",
              fuelType: "",
            },
          ],
        },
      ],
    },
  ],
}

const CreateBrandPage = () => {
  const [data, setData] = useState(initialData);
  const [brandName, setBrandName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(data)
    console.log("Form Data:", JSON.stringify(data, null, 2))
  }

  return (
    <main className="min-h-full bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Vehicle Brands Form</h1>
        <p className="text-muted-foreground mb-8">Manage vehicle models, generations, and engine specifications</p>
        <DynamicForm data={data} brandName={brandName} setBrandName={setBrandName} setData={setData} onSubmit={handleSubmit}/>
      </div>
    </main>
  )
}


export default CreateBrandPage;