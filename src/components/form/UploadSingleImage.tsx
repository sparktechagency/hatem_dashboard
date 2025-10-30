import type React from "react"
import { useRef } from "react"
import { X, Plus } from "lucide-react";

type TProps = {
  selectedFile: File | null,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}

const UploadSingleImage = ({ selectedFile, setSelectedFile }: TProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-md font-semibold text-slate-700 mb-2">Upload Brand Image</h2>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Image previews */}
      {!selectedFile ? (
        <>
           {/* trigger */}
            <div  onClick={triggerFileInput} className="border-2 cursor-pointer border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-gray-400 mb-4">
                    <Plus className="w-12 h-10 mx-auto mb-2" />
                    <p className="text-lg">Click "Add Image" to upload files</p>
                </div>
            </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(selectedFile) || "/placeholder.svg"}
                  alt={`Preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Remove button */}
              <button
                onClick={removeFile}
                className="absolute top-2 cursor-pointer right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


export default UploadSingleImage;