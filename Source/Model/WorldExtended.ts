
class WorldExtended extends World
{
	constructor()
	{
		var placeDefn = WorldExtended.defnBuild();

		var agentDefns = AgentDefn.Instances();

		var partyPlayerAgents =
		[
			new Agent
			(
				"Warrior",
				agentDefns.Player_Warrior,
				Coords.fromXY(350, 40)
			),

			new Agent
			(
				"Rogue",
				agentDefns.Player_Rogue,
				Coords.fromXY(350, 80)
			),

			new Agent
			(
				"Priest",
				agentDefns.Player_Priest,
				Coords.fromXY(350, 120)
			),

			new Agent
			(
				"Mage",
				agentDefns.Player_Mage,
				Coords.fromXY(350, 160)
			)
		];

		var partyPlayerItems =
		[
			new Item("Healing Potion", 4),
			new Item("Stoneskin Potion", 2),
		];

		var partyPlayer = new Party
		(
			"Player", partyPlayerAgents, partyPlayerItems
		);

		var partyEnemy = new Party
		(
			"Enemy",
			[
				new Agent
				(
					null, // name
					agentDefns.Goblin,
					Coords.fromXY(150, 67)
				),

				new Agent
				(
					null, // name
					agentDefns.Goblin,
					Coords.fromXY(150, 134)
				),

				new Agent
				(
					null, // name
					agentDefns.Troll,
					Coords.fromXY(50, 100)
				)
			],

			null // items
		);

		var place = new PlaceEncounter
		(
			PlaceEncounter.name + "0",
			partyPlayer,
			partyEnemy
		);

		var places = [ place ];

		var placesByName = ArrayHelper.addLookupsByName(places);

		super
		(
			"RpgCombatEngine",
			DateTime.now(),
			placeDefn,
			(placeName: string) => placesByName.get(placeName),
			PlaceEncounter.name + "0" // placeInitialName
		);
	}

	static defnBuild(): WorldDefn
	{
		return WorldDefn.from6
		(
			[], // actions
			[
				ActivityDefn.Instances().DoNothing,
				UserInputListener.activityDefn()
			],
			[], // entityDefns
			[
				ItemDefn.fromName("Healing Potion"),
				ItemDefn.fromName("Stoneskin Potion")
			], // itemDefns
			[
				PlaceEncounter.defnBuild()
			],
			[] // skills
		);
	}

	toControl(): ControlBase
	{
		return new ControlNone();
	}
}
