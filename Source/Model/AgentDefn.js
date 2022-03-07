"use strict";
class AgentDefn {
    constructor(name, hasPersonalName, size, killable, visual, spellcasting, actionDefnRoot) {
        this.name = name;
        this.hasPersonalName = hasPersonalName;
        this.size = size;
        this.killable = killable;
        this.visual = visual;
        this.spellcasting = spellcasting;
        this.actionDefnRoot = actionDefnRoot;
    }
    static Instances() {
        if (AgentDefn._instances == null) {
            AgentDefn._instances = new AgentDefn_Instances();
        }
        return AgentDefn._instances;
    }
    // EntityProperty.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
class AgentDefn_Instances {
    constructor() {
        var agentSizePlayer = Coords.fromXY(24, 24);
        var agentSizeMedium = Coords.fromXY(32, 32);
        var agentSizeLarge = Coords.fromXY(48, 48);
        var actionDefns = AgentActionDefn.Instances();
        var spellcastingNone = new AgentSpellcasting(0, // energyMax
        [] // spellsKnown
        );
        var actionRootCommon = new AgentActionDefn("[root]", null, // targetType
        null, // select
        // children
        [
            actionDefns.Fight,
            actionDefns.Defend,
            actionDefns.Item,
            actionDefns.Wait,
            actionDefns.Withdraw
        ]);
        this.Player_Mage = new AgentDefn("Mage", true, // hasPersonalName
        agentSizePlayer, Killable.fromIntegrityMax(10), new VisualImageScaledPartial(Box.fromMinAndSize(agentSizePlayer.clone().multiply(Coords.fromXY(0, 0)), agentSizePlayer), agentSizePlayer, new VisualImageFromLibrary("Agents_Agents")), spellcastingNone, actionRootCommon);
        this.Player_Priest = new AgentDefn("Priest", true, // hasPersonalName
        agentSizePlayer, Killable.fromIntegrityMax(15), new VisualImageScaledPartial(Box.fromMinAndSize(agentSizePlayer.clone().multiply(Coords.fromXY(1, 0)), agentSizePlayer), agentSizePlayer, new VisualImageFromLibrary("Agents_Agents")), spellcastingNone, actionRootCommon);
        this.Player_Rogue = new AgentDefn("Rogue", true, // hasPersonalName
        agentSizePlayer, Killable.fromIntegrityMax(15), new VisualImageScaledPartial(Box.fromMinAndSize(agentSizePlayer.clone().multiply(Coords.fromXY(3, 0)), agentSizePlayer), agentSizePlayer, new VisualImageFromLibrary("Agents_Agents")), spellcastingNone, actionRootCommon);
        this.Player_Warrior = new AgentDefn("Warrior", true, // hasPersonalName
        agentSizePlayer, Killable.fromIntegrityMax(20), new VisualImageScaledPartial(Box.fromMinAndSize(agentSizePlayer.clone().multiply(Coords.fromXY(2, 0)), agentSizePlayer), agentSizePlayer, new VisualImageFromLibrary("Agents_Agents")), spellcastingNone, actionRootCommon);
        // Enemies.
        this.Goblin = new AgentDefn("Goblin", false, // hasPersonalName
        agentSizeMedium, Killable.fromIntegrityMax(10), new VisualImageFromLibrary("Agents_Goblin"), spellcastingNone, null // action
        );
        this.Troll = new AgentDefn("Troll", false, // hasPersonalName
        agentSizeLarge, Killable.fromIntegrityMax(20), new VisualImageFromLibrary("Agents_Troll"), spellcastingNone, null // action
        );
    }
}
