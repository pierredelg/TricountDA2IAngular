import {Participant} from "./participant";

export class Balancedto {
    montantTotalPot : number;
    mapMontantDepenseParticipant : Map<Participant,number>;
    mapMontantApayerAuPot : Map<Participant,number>;
    mapRempboursement : Map<Map<Participant,Participant>,number>;
}
