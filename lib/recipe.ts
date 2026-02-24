export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  duration: string;
  instructions: string;
  image: string;
  createdBy: string;
}
