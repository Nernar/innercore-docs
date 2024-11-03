import { Application, DeclarationReference, DefaultTheme, DefaultThemeRenderContext, JSX, PageEvent, ReferenceType, Reflection, ReflectionKind, Renderer, RendererEvent, Type } from "typedoc";

import { dirname, join } from 'path';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs';

const HtmlToReactParser = require('html-to-react').Parser;

// Externals packages that will be redirected to Android Docs.
export const ANDROID_EXTERNALS = new RegExp(`^(${
	["android", "androidx", "dalvik", "java", "javax", "org"].join("|")
})(\/|\.|$)`);

class CodiconTheme extends DefaultTheme {
	constructor(private renderer: Renderer) {
		super(renderer);
		this.overrideIcons();
	}

	private _icons: typeof this.icons = this.icons;

	private createJsxFromReactElement(element: any, props?: object | null): JSX.Element | null {
		if (element == null) {
			return null;
		}
		const children = Array.isArray(element.props.children)
			? [...element.props.children].map(child => this.createJsxFromReactElement(child))
			: this.createJsxFromReactElement(element.props.children);
		return JSX.createElement(element.type, {
			...element.props,
			...props,
			$$typeof: undefined,
			children: undefined
		}, children);
	}

	private _htmlToReactParser: any = new HtmlToReactParser();

	private readCodiconFromFile(key: string): JSX.Element | null {
		const codiconFile = join(__dirname, "..", "..", "node_modules", "@vscode", "codicons", "src", "icons", key + ".svg");
		if (!existsSync(codiconFile)) {
			console.error("typedoc-codicon: Run `npm install` before running typedoc!");
			return null;
		}
		const codicon = readFileSync(codiconFile, { encoding: "utf-8" });
		const element = this._htmlToReactParser.parse(codicon);
		return this.createJsxFromReactElement(element, { color: "var(--color-icon-text)" });
	}

	private codiconOfKind(key: string, color: string | undefined): JSX.Element {
		return this.codicon(key, 16, "tsd-kind-icon", color);
	}

	private codicon(key: string, size: number | undefined = undefined, kind: string | undefined = undefined, color: string | undefined = "var(--color-text)"): JSX.Element {
		let attrs = [];
		size == null || attrs.push(`font-size:${size}px`);
		color == null || attrs.push(`color:${color}`); // 0.24.4+
		return this.readCodiconFromFile(key) || <svg />;
	}

	private overrideIcons(): void {
		this.icons = Object.assign(this._icons, {
			[ReflectionKind.Accessor]: () => this.codiconOfKind("symbol-field", "#FF4D4D"),
			[ReflectionKind.Class]: () => this.codiconOfKind("symbol-class", "var(--color-ts-class)"),
			[ReflectionKind.Constructor]: () => this.codiconOfKind("symbol-method", "#4D7FFF"),
			[ReflectionKind.Enum]: () => this.codiconOfKind("symbol-enum", "var(--color-ts-enum)"),
			[ReflectionKind.EnumMember]: () => this.codiconOfKind("symbol-enum-member", "#FF984D"),
			[ReflectionKind.Function]: () => this.codiconOfKind("symbol-method", "var(--color-ts-function)"),
			[ReflectionKind.Interface]: () => this.codiconOfKind("symbol-interface", "var(--color-ts-interface)"),
			[ReflectionKind.Method]: () => this.codiconOfKind("symbol-method", "#FF4DB8"),
			[ReflectionKind.Module]: () => this.codiconOfKind("symbol-structure", "var(--color-ts-namespace)"),
			[ReflectionKind.Namespace]: () => this.codiconOfKind("symbol-namespace", "var(--color-ts-namespace)"),
			[ReflectionKind.Parameter]: () => this.codiconOfKind("symbol-parameter", "#FF984D"),
			[ReflectionKind.Project]: () => this.codiconOfKind("package", "var(--color-ts-namespace)"),
			[ReflectionKind.Property]: () => this.codiconOfKind("symbol-property", "#FF984D"),
			[ReflectionKind.Reference]: () => this.codiconOfKind("key", "#FF4D82"),
			[ReflectionKind.TypeAlias]: () => this.codiconOfKind("type-hierarchy-sub", "var(--color-ts-type-alias)"),
			[ReflectionKind.Variable]: () => this.codiconOfKind("symbol-variable", "var(--color-ts-variable)"),
			["menu"]: () => this.codicon("menu", 16),
			["search"]: () => this.codicon("search", 16)
		});
	}

	private renderContext?: CodiconThemeRenderContext;

	override getRenderContext(pageEvent: PageEvent<Reflection>): DefaultThemeRenderContext {
		return this.renderContext ||= new CodiconThemeRenderContext(this, pageEvent, this.application.options);
	}
}

class CodiconThemeRenderContext extends DefaultThemeRenderContext {
	private _header = this.header;
	// Exclude homepage title duplication (actually, triplication).
	override header: (props: PageEvent<Reflection>) => JSX.Element = (props) => (
		<>{!props.model.isProject() && this._header(props)}</>
	);

	override footer: () => JSX.Element = () => (
		<div class="container tsd-generator">
			<p>
				{`Copyright © ${new Date().getFullYear()} Nernar. Copyright © 2020 #mineprogramming. Built with \u2764 and `}
				<a href="https://typedoc.org/" target="_blank">
					TypeDoc
				</a>
				{"."}
			</p>
		</div>
	);

	private _typeAndParent = this.typeAndParent;
	// Just a little stuff appears in ordinal {@link}'s, modifiers (Inherits, Extends, etc.)
	// not being redirected to external links by default.
	override typeAndParent: (props: Type) => JSX.Element = (props) => {
		if (props instanceof ReferenceType && props.reflection) {
			return this._typeAndParent(props);
		}
		let caption = props.toString();
		if (ANDROID_EXTERNALS.test(caption)) {
			const index = caption.lastIndexOf(".");
			if (index != -1) {
				caption = `${caption.substring(0, index)}#${caption.substring(index + 1)}`;
			}
			return <a href={`https://developer.android.com/reference/${caption.replace(/\./g, "/")}`} class="external" target="_blank">{caption}</a>;
		}
		return this._typeAndParent(props);
	};
}

export function load(app: Application): void {
	app.renderer.defineTheme("typedoc-codicon", CodiconTheme);
	app.converter.addUnknownSymbolResolver((ref: DeclarationReference) => {
        // If someone did {@link lodash!}, link them directly to the home page.
        if (!ref.symbolReference) {
            return "https://lodash.com/";
        }

        if (!ref.symbolReference.path) {
            // Someone included a meaning, but not a path.
            // https://typedoc.org/guides/declaration-references/#meaning
            return;
        }

        if (ref.symbolReference.path.length) {
            const caption = ref.symbolReference.path.map((component) => component.path).join(".");
            if (ANDROID_EXTERNALS.test(caption)) {
                return {
					caption: caption,
					target: `https://developer.android.com/reference/${caption.replace(/\./g, "/")}`
				};
            }
        }
    });
}
