import { IConfigurationOptions } from "./ConfigurationStore";

export interface IPasswordConfigurationOptions extends IConfigurationOptions {
    mustHaveAtLeastOneSymbol:boolean;
    mustHaveAtLeastOneNumber:boolean;
}