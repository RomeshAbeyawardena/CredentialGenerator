import { Ref } from "vue";

export interface INotification 
{
    lifetime:Ref<number>;
    message:Ref<string>;
    description:Ref<string>;
    position:Ref<"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | "center" | undefined>;
    severity:Ref<"success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined>;
}