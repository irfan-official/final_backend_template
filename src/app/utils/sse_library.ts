import { Response } from "express";

class SSEService {
    private clients = new Set<Response>();

    addClient(res: Response) {
        console.log("Adding a client...")
        this.clients.add(res);
    }

    removeClient(res: Response) {
        console.log("Removing a client...")
        this.clients.delete(res);
    }

    emit(event: string, data: any) {
        const payload = `
                event: ${event}
                data: ${JSON.stringify(data)}
            `;

        for (const client of this.clients) {
            client.write(payload);
        }
    }
}

export const sseService = new SSEService();