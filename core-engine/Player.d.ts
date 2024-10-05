/**
 * Module used to manipulate player. Player is also an entity in Minecraft, so 
 * you can use all the functions from {@link Entity} module as well. To get player's 
 * entity uid, call {@link Player.getLocal} or {@link Player.getServer} depends on usage.
 */
declare namespace Player {
    /**
     * Gets server player uid or local one if client connected to
     * remote server and client uid is available.
     * @returns `-1` if there is no player, for example, on dedicated servers
     */
    function get(): number;

    /**
     * Gets local player entity uid, which can be used in various
     * client operations with player, like {@link Player.getPointed}.
     * @returns `-1` if there is no player, for example, on dedicated servers
     * @since 2.3.1b115
     */
    function getLocal(): number;

    /**
     * Gets player entity uid, which can be used in various
     * server operations with player, like {@link Player.addItemToInventory}.
     * @returns `-1` if there is no player, for example, on dedicated servers
     * @since 2.3.1b115
     */
    function getServer(): number;

    // TODO: Unimplemented methods, at least for b121.
    // function getNameForEnt(entityUid: number): string;
    // function getName(): void;

    /**
     * @returns Current dimension numeric uid, one of the {@link EDimension} 
     * values or custom dimension ID.
     */
    function getDimension(): number;

    /**
     * @returns `true` if specified entity is of player type, `false` otherwise.
     * @deprecated Works only with local player, use {@link Entity.getTypeName} instead.
     */
    function isPlayer(entityUid: number): boolean;

    /**
     * Entity pointed data, which is used in {@link Player.getPointed}.
     */
    interface PointedData {
        /**
         * Pointed block position.
         */
        pos: BlockPosition,
        /**
         * Look vector.
         */
        vec: Vector,
        /**
         * Pointed block data, if player doesn't look at the block,
         * air block is returned.
         */
        block: Tile,
        /**
         * Pointed entity, if no entity's pointed, returns `-1`.
         */
        entity: number
    }

    /**
     * Fetches information about the objects player is currently pointing.
     */
    function getPointed(): PointedData;

    /**
     * Simulates local player rotation by specified delta.
     * @param deltaX horizontal radians offset
     * @param deltaY vertical radians offset
     * @since 2.4.0b120 (implemented in 2.3.1b116)
     */
    function localPlayerTurn(deltaX: number, deltaY: number): void;

    /**
     * @deprecated Consider use {@link Player.getInventorySlot} instead.
     */
    function getInventory(loadPart: any, handleEnchant: any, handleNames: any): void;

    /**
     * Adds items to player's inventory, stacking them if possible.
     * @param id item ID
     * @param count item count
     * @param data item data
     * @param extra item extra
     * @param preventDrop if set to false, function drops items that could not be 
     * added to player's inventory, destroys them otherwise
     */
    function addItemToInventory(id: number, count: number, data: number, extra?: ItemExtraData, preventDrop?: boolean): void;

    /**
     * @returns Item in player's hand.
     */
    function getCarriedItem(): ItemInstance;

    /**
     * Sets item in player's hand.
     * @param id item ID
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setCarriedItem(id: number, count: number, data: number, extra?: ItemExtraData): void;

    /**
     * @returns Player's current offhand item information.
     */
    function getOffhandItem(): ItemInstance;

    /**
     * Sets current offhand item for the player.
     * @param id item ID
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setOffhandItem(id: number, count: number, data: number, extra?: ItemExtraData): void;

    /**
     * Decreases carried item count by specified number.
     * @param count amount of items to decrease carried item by, default value 
     * is 1
     */
    function decreaseCarriedItem(count?: number): void;

    /**
     * @param slot slot ID, from 0 to 36
     * @returns Information about item in the specified inventory slot.
     */
    function getInventorySlot(slot: number): ItemInstance;

    /**
     * Sets contents of the specified inventory slot.
     * @param slot slot ID, from 0 to 36
     * @param id item ID
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setInventorySlot(slot: number, id: number, count: number, data: number, extra?: ItemExtraData): void;

    /**
     * @param slot armor slot ID, should be one of the {@link EArmorType} 
     * values.
     * @returns Information about item in the specified armor slot.
     */
    function getArmorSlot(slot: number): ItemInstance;

    /**
     * Sets contents of the specified armor slot.
     * @param slot armor slot ID, should be one of the {@link EArmorType} 
     * values
     * @param id item ID
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setArmorSlot(slot: number, id: number, count: number, data: number, extra?: ItemExtraData): void;

    /**
     * @returns Currently selected inventory slot, from 0 to 8.
     */
    function getSelectedSlotId(): number;

    /**
     * Selects currently selected inventory slot.
     * @param slot slot ID to be selected, from 0 to 8
     */
    function setSelectedSlotId(slot: number): void;

    /**
     * Sets specified coordinates as player's position.
     */
    function setPosition(x: number, y: number, z: number): void;

