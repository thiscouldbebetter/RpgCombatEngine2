"use strict";
class Cursor extends Entity {
    constructor(agentToHighlightGet) {
        super(Cursor.name, [
            new Constrainable([
                new Constraint_Cursor(agentToHighlightGet)
            ]),
            Drawable.fromVisual(VisualPolygon.default()),
            Locatable.fromPos(Coords.fromXY(100, 100))
        ]);
    }
}
class Constraint_Cursor {
    constructor(agentToHighlightGet) {
        this.agentToHighlightGet = agentToHighlightGet;
    }
    constrain(uwpe) {
        var cursor = uwpe.entity;
        var agentToHighlight = this.agentToHighlightGet(uwpe);
        if (agentToHighlight == null) {
            cursor.drawable().hide();
        }
        else {
            cursor.drawable().show();
            var agentPos = agentToHighlight.locatable().loc.pos;
            var cursorPos = cursor.locatable().loc.pos;
            cursorPos.overwriteWith(agentPos);
            var agentDefn = agentToHighlight.defn();
            cursorPos.addXY(0, 0 - agentDefn.size.y);
        }
    }
    clone() { return this; }
    overwriteWith(other) { return this; }
}
