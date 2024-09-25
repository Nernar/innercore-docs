/**
 * Module that provides some general game-related functions.
 */
declare namespace Game {

    /**
     * Allows you to determine whether current instance of game has
     * a client or not (clientless game requires a server core, e.g.
     * [Zote Core (GitHub)](https://github.com/reider745/zotecoreloader)).
     * @since 2.3.1b116
     */
    function isDedicatedServer(): boolean;

    /**
     * Prevents current callback function from being called in Minecraft.
     * For most callbacks it prevents default game behavior.
     */
    function prevent(): void;

    /**
     * @returns `true` if the current callback function has already been
     * prevented from being called in Minecraft using {@link Game.prevent},
     * `false `otherwise.
     */
    function isActionPrevented(): boolean;

    /**
     * Writes message to the chat.
     * Message can be formatted using {@link EColor} values.
     * @param message message to be displayed
     */
    function message(message: string): void;

    /**
     * Writes message above the hot bar.
     * Message can be formatted using {@link EColor} values.
     * @param message message to be displayed
     */
    function tipMessage(message: string): void;

    /**
     * Displays {@link android.app.AlertDialog} with given message and dialog title.
     * Message can be mixed with {@link android.text.Html.fromHtml HTML-like} formatting,
     * for example `<b>I'm a bold</b><br/><i>I'm a italic</i>`.
     * @param message message to be displayed
     * @param title title before message
     */
    function dialogMessage(message: string, title: string): void;

    /**
     * Sets game difficulty, one of {@link EGameDifficulty} values.
     * @param difficulty game difficulty to be set
     */
    function setDifficulty(difficulty: number): void;

    /**
     * @returns Current game difficulty, one of the {@link EGameDifficulty} values.
     */
    function getDifficulty(): number;

    /**
     * Sets current level game mode.
     * @param gameMode new game mode, should be one of the {@link EGameMode}
     * values
     */
    function setGameMode(gameMode: number): void;

    /**
     * @returns Current level game mode, one of the {@link EGameMode} values.
     */
    function getGameMode(): number;

    /**
     * @returns String containing current Minecraft version.
     */
    function getMinecraftVersion(): string;

    /**
     * @returns String containing current Core Engine version (2.1).
     */
    function getEngineVersion(): string;

    /**
     * `true` if developer mode was enabled in Inner Core config.
     * @internal
     */
    let isDeveloperMode: boolean;

    /**
     * `true` if Inner Core config allows spending items in creative.
     * @internal
     */
    let spendItemsInCreative: boolean;

    /**
     * @returns `true` if item spending allowed (player must be in creative).
     */
    function isItemSpendingAllowed(playerUid?: number): boolean;

    /**
     * @since 2.0.4b35
     */
    function simulateBackPressed(): void;

}
