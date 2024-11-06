declare module com {
    export module zhekasmirnov {
        export module innercore {
            export module api {
                export class NativeRenderer extends java.lang.Object {
                    static class: java.lang.Class<NativeRenderer>;
                    static createHumanoidRenderer(d: number): Render.Renderer;
                    static createItemSpriteRenderer(id: number): Render.Renderer;
                    static createRendererWithSkin(skin: string, d: number): Render.Renderer;
                    static getRendererById(id: number): Nullable<Render.Renderer>;
                }
            }
        }
    }
}
