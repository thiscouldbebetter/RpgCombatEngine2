
class PlaceEncounter extends Place
{
	partyPlayer: Party;
	partyEnemy: Party;

	agentActing: Agent;
	agentToTarget: Agent;

	constructor
	(
		name: string,
		partyPlayer: Party,
		partyEnemy: Party
	)
	{
		super
		(
			name,
			PlaceEncounter.defnBuild().name,
			null, // parentName
			Coords.fromXY(400, 300), // size
			 // entities
			[
				new UserInputListener()
			].concat
			(
				partyPlayer.agents
			).concat
			(
				partyEnemy.agents
			).concat
			(
				[
					new Cursor
					(
						uwpe => (uwpe.place as PlaceEncounter).agentActing
					),

					new Cursor
					(
						uwpe => (uwpe.place as PlaceEncounter).agentToTarget
					)
				]
			)
		);

		this.partyPlayer = partyPlayer;
		this.partyEnemy = partyEnemy;

		this.agentActing = this.partyPlayer.agents[0]; // todo
		this.agentToTarget = null;
	}

	static defnBuild(): PlaceDefn
	{
		var actionDisplayRecorderStartStop = DisplayRecorder.actionStartStop();
		var actionShowMenu = Action.Instances().ShowMenuSettings;

		var actions =
		[
			actionDisplayRecorderStartStop,
			actionShowMenu
		];

		var inputNames = Input.Names();

		var actionToInputsMappings =
		[
			new ActionToInputsMapping
			(
				actionDisplayRecorderStartStop.name, [ "~" ], true // inactivate
			),

			ActionToInputsMapping.fromActionNameAndInputName
			(
				actionShowMenu.name, inputNames.Escape
			)
		];

		var entityPropertyNamesToProcess: string[] =
		[
			Actor.name,
			Collidable.name,
			Constrainable.name,
			Locatable.name
		];

		return PlaceDefn.from5
		(
			PlaceEncounter.name,
			"Music_Music", // soundForMusicName
			actions,
			actionToInputsMappings,
			entityPropertyNamesToProcess
		);
	}

	// Place.

	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void
	{
		if (this._control == null)
		{
			var universe = uwpe.universe;
			var venueWorld = universe.venueCurrent as VenueWorld;
			if (venueWorld.constructor.name == VenueWorld.name)
			{
				var venueControls = venueWorld.venueControls;
				this._control = this.toControl(uwpe.universe, uwpe.world);
				venueControls.controlRoot = this._control;
			}
		}
	}

	// Controls.

	_control: ControlBase;

	toControl(universe: Universe, world: World): ControlBase
	{
		var uwpe = new UniverseWorldPlaceEntities
		(
			universe, world, this, null, null
		);

		var listSize = Coords.fromXY(100, 90); // size

		var labelEnemies = ControlLabel.fromPosAndTextString
		(
			Coords.fromXY(0, 0), "Enemies:"
		);

		var listPartyEnemy = 
			ControlList.fromPosSizeItemsAndBindingForItemText
			(
				Coords.fromXY(0, 10), // pos
				listSize,
				DataBinding.fromContextAndGet
				(
					uwpe,
					(c: UniverseWorldPlaceEntities) =>
						(c.place as PlaceEncounter).partyEnemy.agents
				),
				DataBinding.fromGet(x => x.toString())
			);

		listPartyEnemy.bindingForIsEnabled = DataBinding.fromFalse();

		var labelActions = ControlLabel.fromPosAndTextString
		(
			Coords.fromXY(200, 0), "Actions:"
		);

		var listActionsPlayer = 
			ControlList.fromPosSizeItemsAndBindingForItemText
			(
				Coords.fromXY(200, 10), // pos
				listSize,
				DataBinding.fromContextAndGet
				(
					uwpe,
					(c: UniverseWorldPlaceEntities) =>
						(c.place as PlaceEncounter).agentActing.actionDefnsAvailable(uwpe)
				),
				DataBinding.fromGet(x => x.name)
			);

		listActionsPlayer.confirm = (universe: Universe) =>
		{
			alert("todo");
		};

		var labelParty = ControlLabel.fromPosAndTextString
		(
			Coords.fromXY(300, 0), "Party:"
		);

		var listPartyPlayer = 
			ControlList.fromPosSizeItemsAndBindingForItemText
			(
				Coords.fromXY(300, 10), // pos
				listSize,
				DataBinding.fromContextAndGet
				(
					uwpe,
					(c: UniverseWorldPlaceEntities) =>
						(c.place as PlaceEncounter).partyPlayer.agents
				),
				DataBinding.fromGet(x => x.toString())
			);

		listPartyPlayer.bindingForIsEnabled = DataBinding.fromFalse();

		var returnValue = ControlContainer.from4
		(
			"containerEncounter",
			Coords.fromXY(0, 200), // pos
			Coords.fromXY(400, 100), // size
			// children
			[
				labelEnemies,
				listPartyEnemy,

				labelActions,
				listActionsPlayer,

				labelParty,
				listPartyPlayer
			]
		);

		return returnValue;
	}
}
