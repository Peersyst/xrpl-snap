import { config } from "common/config";
import UIError, { UIErrorMessage } from "./UIError";
import { AnyObject } from "@swisstype/essential";

export type UIErrorEventSeverity = "error" | "warning";

export default class UIErrorEvent extends Event {
    static type = `${config.projectName}-error`;

    error: UIError;

    constructor(error: UIError) {
        super(UIErrorEvent.type);
        this.error = error;
    }

    static addListener(callback: (event: UIErrorEvent) => void): void {
        window.addEventListener(UIErrorEvent.type, callback as EventListener);
    }

    static removeListener(callback: (event: UIErrorEvent) => void): void {
        window.removeEventListener(UIErrorEvent.type, callback as EventListener);
    }

    static dispatch(message: UIErrorMessage, severity: UIErrorEventSeverity = "error", data?: AnyObject): void {
        window.dispatchEvent(new UIErrorEvent(new UIError(message, severity, data)));
    }
}
