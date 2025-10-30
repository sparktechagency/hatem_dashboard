

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
