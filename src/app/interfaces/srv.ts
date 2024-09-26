import { Categorie } from "./categorie";

export interface Srv {
    id : string,
    designation : string,
    description : string,
    categorie : number,
    sous_categorie : string,
    etat : string,
    archivee : boolean,
    creiteres : string[]
}

export { Categorie };

