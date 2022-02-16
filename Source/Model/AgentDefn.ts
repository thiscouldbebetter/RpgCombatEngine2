
class AgentDefn implements EntityProperty<AgentDefn>
{
	name: string;
	hasPersonalName: boolean;
	size: Coords;
	killable: Killable;
	visual: VisualBase;
	actionsAvailable: AgentAction[];

	constructor
	(
		name: string,
		hasPersonalName: boolean,
		size: Coords,
		killable: Killable,
		visual: VisualBase,
		actionsAvailable: AgentAction[]
	)
	{
		this.name = name;
		this.hasPersonalName = hasPersonalName;
		this.size = size;
		this.killable = killable;
		this.visual = visual;
		this.actionsAvailable = actionsAvailable;
	}

	static _instances: AgentDefn_Instances;
	static Instances(): AgentDefn_Instances
	{
		if (AgentDefn._instances == null)
		{
			AgentDefn._instances = new AgentDefn_Instances();
		}
		return AgentDefn._instances;
	}

	// EntityProperty.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	initialize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: AgentDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}
}

class AgentDefn_Instances
{
	Player_Mage: AgentDefn;
	Player_Priest: AgentDefn;
	Player_Rogue: AgentDefn;
	Player_Warrior: AgentDefn;

	Goblin: AgentDefn;
	Troll: AgentDefn;

	constructor()
	{
		var agentSizePlayer = Coords.fromXY(24, 24);
		var agentSizeMedium = Coords.fromXY(32, 32);
		var agentSizeLarge = Coords.fromXY(48, 48);

		var actionsAvailableFight = [ AgentAction.Instances().Fight ];

		this.Player_Mage = new AgentDefn
		(
			"Mage",
			true, // hasPersonalName
			agentSizePlayer,
			Killable.fromIntegrityMax(10),
			new VisualImageScaledPartial
			(
				new VisualImageFromLibrary("Agents_Agents"),
				Box.fromMinAndSize
				(
					agentSizePlayer.clone().multiply(Coords.fromXY(0, 0)),
					agentSizePlayer
				),
				agentSizePlayer
			),
			actionsAvailableFight
		);

		this.Player_Priest = new AgentDefn
		(
			"Priest",
			true, // hasPersonalName
			agentSizePlayer,
			Killable.fromIntegrityMax(15),
			new VisualImageScaledPartial
			(
				new VisualImageFromLibrary("Agents_Agents"),
				Box.fromMinAndSize
				(
					agentSizePlayer.clone().multiply(Coords.fromXY(1, 0)),
					agentSizePlayer
				),
				agentSizePlayer
			),
			actionsAvailableFight
		);

		this.Player_Rogue = new AgentDefn
		(
			"Rogue",
			true, // hasPersonalName
			agentSizePlayer,
			Killable.fromIntegrityMax(15),
			new VisualImageScaledPartial
			(
				new VisualImageFromLibrary("Agents_Agents"),
				Box.fromMinAndSize
				(
					agentSizePlayer.clone().multiply(Coords.fromXY(3, 0)),
					agentSizePlayer
				),
				agentSizePlayer
			),
			actionsAvailableFight
		);

		this.Player_Warrior = new AgentDefn
		(
			"Warrior",
			true, // hasPersonalName
			agentSizePlayer,
			Killable.fromIntegrityMax(20),
			new VisualImageScaledPartial
			(
				new VisualImageFromLibrary("Agents_Agents"),
				Box.fromMinAndSize
				(
					agentSizePlayer.clone().multiply(Coords.fromXY(2, 0)),
					agentSizePlayer
				),
				agentSizePlayer
			),
			actionsAvailableFight
		);

		// Enemies.

		this.Goblin = new AgentDefn
		(
			"Goblin",
			false, // hasPersonalName
			agentSizeMedium,
			Killable.fromIntegrityMax(10),
			new VisualImageFromLibrary("Agents_Goblin"),
			actionsAvailableFight
		);

		this.Troll = new AgentDefn
		(
			"Troll",
			false, // hasPersonalName
			agentSizeLarge,
			Killable.fromIntegrityMax(20),
			new VisualImageFromLibrary("Agents_Troll"),
			actionsAvailableFight
		);

	}
}