import { IConfigurationOptions } from "./ConfigurationOptions";

export interface IPasswordConfigurationOptions extends IConfigurationOptions {
    mustHaveAtLeastOneSymbol:boolean;
    mustHaveAtLeastOneNumber:boolean;
}