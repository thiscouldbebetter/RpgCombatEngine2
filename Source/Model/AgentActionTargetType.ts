
class AgentActionTargetType
{
	name: string;
	_agentsTargetableGet: (uwpe: UniverseWorldPlaceEntities) => Agent[];

	constructor
	(
		name: string,
		agentsTargetableGet: (uwpe: UniverseWorldPlaceEntities) => Agent[]
	)
	{
		this.name = name;
		this._agentsTargetableGet = agentsTargetableGet;
	}

	static _instances: AgentActionTargetType_Instances;
	static Instances(): AgentActionTargetType_Instances
	{
		if (AgentActionTargetType._instances == null)
		{
			AgentActionTargetType._instances =
				new AgentActionTargetType_Instances();
		}
		return AgentActionTargetType._instances;
	}

	agentsTargetableGet(uwpe: UniverseWorldPlaceEntities): Agent[]
	{
		return this._agentsTargetableGet(uwpe);
	}
}

class AgentActionTargetType_Instances
{
	None: AgentActionTargetType;
	AlliesAll: AgentActionTargetType;
	Ally: AgentActionTargetType;
	EnemiesAll: AgentActionTargetType;
	Enemy: AgentActionTargetType;

	constructor()
	{
		this.None = new AgentActionTargetType
		(
			"None",
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				return null;
			}
		);

		this.AlliesAll = new AgentActionTargetType
		(
			"AlliesAll",
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				return null;
			}
		);

		this.Ally = new AgentActionTargetType
		(
			"Ally",
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				return null;
			}
		);

		this.EnemiesAll = new AgentActionTargetType
		(
			"EnemiesAll",
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				return null;
			}
		);

		this.Enemy = new AgentActionTargetType
		(
			"Enemy",
			(uwpe: UniverseWorldPlaceEntities) =>
			{
				return null;
			}
		);
	}
}