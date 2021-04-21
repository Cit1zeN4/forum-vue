import { Message } from "./message.model";
import { User } from "./user.model";

export class Thread {
  id?: string;
  title?: string;
  description?: string;
  author?: User;
  parentTread?: Thread;
  subThreads?: Thread[];
  messages?: Message[];
  isClosed?: boolean;
  isArchived?: boolean;
}
