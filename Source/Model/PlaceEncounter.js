"use strict";
class PlaceEncounter extends Place {
    constructor(name, partyPlayer, partyEnemy) {
        var cursorActor = new Cursor(uwpe => uwpe.place.agentActing);
        var cursorTarget = new Cursor(uwpe => uwpe.place.agentToTarget);
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
        this.agentToTarget = null;
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
    }
    toControl(universe, world) {
        var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
        var listSize = Coords.fromXY(90, 70); // size
        var labelEnemies = ControlLabel.fromPosAndTextString(Coords.fromXY(5, 0), "Enemies:");
        var listPartyEnemy = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(5, 15), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyEnemy.agents), DataBinding.fromGet(x => x.toStringStatus()));
        listPartyEnemy.bindingForIsEnabled = DataBinding.fromFalse();
        var labelActions = ControlLabel.fromPosAndTextString(Coords.fromXY(205, 0), "Actions:");
        var listActionsPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(205, 15), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.agentActing.actionDefnsAvailable(uwpe)), DataBinding.fromGet(x => x.name));
        listActionsPlayer.confirm = () => {
            var world = universe.world;
            var encounter = world.placeCurrent;
            var agent = encounter.agentActing;
            var actionDefn = agent.actionDefnSelected;
            agent.actionCurrent = new AgentAction(actionDefn);
            var targetType = actionDefn.targetType;
            var targetTypesAll = AgentActionTargetType.Instances();
            if (targetType == targetTypesAll.Enemy) // hack
             {
                // todo
            }
            this.cursorTarget.drawable().show();
        };
        var labelParty = ControlLabel.fromPosAndTextString(Coords.fromXY(305, 0), "Party:");
        var listPartyPlayer = ControlList.fromPosSizeItemsAndBindingForItemText(Coords.fromXY(305, 15), // pos
        listSize, DataBinding.fromContextAndGet(uwpe, (c) => c.place.partyPlayer.agents), DataBinding.fromGet(x => x.toStringStatus()));
        listPartyPlayer.bindingForIsEnabled = DataBinding.fromFalse();
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