    /**
     * @returns Current player's position.
     */
    function getPosition(): Vector;

    /**
     * Changes current player position by specified vector.
     */
    function addPosition(x: number, y: number, z: number): void;

    /**
     * Set player's velocity using velocity vector.
     * @param x velocity
     * @param y velocity
     * @param z velocity
     */
    function setVelocity(x: number, y: number, z: number): void;

    /**
     * Get player's velocity.
     * @returns Currently {@link Vector} containing player's velocity.
     */
    function getVelocity(): Vector;

    /**
     * Updates current entity's velocity by specified values.
     */
    function addVelocity(x: number, y: number, z: number): void;

    /**
     * Interface used to manipulate player's experience.
     * @deprecated Consider using {@link Player.getExperience}, 
     * {@link Player.setExperience}, {@link Player.addExperience}.
     */
    class PlayerExperience {
        /**
         * @returns Player's current experience.
         */
        public get(): number;

        /**
         * Sets player's experience.
         * @param exp experience value to be set
         */
        public set(exp: number): void;

        /**
         * Adds specified amount of experience to the current value.
         * @param exp amount to be added
         */
        public add(exp: number): void;
    }

    /**
     * @returns An object that allows to manipulate player experience.
     * @deprecated Consider using {@link Player.getExperience}, 
     * {@link Player.setExperience}, {@link Player.addExperience}.
     */
    function experience(): PlayerExperience;

    /**
     * @returns Player's current experience.
     */
    function getExperience(): number;

    /**
     * Sets player's experience.
     * @param exp experience value to be set
     */
    function setExperience(exp: number): void;

    /**
     * Adds specified amount of experience to the current value.
     * @param exp amount to be added
     */
    function addExperience(exp: number): void;

    /**
     * Interface used to manipulate player's level.
     * @deprecated Consider using {@link Player.getLevel}, 
     * {@link Player.setLevel}, {@link Player.addLevel}.
     */
    interface PlayerLevel {
        /**
         * @returns Player's current level.
         */
        get(): number;

        /**
         * Sets player's level.
         * @param level level value to be set
         */
        set(level: number): void;

        /**
         * Adds specified amount of level to the current value.
         * @param level amount to be added
         */
        add(level: number): void;
    }

    /**
     * @returns An object that allows to manipulate player level.
     * @deprecated Consider using {@link Player.getLevel}, 
     * {@link Player.setLevel}, {@link Player.addLevel}.
     */
    function level(): PlayerLevel;

    /**
     * @returns Player's current level.
     */
    function getLevel(): number;

    /**
     * Sets player's level.
     * @param level level value to be set
     */
    function setLevel(level: number): void;

    /**
     * Adds specified amount of level to the current value.
     * @param level amount to be added
     */
    function addLevel(level: number): void;

    /**
     * Interface used to manipulate player's flying ability and state.
     * @deprecated Consider using {@link Player.getFlyingEnabled}, 
     * {@link Player.setFlyingEnabled}, {@link Player.getFlying}
     * and {@link Player.setFlying}.
     */
    interface PlayerFlying {
        /**
         * @returns `true` if player is flying, `false` otherwise.
         */
        get(): boolean;

        /**
         * Changes player's current flying state, call {@link Player.PlayerFlying.setEnabled}
         * to be able to set this property to `true`.
         * @param enabled whether the player should fly or not
         */
        set(enabled: boolean): void;

        /**
         * @returns `true` if player is allowed to fly, `false` otherwise.
         */
        getEnabled(): boolean;

        /**
         * Enables or disables player's ability to fly.
         * @param enabled whether the player can fly or not
         */
        setEnabled(enabled: boolean): void;
    }

    /**
     * @returns An object that allows to manipulate player flying ability and
     * state.
     * @deprecated Consider using {@link Player.getFlyingEnabled}, 
     * {@link Player.setFlyingEnabled}, {@link Player.getFlying}, {@link Player.setFlying}.
     */
    function flying(): PlayerFlying;

    /**
     * @returns `true` if player is allowed to fly, `false` otherwise.
     */
    function getFlyingEnabled(): boolean;

    /**
     * Enables or disables player's ability to fly.
     * @param enabled whether the player can fly or not
     */
    function setFlyingEnabled(enabled: boolean): void;

    /**
     * @returns `true` if player is flying, `false` otherwise.
     */
    function getFlying(): boolean;

    /**
     * Changes player's current flying state, call {@link Player.setFlyingEnabled}
     * to be able to set this property to `true`.
     * @param enabled whether the player should fly or not
     */
    function setFlying(enabled: boolean): void;

    /**
     * Interface used to manipulate player's exhaustion.
     * @deprecated Consider using {@link Player.getExhaustion} and
     * {@link Player.setExhaustion}.
     */
    interface PlayerExhaustion {
        /**
         * @returns Player's current exhaustion.
         */
        get(): number;

