"use strict";
class Agent extends Entity {
    constructor(name, defn, pos) {
        super((name || defn.name), [
            Actor.default(),
            defn,
            Drawable.fromVisual(defn.visual),
            defn.killable.clone(),
            Locatable.fromPos(pos)
        ]);
        this.actionCurrent = AgentAction.default();
    }
    actionDefnsAvailable(uwpe) {
        if (this.actionDefnSelected == null) {
            var defn = this.defn();
            this.actionDefnSelected = defn.actionDefnRoot;
        }
        var returnActionDefns = this.actionDefnSelected.children;
        return returnActionDefns;
    }
    toStringStatus() {
        var killable = this.killable();
        var defn = this.defn();
        var name = (defn.hasPersonalName ? this.name : defn.name);
        var returnValue = name + ": " + killable.integrityCurrentOverMax();
        return returnValue;
    }
    toStringAction() {
        var returnValue = "";
        var action = this.actionCurrent;
        var actionDefn = action.defn;
        if (actionDefn == null) {
            returnValue = this.name + " ready.  Choose an action.";
        }
        else {
            var actionTarget = action.target;
            var actionDefnName = actionDefn.name;
            if (actionTarget == null) {
                returnValue =
                    this.name
                        + " preparing to "
                        + actionDefnName
                        + ".  Choose a target.";
            }
            else {
                returnValue =
                    this.name
                        + " attempting to "
                        + actionDefnName + " "
                        + actionTarget.name + ".";
            }
        }
        return returnValue;
    }
    // Properties.
    defn() {
        return this.propertyByName(AgentDefn.name);
    }
}
