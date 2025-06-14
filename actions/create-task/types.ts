import { z } from "zod";
import { Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateTask } from "./schema";

export type InputType = z.infer<typeof CreateTask>;
export type ReturnType = ActionState<InputType, Task>;
