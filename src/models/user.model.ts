import { Message } from "./message.model";
import { Thread } from "./thread.model";

export class User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  threads?: Thread[];
  messages?: Message[];
}
