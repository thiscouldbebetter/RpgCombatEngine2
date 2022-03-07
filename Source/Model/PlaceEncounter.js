"use strict";
class PlaceEncounter extends Place {
    constructor(name, partyPlayer, partyEnemy) {
        var colors = Color.Instances();
        var cursorActor = new Cursor(colors.Blue, uwpe => uwpe.place.agentActing);
        var cursorTarget = new Cursor(colors.Red, uwpe => uwpe.place.agentActing.actionCurrent.target);
        super(name, PlaceEncounter.defnBuild().name, null, // parentName
        Coords.fromXY(400, 300), // size
        // entities
        [
            new UserInputListener()
        ].concat(partyPlayer.agents).concat(partyEnemy.agents).concat([
            cursorActor,
            cursorTarget
        ]));
        this.partyPlayer = partyPlayer;
        this.partyEnemy = partyEnemy;
        this.agentActing = this.partyPlayer.agents[0]; // todo
        this.cursorActor = cursorActor;
        this.cursorTarget = cursorTarget;
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
    statusMessage(uwpe) {
        var returnValue = this.agentActing.toStringAction();
        return returnValue;
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
        super.updateForTimerTick(uwpe);
    }
    toControl(universe, world) {
        var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
        var listSize = Coords.fromXY(90, 70); // size
        var labelEnemies = ControlLabel.fromPosAndTextString(Coords.fromXY(5, 0), "Enemies:");
        var listPartyEnemy = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(5, 15), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyEnemy.agents), // items
        DataBinding.fromGet(x => x.toStringStatus()));
        //listPartyEnemy.bindingForIsEnabled = DataBinding.fromFalse();
        listPartyEnemy.confirm = () => {
            var world = universe.world;
            var encounter = world.placeCurrent;
            var agentActing = encounter.agentActing;
            var action = agentActing.actionCurrent;
            var actionDefn = action.defn;
            if (actionDefn == null) {
                // Do nothing.
            }
            else {
                var agentToTarget = listPartyEnemy.itemSelected();
                var targetType = actionDefn.targetType;
                if (targetType == null) {
                    throw new Error("todo - targetType is null.");
                }
                else {
                    var agentsTargetable = targetType.agentsTargetableGet(uwpe);
                    var isTargetTargetable = (agentsTargetable.indexOf(agentToTarget) >= 0);
                    if (isTargetTargetable) {
                        action.target = agentToTarget;
                    }
                }
            }
        };
        var labelActions = ControlLabel.fromPosAndTextString(Coords.fromXY(205, 0), "Actions:");
        var listActionsPlayerItems = DataBinding.fromContextAndGet(uwpe, (c) => c.place.agentActing.actionDefnsAvailable(uwpe));
        var listActionsPlayerBindingForItemSelected = new DataBinding(uwpe, c => c.place.actionDefnSelected, (c, v) => c.place.actionDefnSelected = v);
        var listActionsPlayer = ControlList.fromPosSizeItemsAndBindingsForItemTextAndSelected(Coords.fromXY(205, 15), // pos
        listSize, listActionsPlayerItems, DataBinding.fromGet(x => x.name), // itemText
        listActionsPlayerBindingForItemSelected);
        listActionsPlayer.confirm = () => {
            var actionDefnToSelect = listActionsPlayer.itemSelected();
            actionDefnToSelect.select(uwpe);
        };
        var labelParty = ControlLabel.fromPosAndTextString(Coords.fromXY(305, 0), "Party:");
        var listPartyPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(305, 15), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyPlayer.agents), DataBinding.fromGet(x => x.toStringStatus()));
        //listPartyPlayer.bindingForIsEnabled = DataBinding.fromFalse();
        listPartyPlayer.confirm = () => {
            alert("todo - listPartyPlayer.confirm");
        };
        var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
        var labelMessage = ControlLabel.fromPosAndText(Coords.fromXY(5, 85), DataBinding.fromContextAndGet(this, c => c.statusMessage(uwpe)));
        var returnValue = ControlContainer.from4("containerEncounter", Coords.fromXY(0, 200), // pos
        Coords.fromXY(400, 100), // size
        // children
        [
            labelEnemies,
            listPartyEnemy,
            labelActions,
            listActionsPlayer,
            labelParty,
            listPartyPlayer,
            labelMessage
        ]);
        return returnValue;
    }
}
