import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import handleMulterError from "./app/middlewares/multerErrorHandler";
import { SSEService } from "./app/utils/sse_library";
import { UserIdBasedSSE } from "./app/cache/sse";

const app: Application = express();

// Webhook must be before other middleware
// app.post(
//     "/webhook",
//     express.raw({ type: "application/json" }),
//     PaymentController.handleStripeWebhooksEvent
// );

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use("/api/v1/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Welcome to ICEPOTS API",
    });
});


app.post("/events", (req: Request, res: Response) => {

    const { event } = req.body

    const newData = {
        id: "dknfsv",
        name: "sjnfvm",
        descriptions: "weklfoiermerppive"
    }

    // event is likely what actually happen like USER_ADD, PURCHASE etc
    const role = "USER"
    const userID = req.body.id

    sendNotification(event, userID, newData)

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Welcome to ICEPOTS API",
    });
});


function sendNotification(event: string, userId: string, data: any) {
    const sseService = UserIdBasedSSE[userId]

    if (UserIdBasedSSE[userId]) {
        sseService.emit(event, data);
    }
}


app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sseService = new SSEService()

    const UserId = req.query.id as string || ""
    UserIdBasedSSE[UserId] = sseService

    sseService.addClient(res);

    // Initial event
    sseService.emit("connected", {
        message: "SSE Connected",
    });

    req.on("close", () => {
        sseService.removeClient(res);
        res.end();
    });
});

// app.get("/example-events", (req, res) => {
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     sseService.addClient(res);

//     // Initial event
//     sseService.emit("connected", {
//         message: "SSE Connected",
//     });


//     // sseService.emit("file_processed", {
//     //     fileId: "123",
//     //     status: "completed",
//     // });

//     // const eventTypes = ["USER_JOIN", "PURCHASE_PRODUCTS"]

//     // const interval = setInterval(() => {
//     //     sseService.emit(eventTypes[0], {
//     //         fileId: "123",
//     //         status: "completed",
//     //         timestamp: new Date().toISOString(),
//     //     });
//     // }, 2000);



//     const eventTypes = [
//         "USER_JOIN",
//         "PURCHASE_PRODUCTS",
//         "USER_LEAVE",
//         "ORDER_CREATED",
//         "PAYMENT_SUCCESS",
//     ];

//     const users = [
//         "Irfan",
//         "John",
//         "Sarah",
//         "Alex",
//         "Emma",
//     ];

//     const products = [
//         "MacBook Pro",
//         "iPhone 17",
//         "AirPods Pro",
//         "Gaming Mouse",
//         "Mechanical Keyboard",
//     ];

//     const getRandomItem = <T>(arr: T[]): T =>
//         arr[Math.floor(Math.random() * arr.length)];

//     const interval = setInterval(() => {
//         const eventType = getRandomItem(eventTypes);

//         let payload: any = {
//             timestamp: new Date().toISOString(),
//         };

//         switch (eventType) {
//             case "USER_JOIN":
//                 payload = {
//                     userId: Math.floor(Math.random() * 1000000),
//                     username: getRandomItem(users),
//                     timestamp: new Date().toISOString(),
//                 };
//                 break;

//             case "PURCHASE_PRODUCTS":
//                 payload = {
//                     orderId: crypto.randomUUID(),
//                     user: getRandomItem(users),
//                     product: getRandomItem(products),
//                     quantity: Math.floor(Math.random() * 5) + 1,
//                     amount: Math.floor(Math.random() * 1000) + 50,
//                     timestamp: new Date().toISOString(),
//                 };
//                 break;

//             case "USER_LEAVE":
//                 payload = {
//                     userId: crypto.randomUUID(),
//                     username: getRandomItem(users),
//                     timestamp: new Date().toISOString(),
//                 };
//                 break;

//             case "ORDER_CREATED":
//                 payload = {
//                     orderId: crypto.randomUUID(),
//                     status: "pending",
//                     total: Math.floor(Math.random() * 5000),
//                     timestamp: new Date().toISOString(),
//                 };
//                 break;

//             case "PAYMENT_SUCCESS":
//                 payload = {
//                     paymentId: crypto.randomUUID(),
//                     amount: Math.floor(Math.random() * 2000),
//                     currency: "USD",
//                     timestamp: new Date().toISOString(),
//                 };
//                 break;
//         }

//         sseService.emit(eventType, payload);
//     }, 3000);


//     req.on("close", () => {
//         clearInterval(interval);
//         sseService.removeClient(res);
//         res.end();
//     });
// });

app.set("trust proxy", 1);

app.use("/api/v1", router);

app.use(notFound);
app.use(handleMulterError);
app.use(globalErrorHandler);

export default app;