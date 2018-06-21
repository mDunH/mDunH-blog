import { Config } from "../js/config";

export function setTheme(attr, type) {
    return attr ? attr : Config.theme[type];
}