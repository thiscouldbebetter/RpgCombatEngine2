
class Cursor extends Entity
{
	constructor
	(
		color: Color,
		agentToHighlightGet: (uwpe: UniverseWorldPlaceEntities) => Agent
	)
	{
		super
		(
			Cursor.name,
			[
				new Constrainable
				([
					new Constraint_Cursor(agentToHighlightGet)
				]),
				Drawable.fromVisual
				(
					VisualPolygon.arrow(10, 10, 0, color, Color.Instances().Gray)
				),
				Locatable.fromPos(Coords.fromXY(100, 100))
			]
		);
	}
}

class Constraint_Cursor implements Constraint
{
	agentToHighlightGet: (uwpe: UniverseWorldPlaceEntities) => Agent;

	constructor
	(
		agentToHighlightGet: (uwpe: UniverseWorldPlaceEntities) => Agent
	)
	{
		this.agentToHighlightGet = agentToHighlightGet;
	}

	constrain(uwpe: UniverseWorldPlaceEntities): void
	{
		var cursor = uwpe.entity;

		var agentToHighlight = this.agentToHighlightGet(uwpe);

		if (agentToHighlight == null)
		{
			cursor.drawable().hide();
		}
		else
		{
			cursor.drawable().show();

			var agentPos = agentToHighlight.locatable().loc.pos;
			var cursorPos = cursor.locatable().loc.pos;
			cursorPos.overwriteWith(agentPos);

			var agentDefn = agentToHighlight.defn();
			cursorPos.addXY(0 - agentDefn.size.x / 2, 0);
		}
	}

	clone(): Constraint { return this; }
	overwriteWith(other: Constraint) { return this; }
}