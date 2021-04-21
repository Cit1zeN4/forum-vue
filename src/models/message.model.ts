import { Thread } from "./thread.model";
import { User } from "./user.model";

export class Message {
  id?: string;
  text?: string;
  date?: Date;
  author?: User;
  replyTo?: Message;
  replies?: Message[];
  thread?: Thread;
}
