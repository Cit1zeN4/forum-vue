import { Thread } from "@/models/thread.model";

export function saveNewThread(
  threads: Thread[],
  thread: Thread,
  depth: number
) {
  let result = false;
  if (depth >= 0)
    if (thread.parentTread?.id)
      threads.forEach((v) => {
        console.log(depth);
        if (v.id === thread.parentTread?.id) {
          if (v.subThreads) v.subThreads.push(thread);
          else v.subThreads = [thread];
          result = true;
        }

        if (!result)
          if (v.subThreads) {
            result = saveNewThread(v.subThreads, thread, depth - 1);
          }

        if (result) return;
      });
    else {
      result = true;
      threads.push(thread);
    }
  return result;
}
