declare module com {
    export module zhekasmirnov {
        export module innercore {
            export module api {
                export module mod {
                    export module recipes {
                        export module workbench {
                            export class WorkbenchField extends java.lang.Object {
                                static class: java.lang.Class<WorkbenchField>;
                                constructor();
                                constructor(impl: {
                                    asScriptableField: () => ui.container.AbstractSlot[],
                                    getFieldSlot: (i: number) => ui.container.AbstractSlot;
                                });
                                asScriptableField(): ui.container.AbstractSlot[];
                                getFieldSlot(i: number): ui.container.AbstractSlot;
                                /**
                                 * @since 2.2.1b108
                                 */
                                getFieldSlot(x: number, y: number): innercore.api.mod.ui.container.AbstractSlot;
                                /**
                                 * @since 2.2.1b106
                                 */
                                getWorkbenchFieldSize(): number;
                            }
                        }
                    }
                }
            }
        }
    }
}