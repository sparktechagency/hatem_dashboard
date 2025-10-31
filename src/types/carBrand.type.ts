

export interface IEngine {
  engineCode: string;
  kw: string;
  hp: string;
  ccm: string;
  fuelType: string;
}

export interface IGeneration {
  generationName: string
  body: string
  productionStart: string
  productionEnd: string
  engines: IEngine[]
}

export interface IModel {
  modelName: string
  generations: IGeneration[]
}



export type IBrand = {
  _id: string;
  name: string;
}

export interface ICardBrand {
  brandId: string
  brandImage: string
  brandName: string
  modelId: string
  modelName: string
  generationId: string
  generationName: string
  productionStart: string 
  productionEnd: string   
  engineId: string
  engineCode: string
  hp: number
  kw: number
  ccm: number
}
