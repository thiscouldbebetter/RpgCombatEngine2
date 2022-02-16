
class AgentAction
{
	name: string;

	constructor(name: string)
	{
		this.name = name;
	}

	static _instances: AgentAction_Instances;
	static Instances(): AgentAction_Instances
	{
		if (AgentAction._instances == null)
		{
			AgentAction._instances = new AgentAction_Instances();
		}
		return AgentAction._instances;
	}
}

class AgentAction_Instances
{
	Fight: AgentAction;

	constructor()
	{
		this.Fight = new AgentAction("Fight");
	}
}