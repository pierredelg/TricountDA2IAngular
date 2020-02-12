import {Participant} from "./participant";
import {Currency} from "./currency";

export class Entry {
  idEcriture:number;
  date: string;
  libelle: string;
  montant: number;
  devise: Currency;
  evenement: Event;
  participant : Participant;
  participants: Participant[];
  typeEcriture: string;
}
