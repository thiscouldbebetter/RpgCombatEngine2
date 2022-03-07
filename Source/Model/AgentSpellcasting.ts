
class AgentSpellcasting
{
	energyMax: number;
	spellsKnown: Spell[];

	energy: number;

	constructor(energyMax: number, spellsKnown: Spell[])
	{
		this.energyMax = energyMax;
		this.spellsKnown = spellsKnown;
	}
}

class Spell
{
	name: string;

	constructor(name: string)
	{
		this.name = name;
	}
}