        /**
         * Sets player's exhaustion.
         * @param value exhaustion value to be set
         */
        set(value: number): void;
    }

    /**
     * @returns An object that allows to manipulate player's exhaustion.
     * @deprecated Consider using {@link Player.getExhaustion} and
     * {@link Player.setExhaustion}.
     */
    function exhaustion(): PlayerExhaustion;

    /**
     * @returns Player's current exhaustion.
     */
    function getExhaustion(): number;

    /**
     * Sets player's exhaustion.
     * @param value exhaustion value to be set
     */
    function setExhaustion(value: number): void;

    /**
     * Interface used to manipulate player's hunger.
     * @deprecated Consider using {@link Player.getHunger} and
     * {@link Player.setHunger}.
     */
    interface PlayerHunger {
        /**
         * @returns Player's current hunger.
         */
        get(): number;

        /**
         * Sets player's hunger.
         * @param value hunger value to be set
         */
        set(value: number): void;
    }

    /**
     * @returns An object that allows to manipulate player's exhaustion.
     * @deprecated Consider using {@link Player.getHunger} and
     * {@link Player.setHunger}.
     */
    function hunger(): PlayerHunger;

    /**
     * @returns Player's current hunger.
     */
    function getHunger(): number;

    /**
     * Sets player's hunger.
     * @param value hunger value to be set
     */
    function setHunger(value: number): void;

    /**
     * Interface used to manipulate player's saturation.
     * @deprecated Consider using {@link Player.getSaturation} and
     * {@link Player.setSaturation}.
     */
    interface PlayerSaturation {
        /**
         * @returns Player's current saturation.
         */
        get(): number;

        /**
         * Sets player's saturation.
         * @param value saturation value to be set
         */
        set(value: number): void;
    }

    /**
     * @returns An object that allows to manipulate player's saturation.
     * @deprecated Consider using {@link Player.getSaturation} and
     * {@link Player.setSaturation}.
     */
    function saturation(): PlayerSaturation;

    /**
     * @returns Player's current saturation.
     */
    function getSaturation(): number;

    /**
     * Sets player's saturation.
     * @param value saturation value to be set
     */
    function setSaturation(value: number): void;

    /**
     * Interface used to manipulate player's health.
     * @deprecated Consider using {@link Player.getHealth} and
     * {@link Player.setHealth}.
     */
    interface PlayerHealth {
        /**
         * @returns Player's current health.
         */
        get(): number;

        /**
         * Sets player's health.
         * @param value health value to be set
         */
        set(value: number): void;
    }

    /**
     * @returns An object that allows to manipulate player's health.
     * @deprecated Consider using {@link Player.getHealth} and
     * {@link Player.setHealth}.
     */
    function health(): PlayerHealth;

    /**
     * @returns Player's current health.
     */
    function getHealth(): number;

    /**
     * Sets player's health.
     * @param value Health value to be set.
     */
    function setHealth(value: number): void;

    /**
     * Interface used to manipulate player's score.
     * @deprecated Consider using {@link Player.getScore}.
     */
    interface PlayerScore {
        /**
         * @returns Player's current score.
         */
        get(): number;
    }

    /**
     * @returns An object that allows to manipulate player's score.
     * @deprecated Consider using {@link Player.getScore}.
     */
    function score(): PlayerScore;

    /**
     * @returns Player's current score.
     */
    function getScore(): number;

    /**
     * Sets view zoom, to reset value call {@link Player.resetFov}.
     * @param fov view zoom, default zoom is about 70
     */
    function setFov(fov: number): void;

    /**
     * Resets view zoom to the default value.
     */
    function resetFov(): void;

    /**
     * Sets player's camera to the specified entity.
     * @param entityUid entity uid
     */
    function setCameraEntity(entityUid: number): void;

    /**
     * Resets player's camera if it was previously set to another entity.
     */
    function resetCameraEntity(): void;

    /**
     * Sets some of the player's abilities. If the argument is of type
     * boolean, sets the ability as the boolean one, otherwise as numeric one.
     * @param ability ability name constant, should be
     * one of the {@link EPlayerAbility} constants
     * @param value the value to be set for the ability; can be either boolean
     * or number, depending on the ability
     * @since 2.0.3b33
     */
    function setAbility(ability: string, value: boolean | number): void;

    /**
     * Gets one of the player's abilities in a form
     * of floating-point number.
     * @param ability ability name constant, should be
     * one of the {@link EPlayerAbility} constants
     * @returns Current value of the ability in a form
     * of floating-point number.
     * @since 2.0.3b33
     */
    function getFloatAbility(ability: string): number;

    /**
     * Gets one of the player's abilities in a boolean form.
     * @param ability ability name constant, should be
     * one of the {@link EPlayerAbility} constants
     * @returns Current value of the ability in a boolean form.
     * @since 2.0.3b33
     */
    function getBooleanAbility(ability: string): number;

}
