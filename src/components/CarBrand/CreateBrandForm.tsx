import type { IEngine, IGeneration, IModel } from "@/types/carBrand.type";
import React, { useState } from "react";
import UploadSingleImage from "../form/UploadSingleImage";

interface FormData {
   models: IModel[];
}

interface TProps {
   brandName: string;
   setBrandName: React.Dispatch<React.SetStateAction<string>>;
   selectedFile: File | null;
   setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
   data: FormData;
   setData: (data: FormData) => void;
   onSubmit: (e: React.FormEvent) => void;
   isLoading: boolean;
}

const CreateBrandForm = ({
   brandName,
   setBrandName,
   selectedFile,
   setSelectedFile,
   data,
   setData,
   onSubmit,
   isLoading,
}: TProps) => {
   const isEngineComplete = (engine: IEngine) => {
      return (
         engine.engineCode.trim() !== "" &&
         engine.kw.trim() !== "" &&
         engine.hp.trim() !== "" &&
         engine.ccm.trim() !== "" &&
         engine.fuelType.trim() !== ""
      );
   };

   const isGenerationComplete = (generation: IGeneration) => {
      return (
         generation.generationName.trim() !== "" &&
         generation.body.trim() !== "" &&
         generation.productionStart.trim() !== "" &&
         generation.productionEnd.trim() !== ""
      );
   };

   const isModelComplete = (model: IModel) => {
      return (
         model.modelName.trim() !== "" &&
         model.generations.length > 0 &&
         model.generations.every(
            (gen) =>
               isGenerationComplete(gen) &&
               gen.engines.length > 0 &&
               gen.engines.every((eng) => isEngineComplete(eng))
         )
      );
   };

   const isFormValid = () => {
      return (
         data.models.length > 0 &&
         data.models.every((model) => isModelComplete(model))
      );
   };

   const canAddEngine = (modelIndex: number, genIndex: number) => {
      const generation = data.models[modelIndex].generations[genIndex];
      if (!isGenerationComplete(generation)) return false;
      if (generation.engines.length === 0) return true;
      return isEngineComplete(
         generation.engines[generation.engines.length - 1]
      );
   };

   const canAddGeneration = (modelIndex: number) => {
      const model = data.models[modelIndex];
      if (model.generations.length === 0) return false;
      const lastGen = model.generations[model.generations.length - 1];
      return (
         isGenerationComplete(lastGen) &&
         lastGen.engines.length > 0 &&
         lastGen.engines.every((eng) => isEngineComplete(eng))
      );
   };

   const canAddModel = () => {
      if (data.models.length === 0) return false;
      return isModelComplete(data.models[data.models.length - 1]);
   };

   const handleInputChange = (
      modelIndex: number,
      genIndex: number | undefined,
      engineIndex: number | undefined,
      field: string,
      value: string
   ) => {
      const newData = JSON.parse(JSON.stringify(data));
      if (engineIndex !== undefined && genIndex !== undefined) {
         newData.models[modelIndex].generations[genIndex].engines[engineIndex][
            field
         ] = value;
      } else if (genIndex !== undefined) {
         newData.models[modelIndex].generations[genIndex][field] = value;
      } else {
         newData.models[modelIndex][field] = value;
      }
      setData(newData);
   };

   const addModel = () => {
      if (!canAddModel()) return;
      const newData = JSON.parse(JSON.stringify(data));
      newData.models.push({
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
      });
      setData(newData);
   };

   const addGeneration = (modelIndex: number) => {
      if (!canAddGeneration(modelIndex)) return;
      const newData = JSON.parse(JSON.stringify(data));
      newData.models[modelIndex].generations.push({
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
      });
      setData(newData);
   };

   const addEngine = (modelIndex: number, genIndex: number) => {
      if (!canAddEngine(modelIndex, genIndex)) return;
      const newData = JSON.parse(JSON.stringify(data));
      newData.models[modelIndex].generations[genIndex].engines.push({
         engineCode: "",
         kw: "",
         hp: "",
         ccm: "",
         fuelType: "",
      });
      setData(newData);
   };

   const removeModel = (modelIndex: number) => {
      const newData = JSON.parse(JSON.stringify(data));
      newData.models.splice(modelIndex, 1);
      setData(newData);
   };

   const removeGeneration = (modelIndex: number, genIndex: number) => {
      const newData = JSON.parse(JSON.stringify(data));
      newData.models[modelIndex].generations.splice(genIndex, 1);
      setData(newData);
   };

   const removeEngine = (
      modelIndex: number,
      genIndex: number,
      engineIndex: number
   ) => {
      const newData = JSON.parse(JSON.stringify(data));
      newData.models[modelIndex].generations[genIndex].engines.splice(
         engineIndex,
         1
      );
      setData(newData);
   };

   const [expandedModel, setExpandedModel] = useState(0);
   const [expandedGeneration, setExpandedGeneration] = useState<
      Record<string, boolean>
   >({});

   return (
      <div className="min-h-[60vh] bg-gradient-to-br from-slate-50 to-slate-100 p-8">
         <div className="max-w-4xl mx-auto">
            <form onSubmit={onSubmit} className="space-y-6">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                     Brand Name *
                  </label>
                  <input
                     type="text"
                     value={brandName}
                     onChange={(e) => setBrandName(e.target.value)}
                     required
                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                     placeholder="Enter brand name"
                  />
               </div>
               <UploadSingleImage
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
               />

               {/* Models */}
               {data.models.map((model, modelIndex) => (
                  <div
                     key={modelIndex}
                     className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200"
                  >
                     {/* Model Header */}
                     <div
                        className="bg-slate-800 text-white p-4 cursor-pointer hover:bg-slate-700 transition-colors flex items-center justify-between"
                        onClick={() =>
                           setExpandedModel(
                              expandedModel === modelIndex ? -1 : modelIndex
                           )
                        }
                     >
                        <div className="flex items-center gap-3">
                           <span
                              className={`transform transition-transform ${
                                 expandedModel === modelIndex ? "rotate-90" : ""
                              }`}
                           >
                              ▶
                           </span>
                           <h2 className="text-lg font-semibold">
                              Model {modelIndex + 1}:{" "}
                              {model.modelName || "Untitled"}
                           </h2>
                        </div>
                        {data.models.length > 1 && (
                           <button
                              type="button"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 removeModel(modelIndex);
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
                           >
                              Remove
                           </button>
                        )}
                     </div>

                     {/* Model Content */}
                     {expandedModel === modelIndex && (
                        <div className="p-6 space-y-6">
                           {/* Model Name Input */}
                           <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                 Model Name *
                              </label>
                              <input
                                 type="text"
                                 value={model.modelName}
                                 onChange={(e) =>
                                    handleInputChange(
                                       modelIndex,
                                       undefined,
                                       undefined,
                                       "modelName",
                                       e.target.value
                                    )
                                 }
                                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                 placeholder="Enter model name"
                              />
                           </div>

                           {/* Generations */}
                           <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-slate-800">
                                 Generations
                              </h3>
                              {model.generations.map((generation, genIndex) => (
                                 <div
                                    key={genIndex}
                                    className="bg-slate-50 rounded-lg border border-slate-300 overflow-hidden"
                                 >
                                    {/* Generation Header */}
                                    <div
                                       className="bg-slate-600 text-white p-4 cursor-pointer hover:bg-slate-500 transition-colors flex items-center justify-between"
                                       onClick={() =>
                                          setExpandedGeneration({
                                             ...expandedGeneration,
                                             [`${modelIndex}-${genIndex}`]:
                                                !expandedGeneration[
                                                   `${modelIndex}-${genIndex}`
                                                ],
                                          })
                                       }
                                    >
                                       <div className="flex items-center gap-3">
                                          <span
                                             className={`transform transition-transform ${
                                                expandedGeneration[
                                                   `${modelIndex}-${genIndex}`
                                                ]
                                                   ? "rotate-90"
                                                   : ""
                                             }`}
                                          >
                                             ▶
                                          </span>
                                          <h4 className="font-semibold">
                                             Generation {genIndex + 1}:{" "}
                                             {generation.generationName ||
                                                "Untitled"}
                                          </h4>
                                       </div>
                                       {model.generations.length > 1 && (
                                          <button
                                             type="button"
                                             onClick={(e) => {
                                                e.stopPropagation();
                                                removeGeneration(
                                                   modelIndex,
                                                   genIndex
                                                );
                                             }}
                                             className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
                                          >
                                             Remove
                                          </button>
                                       )}
                                    </div>

                                    {/* Generation Content */}
                                    {expandedGeneration[
                                       `${modelIndex}-${genIndex}`
                                    ] && (
                                       <div className="p-4 space-y-4">
                                          {/* Generation Fields */}
                                          <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                   Generation Name *
                                                </label>
                                                <input
                                                   type="text"
                                                   value={
                                                      generation.generationName
                                                   }
                                                   onChange={(e) =>
                                                      handleInputChange(
                                                         modelIndex,
                                                         genIndex,
                                                         undefined,
                                                         "generationName",
                                                         e.target.value
                                                      )
                                                   }
                                                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                   placeholder="Enter generation name"
                                                />
                                             </div>
                                             <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                   Body *
                                                </label>
                                                <input
                                                   type="text"
                                                   value={generation.body}
                                                   onChange={(e) =>
                                                      handleInputChange(
                                                         modelIndex,
                                                         genIndex,
                                                         undefined,
                                                         "body",
                                                         e.target.value
                                                      )
                                                   }
                                                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                   placeholder="Enter body type"
                                                />
                                             </div>
                                             <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                   Production Start *
                                                </label>
                                                <input
                                                   type="date"
                                                   value={
                                                      generation.productionStart
                                                   }
                                                   onChange={(e) =>
                                                      handleInputChange(
                                                         modelIndex,
                                                         genIndex,
                                                         undefined,
                                                         "productionStart",
                                                         e.target.value
                                                      )
                                                   }
                                                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                />
                                             </div>
                                             <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                   Production End *
                                                </label>
                                                <input
                                                   type="date"
                                                   value={
                                                      generation.productionEnd
                                                   }
                                                   onChange={(e) =>
                                                      handleInputChange(
                                                         modelIndex,
                                                         genIndex,
                                                         undefined,
                                                         "productionEnd",
                                                         e.target.value
                                                      )
                                                   }
                                                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                />
                                             </div>
                                          </div>

                                          {/* Engines */}
                                          <div className="mt-6 pt-4 border-t border-slate-300">
                                             <h5 className="font-semibold text-slate-800 mb-4">
                                                Engines (Required: At least 1)
                                             </h5>
                                             <div className="space-y-3">
                                                {generation.engines.map(
                                                   (engine, engineIndex) => (
                                                      <div
                                                         key={engineIndex}
                                                         className="bg-white border border-slate-200 rounded-lg p-4"
                                                      >
                                                         <div className="flex justify-between items-center mb-4">
                                                            <h6 className="font-semibold text-slate-700">
                                                               Engine{" "}
                                                               {engineIndex + 1}
                                                            </h6>
                                                            {generation.engines
                                                               .length > 1 && (
                                                               <button
                                                                  type="button"
                                                                  onClick={() =>
                                                                     removeEngine(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex
                                                                     )
                                                                  }
                                                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                                                               >
                                                                  Remove
                                                               </button>
                                                            )}
                                                         </div>
                                                         <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                               <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                                  Engine Code *
                                                               </label>
                                                               <input
                                                                  type="text"
                                                                  value={
                                                                     engine.engineCode
                                                                  }
                                                                  onChange={(
                                                                     e
                                                                  ) =>
                                                                     handleInputChange(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex,
                                                                        "engineCode",
                                                                        e.target
                                                                           .value
                                                                     )
                                                                  }
                                                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                                                  placeholder="e.g., 1.6L"
                                                               />
                                                            </div>
                                                            <div>
                                                               <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                                  KW *
                                                               </label>
                                                               <input
                                                                  type="number"
                                                                  value={
                                                                     engine.kw
                                                                  }
                                                                  onChange={(
                                                                     e
                                                                  ) =>
                                                                     handleInputChange(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex,
                                                                        "kw",
                                                                        e.target
                                                                           .value
                                                                     )
                                                                  }
                                                                  onInput={(
                                                                     e: any
                                                                  ) => {
                                                                     e.target.value =
                                                                        e.target.value.replace(
                                                                           /[^0-9]/g,
                                                                           ""
                                                                        );
                                                                  }}
                                                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                                                  placeholder="e.g., 110"
                                                               />
                                                            </div>
                                                            <div>
                                                               <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                                  HP *
                                                               </label>
                                                               <input
                                                                  type="number"
                                                                  value={
                                                                     engine.hp
                                                                  }
                                                                  onChange={(
                                                                     e
                                                                  ) =>
                                                                     handleInputChange(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex,
                                                                        "hp",
                                                                        e.target
                                                                           .value
                                                                     )
                                                                  }
                                                                  onInput={(
                                                                     e: any
                                                                  ) => {
                                                                     e.target.value =
                                                                        e.target.value.replace(
                                                                           /[^0-9]/g,
                                                                           ""
                                                                        );
                                                                  }}
                                                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                                                  placeholder="e.g., 150"
                                                               />
                                                            </div>
                                                            <div>
                                                               <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                                  CCM *
                                                               </label>
                                                               <input
                                                                  type="number"
                                                                  value={
                                                                     engine.ccm
                                                                  }
                                                                  onChange={(
                                                                     e
                                                                  ) =>
                                                                     handleInputChange(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex,
                                                                        "ccm",
                                                                        e.target
                                                                           .value
                                                                     )
                                                                  }
                                                                  onInput={(
                                                                     e: any
                                                                  ) => {
                                                                     e.target.value =
                                                                        e.target.value.replace(
                                                                           /[^0-9]/g,
                                                                           ""
                                                                        );
                                                                  }}
                                                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                                                  placeholder="e.g., 1600"
                                                               />
                                                            </div>
                                                            <div className="col-span-2">
                                                               <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                                  Fuel Type *
                                                               </label>
                                                               <input
                                                                  type="text"
                                                                  value={
                                                                     engine.fuelType
                                                                  }
                                                                  onChange={(
                                                                     e
                                                                  ) =>
                                                                     handleInputChange(
                                                                        modelIndex,
                                                                        genIndex,
                                                                        engineIndex,
                                                                        "fuelType",
                                                                        e.target
                                                                           .value
                                                                     )
                                                                  }
                                                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                                                  placeholder="e.g., Petrol, Diesel"
                                                               />
                                                            </div>
                                                         </div>
                                                      </div>
                                                   )
                                                )}
                                             </div>

                                             {/* Add Engine Button */}
                                             <button
                                                type="button"
                                                onClick={() =>
                                                   addEngine(
                                                      modelIndex,
                                                      genIndex
                                                   )
                                                }
                                                disabled={
                                                   !canAddEngine(
                                                      modelIndex,
                                                      genIndex
                                                   )
                                                }
                                                className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                   canAddEngine(
                                                      modelIndex,
                                                      genIndex
                                                   )
                                                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                                      : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-50"
                                                }`}
                                             >
                                                + Add Engine
                                             </button>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                           </div>

                           {/* Add Generation Button */}
                           <button
                              type="button"
                              onClick={() => addGeneration(modelIndex)}
                              disabled={!canAddGeneration(modelIndex)}
                              className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                                 canAddGeneration(modelIndex)
                                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                                    : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-50"
                              }`}
                           >
                              + Add Generation
                           </button>
                        </div>
                     )}
                  </div>
               ))}

               {/* Add Model Button */}
               <button
                  type="button"
                  onClick={addModel}
                  disabled={!canAddModel()}
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors ${
                     canAddModel()
                        ? "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                        : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-50"
                  }`}
               >
                  + Add Model
               </button>

               {/* Submit Button */}
               <div className="flex gap-4 pt-6">
                  <button
                     type="submit"
                     disabled={!isFormValid() || isLoading}
                     className={`flex-1 px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed font-semibold ${
                        isFormValid()
                           ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                           : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-50"
                     }`}
                  >
                     {isLoading ? "Processing..." : "Submit Form"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CreateBrandForm;
