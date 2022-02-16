"use strict";
class PlaceEncounter extends Place {
    constructor(name, partyPlayer, partyEnemy) {
        super(name, PlaceEncounter.defnBuild().name, null, // parentName
        Coords.fromXY(400, 300), // size
        // entities
        [
            new UserInputListener(),
        ].concat(partyPlayer.agents).concat(partyEnemy.agents));
        this.partyPlayer = partyPlayer;
        this.partyEnemy = partyEnemy;
        this.agentCurrent = this.partyPlayer.agents[0]; // todo
    }
    static defnBuild() {
        var actionDisplayRecorderStartStop = DisplayRecorder.actionStartStop();
        var actionShowMenu = Action.Instances().ShowMenuSettings;
        var actions = [
            actionDisplayRecorderStartStop,
            actionShowMenu
        ];
        var inputNames = Input.Names();
        var actionToInputsMappings = [
            new ActionToInputsMapping(actionDisplayRecorderStartStop.name, ["~"], true // inactivate
            ),
            ActionToInputsMapping.fromActionNameAndInputName(actionShowMenu.name, inputNames.Escape)
        ];
        var entityPropertyNamesToProcess = [
            Actor.name,
            Collidable.name,
            Constrainable.name,
            Locatable.name
        ];
        return PlaceDefn.from5(PlaceEncounter.name, "Music_Music", // soundForMusicName
        actions, actionToInputsMappings, entityPropertyNamesToProcess);
    }
    // Place.
    updateForTimerTick(uwpe) {
        if (this._control == null) {
            var universe = uwpe.universe;
            var venueWorld = universe.venueCurrent;
            if (venueWorld.constructor.name == VenueWorld.name) {
                var venueControls = venueWorld.venueControls;
                this._control = this.toControl(uwpe.universe, uwpe.world);
                venueControls.controlRoot = this._control;
            }
        }
    }
    toControl(universe, world) {
        var placeEncounter = this;
        var listPartyEnemy = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(0, 0), // pos
        Coords.fromXY(100, 100), // size
        DataBinding.fromContextAndGet(placeEncounter, (c) => c.partyEnemy.agents), DataBinding.fromGet(x => x.toString()));
        var listActionsPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(200, 0), // pos
        Coords.fromXY(100, 100), // size
        DataBinding.fromContextAndGet(placeEncounter, (c) => c.agentCurrent.actionsAvailable()), DataBinding.fromGet(x => x.name));
        var listPartyPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(300, 0), // pos
        Coords.fromXY(100, 100), // size
        DataBinding.fromContextAndGet(placeEncounter, (c) => c.partyPlayer.agents), DataBinding.fromGet(x => x.toString()));
        var returnValue = ControlContainer.from4("containerEncounter", Coords.fromXY(0, 200), // pos
        Coords.fromXY(400, 100), // size
        // children
        [
            listPartyEnemy,
            listActionsPlayer,
            listPartyPlayer
        ]);
        return returnValue;
    }
}
