"use strict";
class AgentActionTargetType {
    constructor(name, agentsTargetableGet) {
        this.name = name;
        this._agentsTargetableGet = agentsTargetableGet;
    }
    static Instances() {
        if (AgentActionTargetType._instances == null) {
            AgentActionTargetType._instances =
                new AgentActionTargetType_Instances();
        }
        return AgentActionTargetType._instances;
    }
    agentsTargetableGet(uwpe) {
        return this._agentsTargetableGet(uwpe);
    }
}
class AgentActionTargetType_Instances {
    constructor() {
        this.None = new AgentActionTargetType("None", (uwpe) => {
            return null;
        });
        this.AlliesAll = new AgentActionTargetType("AlliesAll", (uwpe) => {
            return null;
        });
        this.Ally = new AgentActionTargetType("Ally", (uwpe) => {
            return null;
        });
        this.EnemiesAll = new AgentActionTargetType("EnemiesAll", (uwpe) => {
            return null;
        });
        this.Enemy = new AgentActionTargetType("Enemy", (uwpe) => {
            return null;
        });
    }
}
