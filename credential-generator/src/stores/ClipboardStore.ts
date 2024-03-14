import { useNotificationStore } from "./NotificationStore";
import { defineStore } from "pinia";

export interface IClipboardService
{
    copyText(text:string) : Promise<void>;
}

export const useClipboardStore = defineStore("clipboard", () : IClipboardService => {
    const notificationStore = useNotificationStore();
    async function copyText(text: string): Promise<void> {
        const promise = navigator.clipboard.writeText(text);
        await promise;

        notificationStore
            .displayMessage("Copied to clipboard", "Text copied to clipboard");

        return promise;
    }

    return {
        copyText
    }
});