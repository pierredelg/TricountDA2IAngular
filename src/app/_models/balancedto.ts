import {Currency} from "./currency";

export class Balancedto {
    montantTotalPot : number;
    mapMontantDepenseParticipant : Map<string,number>;
    mapMontantApayerAuPot : Map<string,number>;
    mapRempboursement : Map<Map<string,string>,number>;
    devise: Currency;
}
