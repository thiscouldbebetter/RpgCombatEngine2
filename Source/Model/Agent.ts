
class Agent extends Entity
{
	actionCurrent: AgentAction;
	actionDefnSelected: AgentActionDefn;

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
				Actor.default(),
				defn,
				Drawable.fromVisual(defn.visual),
				defn.killable.clone(),
				Locatable.fromPos(pos)
			]
		);
	}

	actionDefnsAvailable
	(
		uwpe: UniverseWorldPlaceEntities
	): AgentActionDefn[]
	{
		if (this.actionDefnSelected == null)
		{
			var defn = this.defn();
			this.actionDefnSelected = defn.actionDefnRoot;
		}

		var returnActionDefns = this.actionDefnSelected.children(uwpe);

		return returnActionDefns;
	}

	toStringStatus(): string
	{
		var killable = this.killable();
		var defn = this.defn();
		var name = (defn.hasPersonalName ? this.name : defn.name);
		var returnValue =
			name + ": " + killable.integrityCurrentOverMax();
		return returnValue;
	}

	toStringAction(): string
	{
		var returnValue = "";
		if (this.actionCurrent == null)
		{
			returnValue = this.name + " ready.  Choose an action."
		}
		else
		{
			var action = this.actionCurrent;
			var actionDefn = action.defn;
			var actionDefnName = actionDefn.name;
			returnValue = this.name + " preparing to " + actionDefnName + ".  Choose a target.";
		}
		return returnValue;
	}

	// Properties.

	defn(): AgentDefn
	{
		return this.propertyByName(AgentDefn.name) as AgentDefn;
	}
}