"use strict";
class WorldExtended extends World {
    constructor() {
        super("RpgCombatEngine", DateTime.now(), WorldExtended.defnBuild(), [
            new PlaceEncounter(PlaceEncounter.name + "0", new Party("Player", [
                new Agent("Warrior", AgentDefn.Instances().Player_Warrior, Coords.fromXY(350, 40)),
                new Agent("Rogue", AgentDefn.Instances().Player_Rogue, Coords.fromXY(350, 80)),
                new Agent("Priest", AgentDefn.Instances().Player_Priest, Coords.fromXY(350, 120)),
                new Agent("Mage", AgentDefn.Instances().Player_Mage, Coords.fromXY(350, 160))
            ]), new Party("Enemy", [
                new Agent(null, // name
                AgentDefn.Instances().Goblin, Coords.fromXY(150, 67)),
                new Agent(null, // name
                AgentDefn.Instances().Goblin, Coords.fromXY(150, 134)),
                new Agent(null, // name
                AgentDefn.Instances().Troll, Coords.fromXY(50, 100))
            ]))
        ]);
    }
    static defnBuild() {
        return new WorldDefn(null, // actions
        [
            UserInputListener.activityDefnHandleUserInputBuild()
        ], null, // entityDefns
        null, // itemDefns
        [
            PlaceEncounter.defnBuild()
        ], null // skills
        );
    }
    toControl() {
        return new ControlNone();
    }
}
