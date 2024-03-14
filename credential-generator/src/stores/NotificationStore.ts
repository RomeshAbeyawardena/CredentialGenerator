import { defineStore } from 'pinia'
import { computed, ref, ComputedRef } from "vue";
import { useToast } from 'primevue/usetoast';
import { INotification } from '../notification/Notification';
import { ToastMessageOptions } from 'primevue/toast';

export interface INotificationStore extends INotification {
    notification:ComputedRef<ToastMessageOptions>;
    displayMessage(message:string, position?:string, severity?:string): void;
}

export const useNotificationStore = defineStore("notification", (): INotificationStore => {
    const lifetime = ref(1500);
    const message = ref("");
    const description = ref("");
    const position = ref("top-left" as "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | "center" | undefined);
    const severity = ref("info" as "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined);
    const toast = useToast();

    const notification = computed<ToastMessageOptions>(():ToastMessageOptions => {
        return {
            life: lifetime.value,
            summary: message.value,
            detail: description.value,
            severity: severity.value,
        };
    });

    function displayMessage(msg:string, desc?:string,
        pos?:"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | "center" | undefined, 
        sev?: "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined)
    {
        message.value = msg;
        if(desc != undefined)
        {
            description.value = desc;
        }
        if(pos != undefined) 
            position.value = pos;
        
        if(sev != undefined) 
            severity.value = sev;

        toast.add(notification.value);
    }

    return {
        description,
        displayMessage,
        lifetime,
        message,
        notification,
        position,
        severity
    }
});