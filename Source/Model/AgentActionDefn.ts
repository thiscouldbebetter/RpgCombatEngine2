
class AgentActionDefn
{
	name: string;
	targetType: AgentActionTargetType;
	_select: (uwpe: UniverseWorldPlaceEntities) => void;
	_childrenGet: (uwpe: UniverseWorldPlaceEntities) => AgentActionDefn[];

	constructor
	(
		name: string,
		targetType: AgentActionTargetType,
		select: (uwpe: UniverseWorldPlaceEntities) => void,
		childrenGet: (uwpe: UniverseWorldPlaceEntities) => AgentActionDefn[]
	)
	{
		this.name = name;
		this.targetType = targetType;
		this._select = select;
		this._childrenGet = childrenGet;
	}

	children(uwpe: UniverseWorldPlaceEntities): AgentActionDefn[]
	{
		var returnChildren: AgentActionDefn[];

		if (this._childrenGet != null)
		{
			returnChildren = this._childrenGet(uwpe);
		}

		return returnChildren;
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
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Defend");
			},
			null // childrenGet
		);

		this.Fight = new AgentActionDefn
		(
			"Fight",
			targetTypes.Enemy,
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Fight");
			},
			null // childrenGet
		);

		this.Item = new AgentActionDefn
		(
			"Use Item",
			null, // targetType
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Item");
			},
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Item");
			}
		);

		this.Magic = new AgentActionDefn
		(
			"Magic",
			null, // targetType
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Magic");
			},
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo - Magic");
			}
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
			null // childrenGet
		);

		this.Withdraw = new AgentActionDefn
		(
			"Withdraw",
			targetTypes.None,
			// select
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				throw new Error("todo");
			},
			null // childrenGet
		);

	}
}