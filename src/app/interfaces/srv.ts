import { Categorie } from "./categorie";

export interface Srv {
    id : number,
    designation : string,
    description : string,
    categorie : Categorie,
    sous_categorie : string,
    etat : string,
    creiteres : string[]
}
export { Categorie };

