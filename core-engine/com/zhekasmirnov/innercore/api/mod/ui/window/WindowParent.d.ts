declare module com {
    export module zhekasmirnov {
        export module innercore {
            export module api {
                export module mod {
                    export module ui {
                        export module window {
                            export class WindowParent extends java.lang.Object {
                                static class: java.lang.Class<WindowParent>;
                                static openWindow(window: UI.Window): void;
                                static closeWindow(window: UI.Window): void;
                                static applyWindowInsets(window: UI.Window, insets: android.view.WindowInsets): void;
                                static releaseWindowLayout(layout: android.view.View): void;
                            }
                        }
                    }
                }
            }
        }
    }
}