
class Agent extends Entity
{
	constructor
	(
		name: string,
		defn: AgentDefn,
		pos: Coords
	)
	{
		super
		(
			name,
			[
				defn,
				Drawable.fromVisual(defn.visual),
				defn.killable.clone(),
				Locatable.fromPos(pos)
			]
		);
	}

	actionsAvailable(): AgentAction[]
	{
		return this.defn().actionsAvailable;
	}

	toString(): string
	{
		var killable = this.killable();
		var defn = this.defn();
		var name = (defn.hasPersonalName ? this.name : defn.name);
		var returnValue =
			name + ": " + killable.integrityCurrentOverMax();
		return returnValue;
	}

	// Properties.

	defn(): AgentDefn
	{
		return this.propertyByName(AgentDefn.name) as AgentDefn;
	}
}