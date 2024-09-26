export interface Fournisseur {
    id : string,
    nom : string,
    tele : string,
    email : string,
    adress : string,
    disponible : boolean,
    services : number [],
    demandes : number [],
    evaluation : number[]
}
