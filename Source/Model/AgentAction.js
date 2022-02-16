"use strict";
class AgentAction {
    constructor(name) {
        this.name = name;
    }
    static Instances() {
        if (AgentAction._instances == null) {
            AgentAction._instances = new AgentAction_Instances();
        }
        return AgentAction._instances;
    }
}
class AgentAction_Instances {
    constructor() {
        this.Fight = new AgentAction("Fight");
    }
}
