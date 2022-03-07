
class AgentActionDefn
{
	name: string;
	targetType: AgentActionTargetType;
	_select: (uwpe: UniverseWorldPlaceEntities) => void;
	children: AgentActionDefn[]

	constructor
	(
		name: string,
		targetType: AgentActionTargetType,
		select: (uwpe: UniverseWorldPlaceEntities) => void,
		children: AgentActionDefn[]
	)
	{
		this.name = name;
		this.targetType = targetType;
		this._select = select;
		this.children = children;
	}

	select(uwpe: UniverseWorldPlaceEntities): void
	{
		if (this._select != null)
		{
			this._select(uwpe);
		}
	}

	static _instances: AgentActionDefn_Instances;
	static Instances(): AgentActionDefn_Instances
	{
		if (AgentActionDefn._instances == null)
		{
			AgentActionDefn._instances = new AgentActionDefn_Instances();
		}
		return AgentActionDefn._instances;
	}

	static selectChildren(uwpe: UniverseWorldPlaceEntities): void
	{
		throw new Error("todo - selectChildren()");
	}

	static selectTargetable(uwpe: UniverseWorldPlaceEntities): void
	{
		var universe = uwpe.universe;
		var world = universe.world as WorldExtended;
		var encounter = world.placeCurrent as PlaceEncounter;
		var agent = encounter.agentActing;
		var actionDefnToSelect = encounter.actionDefnSelected;
		agent.actionCurrent.defn = actionDefnToSelect;
		var targetType = actionDefnToSelect.targetType;
		if (targetType == null)
		{
			throw new Error("todo - targetType is null");
		}
		else
		{
			// todo
		}
	}

}

class AgentActionDefn_Instances
{
	Defend: AgentActionDefn;
	Fight: AgentActionDefn;
	Item: AgentActionDefn;
	Magic: AgentActionDefn;
	Wait: AgentActionDefn;
	Withdraw: AgentActionDefn;

	constructor()
	{
		var targetTypes = AgentActionTargetType.Instances();

		this.Defend = new AgentActionDefn
		(
			"Defend",
			targetTypes.Ally,
			AgentActionDefn.selectTargetable,
			null // children
		);

		this.Fight = new AgentActionDefn
		(
			"Fight",
			targetTypes.Enemy,
			AgentActionDefn.selectTargetable,
			null // children
		);

		this.Item = new AgentActionDefn
		(
			"Use Item",
			null, // targetType
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				var placeEncounter = uwpe.place as PlaceEncounter;
				var agentActionDefn = placeEncounter.actionDefnSelected;
				var partyPlayer = placeEncounter.partyPlayer;
				var items = partyPlayer.items;
				agentActionDefn.children = items.map
				(
					item => new AgentActionDefn
					(
						item.defnName,
						null, // targetType
						// select
						(uwpe2: UniverseWorldPlaceEntities) =>
						{
							alert("todo - item - " + item.defnName);
						},
						null // children
					)
				);
				var agentActing = placeEncounter.agentActing;
				agentActing.actionDefnSelected = agentActionDefn;
			},
			null // children
		);

		this.Magic = new AgentActionDefn
		(
			"Cast Spell",
			null, // targetType
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				var placeEncounter = uwpe.place as PlaceEncounter;
				var agentActing = placeEncounter.agentActing;
				var agentActingDefn = agentActing.defn();
				var agentActionDefn = agentActing.actionDefnSelected;
				var spells = agentActingDefn.spellcasting.spellsKnown;
				agentActionDefn.children = spells.map
				(
					spell => new AgentActionDefn
					(
						spell.name,
						null, // targetType
						(uwpe2: UniverseWorldPlaceEntities) => 
						{
							throw new Error("todo - spells - " + spell.name);
						},
						null // children
					)
				);
				agentActing.actionDefnSelected = agentActionDefn;
			},
			null // children
		);

		this.Wait = new AgentActionDefn
		(
			"Wait",
			targetTypes.None,
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Wait");
			},
			null // children
		);

		this.Withdraw = new AgentActionDefn
		(
			"Withdraw",
			targetTypes.None,
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Withdraw");
			},
			null // children
		);

	}
}