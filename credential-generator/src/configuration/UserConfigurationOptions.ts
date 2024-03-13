import { IConfigurationOptions } from "./ConfigurationOptions";

export interface IUserConfigurationOptions extends IConfigurationOptions {
    mustStartWithAlphaNumeric: boolean;
}