"use strict";
class Agent extends Entity {
    constructor(name, defn, pos) {
        super(name, [
            defn,
            Drawable.fromVisual(defn.visual),
            defn.killable.clone(),
            Locatable.fromPos(pos)
        ]);
    }
    actionsAvailable() {
        return this.defn().actionsAvailable;
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
