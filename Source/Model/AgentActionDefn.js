"use strict";
class AgentActionDefn {
    constructor(name, targetType, select, children) {
        this.name = name;
        this.targetType = targetType;
        this._select = select;
        this.children = children;
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
    static selectChildren(uwpe) {
        throw new Error("todo - selectChildren()");
    }
    static selectTargetable(uwpe) {
        var universe = uwpe.universe;
        var world = universe.world;
        var encounter = world.placeCurrent;
        var agent = encounter.agentActing;
        var actionDefnToSelect = encounter.actionDefnSelected;
        agent.actionCurrent.defn = actionDefnToSelect;
        var targetType = actionDefnToSelect.targetType;
        if (targetType == null) {
            throw new Error("todo - targetType is null");
        }
        else {
            // todo
        }
    }
}
class AgentActionDefn_Instances {
    constructor() {
        var targetTypes = AgentActionTargetType.Instances();
        this.Defend = new AgentActionDefn("Defend", targetTypes.Ally, AgentActionDefn.selectTargetable, null // children
        );
        this.Fight = new AgentActionDefn("Fight", targetTypes.Enemy, AgentActionDefn.selectTargetable, null // children
        );
        this.Item = new AgentActionDefn("Use Item", null, // targetType
        // select
        (uwpe) => {
            var placeEncounter = uwpe.place;
            var agentActionDefn = placeEncounter.actionDefnSelected;
            var partyPlayer = placeEncounter.partyPlayer;
            var items = partyPlayer.items;
            agentActionDefn.children = items.map(item => new AgentActionDefn(item.defnName, null, // targetType
            // select
            (uwpe2) => {
                alert("todo - item - " + item.defnName);
            }, null // children
            ));
            var agentActing = placeEncounter.agentActing;
            agentActing.actionDefnSelected = agentActionDefn;
        }, null // children
        );
        this.Magic = new AgentActionDefn("Cast Spell", null, // targetType
        // select
        (uwpe) => {
            var placeEncounter = uwpe.place;
            var agentActing = placeEncounter.agentActing;
            var agentActingDefn = agentActing.defn();
            var agentActionDefn = agentActing.actionDefnSelected;
            var spells = agentActingDefn.spellcasting.spellsKnown;
            agentActionDefn.children = spells.map(spell => new AgentActionDefn(spell.name, null, // targetType
            (uwpe2) => {
                throw new Error("todo - spells - " + spell.name);
            }, null // children
            ));
            agentActing.actionDefnSelected = agentActionDefn;
        }, null // children
        );
        this.Wait = new AgentActionDefn("Wait", targetTypes.None, 
        // select
        (uwpe) => {
            throw new Error("todo - Wait");
        }, null // children
        );
        this.Withdraw = new AgentActionDefn("Withdraw", targetTypes.None, 
        // select
        (uwpe) => {
            throw new Error("todo - Withdraw");
        }, null // children
        );
    }
}
