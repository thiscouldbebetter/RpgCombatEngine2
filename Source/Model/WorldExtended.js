"use strict";
class WorldExtended extends World {
    constructor() {
        var agentDefns = AgentDefn.Instances();
        var place = new PlaceEncounter(PlaceEncounter.name + "0", new Party("Player", [
            new Agent("Warrior", agentDefns.Player_Warrior, Coords.fromXY(350, 40)),
            new Agent("Rogue", agentDefns.Player_Rogue, Coords.fromXY(350, 80)),
            new Agent("Priest", agentDefns.Player_Priest, Coords.fromXY(350, 120)),
            new Agent("Mage", agentDefns.Player_Mage, Coords.fromXY(350, 160))
        ]), new Party("Enemy", [
            new Agent(null, // name
            agentDefns.Goblin, Coords.fromXY(150, 67)),
            new Agent(null, // name
            agentDefns.Goblin, Coords.fromXY(150, 134)),
            new Agent(null, // name
            agentDefns.Troll, Coords.fromXY(50, 100))
        ]));
        var places = [place];
        var placesByName = ArrayHelper.addLookupsByName(places);
        super("RpgCombatEngine", DateTime.now(), WorldExtended.defnBuild(), (placeName) => placesByName.get(placeName), PlaceEncounter.name + "0" // placeInitialName
        );
    }
    static defnBuild() {
        return WorldDefn.from6([], // actions
        [
            ActivityDefn.Instances().DoNothing,
            UserInputListener.activityDefn()
        ], [], // entityDefns
        [], // itemDefns
        [
            PlaceEncounter.defnBuild()
        ], [] // skills
        );
    }
    toControl() {
        return new ControlNone();
    }
}
