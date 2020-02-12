import {Participant} from "./participant";
import {Currency} from "./currency";
import {Event} from "./event";

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
