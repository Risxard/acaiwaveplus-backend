import cron from "node-cron";
import { deleteGuestUsers } from "../services/deleteGuestUsers";

export function initDeleteGuestsCron() {
    cron.schedule(
        "00 00 * * *",
        async () => {
            await deleteGuestUsers();
        },
        {
            timezone: "America/Sao_Paulo",
        }
    );
}
