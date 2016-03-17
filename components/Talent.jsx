import React from 'react';

class Talent extends React.Component {
    constructor( props ){
        super( props );

        this.list = {
            accurate: 'Accuracy is increased by X%',
            adept: 'Skill increases your critical hits chance by 3% for y seconds.',
            balanced: 'Weapon acquires maximum accuracy faster when shouldered.',
            brutal: 'Headshot damage is increased by X% when using this weapon.',
            capable: 'Using a skill improves the handling of your weapon for x seconds.',
            commanding: 'Every kill performed while the signature skill is active extends its duration by X%.',
            competent: 'Weapon damage is increased by X% for y seconds after using a skill.',
            coolheaded: 'Performing a headshot reduces all skill cooldowns by X%.',
            deadly: 'Critical hit damage is increased by X%.',
            destructive: 'Armor destruction value is increased by X% when using this weapon.',
            determined: 'Killing a target reduces skill cooldowns by X%.',
            dominant: 'Every kill while your signature skill is active reduces the cooldown of your other skills by X%.',
            expert: 'This weapon deals X% more damage when the target is below Y% health.',
            ferocious: 'Damage against elite and named enemies is increased by X%.',
            fierce: 'Critical hit chance is increased by X% when using this weapon.',
            fordern: 'Kills by active skills prolong their duration by X%.',
            harmful: 'Each hit has a X% chance to apply the "bleed" status effect.',
            intense: 'The first bullet of a magazine has a X% chance to apply the "on fire" status effect.',
            meticulous: 'Killing a traget has a X% chance to instantly refill the magazine.',
            prepared: 'Damage is increased by X% when more than 40 meters from the target.',
            provident: 'The last bullet in your magazine deals X% bonus damage.',
            proficient: 'The first bullet shot when out of combat has a X% chance to result in a critical hit.',
            predatory: 'Killing a target regenerates X% health over y seconds.',
            restored: 'Killing a target with this weapon removes all negative status effects.',
            responsive: 'Damage is increased by 5% when closer than 10 meters to the target.',
            stable: 'Stability is improved by X%.',
            sustained: 'Killing a target increases your health by X%.',
            skilled: 'Headshot kills with this weapon increase signature skill resources by X%.',
            swift: 'Reloading is X% faster.',
            selfpreserved: 'Critical hits with this weapon heal the user for X% of damage dealt.',
            talented: 'Killing a target with this weapon increases skill power by X% for y seconds.',
            toxic: 'Headshots with this weapon have a X% chance to apply the "blind" status effect.',
            trained: 'Critical hits increase signature skill resources by X%. temporarily disabled',
            unforgiving: 'Missing health segments increases your damage by X%.',
            vicious: 'Critical hit chance is increased by X% while at full health.'
        }
    }

    render(){
        let firearms = null;
        let stamina = null;
        let electronics = null;
        let requirements = null;

        if ( this.props.requirements && this.props.requirements.firearms ){
            firearms = (
                <div
                    className = "requirement-stat-wrapper"
                >
                    <div
                        className = "icon firearms"
                    />
                    <div
                        className = "stat-requirement-number-wrapper"
                    >
                        { this.props.requirements.firearms }
                    </div>
                </div>
            );
        }

        if ( this.props.requirements && this.props.requirements.stamina ){
            stamina = (
                <div
                    className = "requirement-stat-wrapper"
                >
                    <div
                        className = "icon stamina"
                    />
                    <div
                        className = "stat-requirement-number-wrapper"
                    >
                        { this.props.requirements.stamina }
                    </div>
                </div>
            );
        }

        if ( this.props.requirements && this.props.requirements.electronics ){
            electronics = (
                <div
                    className = "requirement-stat-wrapper"
                >
                    <div
                        className = "icon electronics"
                    />
                    <div
                        className = "stat-requirement-number-wrapper"
                    >
                        { this.props.requirements.electronics }
                    </div>
                </div>
            );
        }

        if ( firearms || stamina || electronics ){
            requirements = (
                <div
                    className = "requirements-wrapper"
                >
                    <div
                        className = "requirements-title-wrapper"
                    >
                        { 'Requirement' }
                    </div>
                    { firearms }
                    { stamina }
                    { electronics }
                </div>
            );
        }

        return (
            <div
                className = "talent-wrapper"
            >
                <div
                    className = "talent-title-wrapper"
                >
                    { 'Talent' }
                </div>
                <div
                    className = "talent-title-separator"
                >
                    { '|' }
                </div>
                <div
                    className = "talent-title-name"
                >
                    { this.props.title }
                </div>
                <div
                    className = "talent-description-text"
                >
                    { this.list[ this.props.identifier ] }
                </div>
                { requirements }
            </div>
        );
    }
}

Talent.displayName = 'Talent';
Talent.propTypes = {
    identifier: React.PropTypes.string,
    requirements: React.PropTypes.shape({
        electronics: React.PropTypes.number,
        firearms: React.PropTypes.number,
        stamina: React.PropTypes.number
    }),
    title: React.PropTypes.string
};

export default Talent;
