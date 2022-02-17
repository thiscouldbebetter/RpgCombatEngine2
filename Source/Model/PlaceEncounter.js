"use strict";
class PlaceEncounter extends Place {
    constructor(name, partyPlayer, partyEnemy) {
        super(name, PlaceEncounter.defnBuild().name, null, // parentName
        Coords.fromXY(400, 300), // size
        // entities
        [
            new UserInputListener()
        ].concat(partyPlayer.agents).concat(partyEnemy.agents).concat([
            new Cursor(uwpe => uwpe.place.agentActing),
            new Cursor(uwpe => uwpe.place.agentToTarget)
        ]));
        this.partyPlayer = partyPlayer;
        this.partyEnemy = partyEnemy;
        this.agentActing = this.partyPlayer.agents[0]; // todo
        this.agentToTarget = null;
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
        var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
        var listSize = Coords.fromXY(100, 90); // size
        var labelEnemies = ControlLabel.fromPosAndTextString(Coords.fromXY(0, 0), "Enemies:");
        var listPartyEnemy = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(0, 10), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyEnemy.agents), DataBinding.fromGet(x => x.toString()));
        listPartyEnemy.bindingForIsEnabled = DataBinding.fromFalse();
        var labelActions = ControlLabel.fromPosAndTextString(Coords.fromXY(200, 0), "Actions:");
        var listActionsPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(200, 10), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.agentActing.actionDefnsAvailable(uwpe)), DataBinding.fromGet(x => x.name));
        listActionsPlayer.confirm = (universe) => {
            alert("todo");
        };
        var labelParty = ControlLabel.fromPosAndTextString(Coords.fromXY(300, 0), "Party:");
        var listPartyPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(300, 10), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyPlayer.agents), DataBinding.fromGet(x => x.toString()));
        listPartyPlayer.bindingForIsEnabled = DataBinding.fromFalse();
        var returnValue = ControlContainer.from4("containerEncounter", Coords.fromXY(0, 200), // pos
        Coords.fromXY(400, 100), // size
        // children
        [
            labelEnemies,
            listPartyEnemy,
            labelActions,
            listActionsPlayer,
            labelParty,
            listPartyPlayer
        ]);
        return returnValue;
    }
}
