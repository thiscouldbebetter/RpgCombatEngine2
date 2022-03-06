
class AgentAction
{
	defn: AgentActionDefn;
	target: Agent;

	constructor(defn: AgentActionDefn, target: Agent)
	{
		this.defn = defn;
		this.target = target;
	}

	static default(): AgentAction
	{
		return new AgentAction(null, null);
	}

	clear(): AgentAction
	{
		this.defn = null;
		this.target = null;
		return this;
	}

	run(): void
	{
		// todo
	}
}