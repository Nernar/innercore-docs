/**
 * @since 2.2.1b110
 */
declare namespace LowLevelUtils {
	function getNetwork(): typeof Network;
	function simulateBackPressed(): void;
	function getContext(): android.app.Activity;
	function runAsUi(func: () => void): void;
	function debugStr(message: string): void;
	function debugBmp(bitmap: android.graphics.Bitmap): void;
	function getMinecraftVersion(): string;
	function getInnerCoreVersion(): string;
	function throwException(message: string): void;
	function debugAPILookUp(): void;
	function runOnMainThread(func: () => void): void;
	function runOnClientThread(func: () => void): void;
	function setLoadingTip(tip: string): void;
	function setNativeThreadPriority(priority: number): void;
	function forceNativeCrash(): void;
	function isDefaultPrevented(): boolean;
	function isMainThreadStopped(): boolean;
	function evalInScope(code: string, scope: object, name: string): object;
	function addRuntimePack(type: string, name: string): string;

	interface ICustomErrorCallback {
		(message: string, error: java.lang.Throwable, log: string, stacktrace: string): boolean;
	}

	function setCustomFatalErrorCallback(callback: ICustomErrorCallback): void;
	function setCustomNonFatalErrorCallback(callback: ICustomErrorCallback): void;
	function setCustomStartupErrorCallback(callback: ICustomErrorCallback): void;

	type ThreadTypeMarker = "CLIENT" | "SERVER" | "UNKNOWN";

	function getCurrentThreadType(): ThreadTypeMarker;
}
