import { UserRole } from "@prisma/client";
import { SSEService } from "../utils/sse_library";

export type TypeBasedUserSSE = Partial<
    Record<UserRole, Record<string, SSEService>>
>;
export type UserIdBasedSSE = Record<string, SSEService>

export let TypeBasedUserSSE: TypeBasedUserSSE = {}

export let UserIdBasedSSE: UserIdBasedSSE = {}

//     {
//    "ADMIN" : {
//        "userId2": sseService2,
//        "userId3": sseService3,
//        "userId4": sseService4
//    },
//    "USER" : {
//        "userId2": sseService2,
//        "userId3": sseService3,
//        "userId4": sseService4
//    }
// }

// {
//     "userId1": sseService1,
//     "userId2": sseService2,
//     "userId3": sseService3,
//     "userId4": sseService4
// }

