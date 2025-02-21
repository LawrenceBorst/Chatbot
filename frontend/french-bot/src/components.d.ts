/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppBody {
    }
    interface AppBotResponse {
        /**
          * Text to add to the dialog
         */
        "text": string;
    }
    interface AppInputField {
    }
    interface AppRoot {
    }
    interface AppTopBar {
        "title": string;
    }
    interface LoginScreen {
    }
}
export interface AppInputFieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppInputFieldElement;
}
declare global {
    interface HTMLAppBodyElement extends Components.AppBody, HTMLStencilElement {
    }
    var HTMLAppBodyElement: {
        prototype: HTMLAppBodyElement;
        new (): HTMLAppBodyElement;
    };
    interface HTMLAppBotResponseElement extends Components.AppBotResponse, HTMLStencilElement {
    }
    var HTMLAppBotResponseElement: {
        prototype: HTMLAppBotResponseElement;
        new (): HTMLAppBotResponseElement;
    };
    interface HTMLAppInputFieldElementEventMap {
        "response": string;
    }
    interface HTMLAppInputFieldElement extends Components.AppInputField, HTMLStencilElement {
        addEventListener<K extends keyof HTMLAppInputFieldElementEventMap>(type: K, listener: (this: HTMLAppInputFieldElement, ev: AppInputFieldCustomEvent<HTMLAppInputFieldElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLAppInputFieldElementEventMap>(type: K, listener: (this: HTMLAppInputFieldElement, ev: AppInputFieldCustomEvent<HTMLAppInputFieldElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLAppInputFieldElement: {
        prototype: HTMLAppInputFieldElement;
        new (): HTMLAppInputFieldElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppTopBarElement extends Components.AppTopBar, HTMLStencilElement {
    }
    var HTMLAppTopBarElement: {
        prototype: HTMLAppTopBarElement;
        new (): HTMLAppTopBarElement;
    };
    interface HTMLLoginScreenElement extends Components.LoginScreen, HTMLStencilElement {
    }
    var HTMLLoginScreenElement: {
        prototype: HTMLLoginScreenElement;
        new (): HTMLLoginScreenElement;
    };
    interface HTMLElementTagNameMap {
        "app-body": HTMLAppBodyElement;
        "app-bot-response": HTMLAppBotResponseElement;
        "app-input-field": HTMLAppInputFieldElement;
        "app-root": HTMLAppRootElement;
        "app-top-bar": HTMLAppTopBarElement;
        "login-screen": HTMLLoginScreenElement;
    }
}
declare namespace LocalJSX {
    interface AppBody {
    }
    interface AppBotResponse {
        /**
          * Text to add to the dialog
         */
        "text"?: string;
    }
    interface AppInputField {
        /**
          * Emitted when a response to the query is received from the server
         */
        "onResponse"?: (event: AppInputFieldCustomEvent<string>) => void;
    }
    interface AppRoot {
    }
    interface AppTopBar {
        "title"?: string;
    }
    interface LoginScreen {
    }
    interface IntrinsicElements {
        "app-body": AppBody;
        "app-bot-response": AppBotResponse;
        "app-input-field": AppInputField;
        "app-root": AppRoot;
        "app-top-bar": AppTopBar;
        "login-screen": LoginScreen;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-body": LocalJSX.AppBody & JSXBase.HTMLAttributes<HTMLAppBodyElement>;
            "app-bot-response": LocalJSX.AppBotResponse & JSXBase.HTMLAttributes<HTMLAppBotResponseElement>;
            "app-input-field": LocalJSX.AppInputField & JSXBase.HTMLAttributes<HTMLAppInputFieldElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-top-bar": LocalJSX.AppTopBar & JSXBase.HTMLAttributes<HTMLAppTopBarElement>;
            "login-screen": LocalJSX.LoginScreen & JSXBase.HTMLAttributes<HTMLLoginScreenElement>;
        }
    }
}
