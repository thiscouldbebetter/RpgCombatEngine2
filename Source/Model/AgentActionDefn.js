"use strict";
class AgentActionDefn {
    constructor(name, targetType, select, childrenGet) {
        this.name = name;
        this.targetType = targetType;
        this._select = select;
        this._childrenGet = childrenGet;
    }
    children(uwpe) {
        var returnChildren;
        if (this._childrenGet != null) {
            returnChildren = this._childrenGet(uwpe);
        }
        return returnChildren;
    }
    select(uwpe) {
        if (this._select != null) {
            this._select(uwpe);
        }
    }
    static Instances() {
        if (AgentActionDefn._instances == null) {
            AgentActionDefn._instances = new AgentActionDefn_Instances();
        }
        return AgentActionDefn._instances;
    }
}
class AgentActionDefn_Instances {
    constructor() {
        var targetTypes = AgentActionTargetType.Instances();
        this.Defend = new AgentActionDefn("Defend", targetTypes.Ally, 
        // select
        (uwpe) => {
            throw new Error("todo");
        }, null // childrenGet
        );
        this.Fight = new AgentActionDefn("Fight", targetTypes.Enemy, 
        // select
        (uwpe) => {
            throw new Error("todo");
        }, null // childrenGet
        );
        this.Item = new AgentActionDefn("Item", null, // targetType
        // select
        (uwpe) => {
            throw new Error("todo");
        }, (uwpe) => {
            throw new Error("todo");
        });
        this.Magic = new AgentActionDefn("Magic", null, // targetType
        // select
        (uwpe) => {
            throw new Error("todo");
        }, (uwpe) => {
            throw new Error("todo");
        });
        this.Wait = new AgentActionDefn("Wait", targetTypes.None, 
        // select
        (uwpe) => {
            throw new Error("todo");
        }, null // childrenGet
        );
        this.Withdraw = new AgentActionDefn("Withdraw", targetTypes.None, 
        // select
        (uwpe) => {
            throw new Error("todo");
        }, null // childrenGet
        );
    }
}