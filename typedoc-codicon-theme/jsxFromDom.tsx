import { JSX } from "typedoc";

function parseJsxNameFromDom(name: string): string {
	if (/[a-z]+[A-Z]+[a-z]+/.test(name)) {
		return name;
	}
	return name.toLowerCase();
}

function parseJsxPropsFromDom(node: Node): object | null {
	if (node instanceof Element) {
		const props: { [key: string]: any } = {};
		for (let index = 0; index < node.attributes.length; index++) {
			const attr = node.attributes[index];
			props[attr.name] = attr.value;
		}
		return props;
	}
	return null;
}

function parseJsxChildrenFromDom(childs: NodeListOf<ChildNode>): JSX.Children[] {
	const children: JSX.Children = [];
	for (let index = 0; index < childs.length; index++) {
		const child = getJsxElementFromDom(childs[index]);
		child == null || children.push(child);
	}
	return children;
}

export function getJsxElementFromDom(node: Node): JSX.Element | null {
	if (node == null || !(node instanceof Node)) {
		return null;
	}
	switch (node.nodeType) {
		case 1:
			return JSX.createElement(
				parseJsxNameFromDom(node.nodeName),
				parseJsxPropsFromDom(node),
				...parseJsxChildrenFromDom(node.childNodes)
			);
		default:
			console.info(`typedoc-codicon: Node type ${node.nodeName} (type ${node.nodeType}) is not supported!`);
	}
	return null;
}

export function getJsxElementFromString(html: string): JSX.Element | null {
	const parser = new DOMParser();
	const document = parser.parseFromString(html, "text/html");
	switch (document.childNodes.length) {
		case 0:
			return null;
		case 1:
			return getJsxElementFromDom(document.childNodes[0]);
	}
	return getJsxElementFromDom(document);
}
