
class Party
{
	name: string;
	agents: Agent[];
	items: Item[];

	constructor
	(
		name: string,
		agents: Agent[],
		items: Item[]
	)
	{
		this.name = name;
		this.agents = agents;
		this.items = items || [];
	}
}