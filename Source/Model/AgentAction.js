"use strict";
class AgentAction {
    constructor(defn, target) {
        this.defn = defn;
        this.target = target;
    }
    static default() {
        return new AgentAction(null, null);
    }
    clear() {
        this.defn = null;
        this.target = null;
        return this;
    }
    run() {
        // todo
    }
}
