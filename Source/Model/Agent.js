"use strict";
class Agent extends Entity {
    constructor(name, defn, pos) {
        super(name, [
            Actor.default(),
            defn,
            Drawable.fromVisual(defn.visual),
            defn.killable.clone(),
            Locatable.fromPos(pos)
        ]);
    }
    actionDefnsAvailable(uwpe) {
        if (this.actionDefnSelected == null) {
            var defn = this.defn();
            this.actionDefnSelected = defn.actionDefnRoot;
        }
        var returnActionDefns = this.actionDefnSelected.children(uwpe);
        return returnActionDefns;
    }
    toString() {
        var killable = this.killable();
        var defn = this.defn();
        var name = (defn.hasPersonalName ? this.name : defn.name);
        var returnValue = name + ": " + killable.integrityCurrentOverMax();
        return returnValue;
    }
    // Properties.
    defn() {
        return this.propertyByName(AgentDefn.name);
    }
}
