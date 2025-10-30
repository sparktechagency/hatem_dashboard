import CreateBrandForm from "@/components/CarBrand/CreateBrandForm";
import { WarningToast } from "@/helper/ValidationHelper";
import { useCreateBrandMutation } from "@/redux/features/brand/brandApi";
import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createBrand, { isLoading, isSuccess }] = useCreateBrandMutation();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/car-brands")
    }
  }, [isLoading, isSuccess, navigate])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log(data)
    // console.log("Form Data:", JSON.stringify(data, null, 2))

    if(!selectedFile){
      WarningToast("Please, upload an image");
      return
    }

    const finalValues = {
      brandName,
      models: data.models
    }

    const formData = new FormData();
    formData.append("bodyData", JSON.stringify(finalValues));
    formData.append("brandImage", selectedFile);
 
    createBrand(formData);
  }

  return (
    <main className="min-h-full bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Vehicle Brands Form</h1>
        <p className="text-muted-foreground mb-8">Manage vehicle models, generations, and engine specifications</p>
        <CreateBrandForm 
          data={data} 
          brandName={brandName} 
          setBrandName={setBrandName} 
          setData={setData} 
          onSubmit={handleSubmit} 
          selectedFile={selectedFile} 
          setSelectedFile={setSelectedFile}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}


export default CreateBrandPage;