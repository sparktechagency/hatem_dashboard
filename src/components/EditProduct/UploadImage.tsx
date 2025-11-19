import type React from "react";
import { useRef } from "react";
import { Plus, Pencil } from "lucide-react";

type TProps = {
   selectedFile: File | null;
   setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
   label?: string;
   initialImage?: string;
};

const UploadSingleImage = ({
   selectedFile,
   setSelectedFile,
   label,
   initialImage,
}: TProps) => {
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
         setSelectedFile(files[0]);
      }
   };

   // const removeFile = () => {
   //    setSelectedFile(null);
   // };

   const triggerFileInput = () => {
      fileInputRef.current?.click();
   };

   const getImageUrl = (file: File) => {
      return URL.createObjectURL(file);
   };

   const imageUrl = selectedFile
      ? getImageUrl(selectedFile)
      : initialImage || "/placeholder.svg";

   return (
      <div className="max-w-xl">
         <h2 className="text-md font-semibold text-slate-700 mb-2">
            {label || "Upload Product Image"}
         </h2>

         {/* Hidden file input */}
         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
         />

         {/* Image preview or upload area */}
         {imageUrl === "/placeholder.svg" ? (
            <div
               onClick={triggerFileInput}
               className="border-2 cursor-pointer border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            >
               <div className="text-gray-400 mb-4">
                  <Plus className="w-12 h-10 mx-auto mb-2" />
                  <p className="text-lg">Click to upload image</p>
                  <p className="text-sm text-gray-500 mt-1">
                     Supports: JPG, PNG, GIF
                  </p>
               </div>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
               <div className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                     <img
                        src={imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  {/* Edit and Remove buttons - visible on hover */}
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button
                        type="button"
                        onClick={triggerFileInput}
                        className="bg-blue-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                        title="Edit image"
                     >
                        <Pencil className="w-4 h-4" />
                     </button>
                     {/* <button
                        type="button"
                        onClick={removeFile}
                        className="bg-red-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-red-600 transition-colors shadow-lg"
                        title="Remove image"
                     >
                        <X className="w-4 h-4" />
                     </button> */}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default UploadSingleImage;
