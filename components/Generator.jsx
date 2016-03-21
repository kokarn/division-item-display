import React from 'react';
import deepcopy from 'deepcopy';

class Generator extends React.Component {
    constructor( props ){
        super( props );

        this.handleFormChange = this.handleFormChange.bind( this );

        this.baseExtraStats = {
            'ar': {
                text: 'Headshot Damage',
                stat: '+110% - +180%'
            },
            'smg': {
                text: 'Critical Hit Damage',
                stat: '+18% - +22%'
            }
        };

        this.state = {
            rarity: 'high-end',
            group: 'weapon',
            type: 'ar',
            stats: {},
            attributes: {},
            typeExtra: {
                text: '',
                stat: ''
            }
        };
    }

    handleFormChange( event ){
        let stateCopy = deepcopy( this.state );

        if ( event.target.name === 'armor' || event.target.name === 'dmg' || event.target.name === 'rpm' || event.target.name === 'mag' || event.target.name === 'firearms' || event.target.name === 'stamina' || event.target.name === 'electronics' ){
            stateCopy.stats[ event.target.name ] = event.target.value;
        } else if ( event.target.name === 'type-extra-title' ){
            if ( typeof stateCopy.typeExtra === 'undefined' ){
                stateCopy.typeExtra = {};
            }

            stateCopy.typeExtra.text = event.target.value;
        } else if ( event.target.name === 'type-extra-value' ){
            if ( typeof stateCopy.typeExtra === 'undefined' ){
                stateCopy.typeExtra = {};
            }

            stateCopy.typeExtra.stat = event.target.value;
        } else {
            stateCopy[ event.target.name ] = event.target.value;
        }

        this.setState( stateCopy );

        this.props.onChange( stateCopy );
    }

    render(){
        return (
            <div
                className = "generator-wrapper"
            >
                <form>
                    <input
                        name = "title"
                        onChange = { this.handleFormChange }
                        placeholder = "Item title"
                        type = "text"
                        value = { this.state.title }
                    />
                    <input
                        name = "level"
                        onChange = { this.handleFormChange }
                        placeholder = "Level requirement"
                        type = "text"
                        value = { this.state.level }
                    />
                    <select
                        name = "rarity"
                        onChange = { this.handleFormChange }
                        value = { this.state.rarity }
                    >
                        <option
                            value = "high-end"
                        >
                            { 'High-end' }
                        </option>
                        <option
                            value = "specialized"
                        >
                            { 'Specialized' }
                        </option>
                        <option
                            value = "superior"
                        >
                            { 'Superior' }
                        </option>
                        <option
                            value = "standard"
                        >
                            { 'Standard' }
                        </option>
                        <option
                            value = "worn"
                        >
                            { 'Worn' }
                        </option>
                    </select>
                    <select
                        name = "group"
                        onChange = { this.handleFormChange }
                        value = { this.state.group }
                    >
                        <option
                            value = "weapon"
                        >
                            { 'Weapon' }
                        </option>
                        <option
                            value = "gear"
                        >
                            { 'Gear' }
                        </option>
                        <option
                            value = "mod"
                        >
                            { 'Mod' }
                        </option>
                    </select>
                    {
                        (() => {
                            switch ( this.state.group ){
                                case 'weapon':
                                    return (
                                        <div>
                                            <select
                                                name = "type"
                                                onChange = { this.handleFormChange }
                                                value = { this.state.type }
                                            >
                                                <option
                                                    value = "ar"
                                                >
                                                    { 'Assault Rifle' }
                                                </option>
                                                <option
                                                    value = "smg"
                                                >
                                                    { 'Submachine Gun' }
                                                </option>
                                                <option
                                                    value = "mr"
                                                >
                                                    { 'Marksman Rifle' }
                                                </option>
                                                <option
                                                    value = "pistol"
                                                >
                                                    { 'Pistol' }
                                                </option>
                                                <option
                                                    value = "shotgun"
                                                >
                                                    { 'Shotgun' }
                                                </option>
                                                <option
                                                    value = "lmg"
                                                >
                                                    { 'Light Machine gun' }
                                                </option>
                                            </select>
                                            <input
                                                name = "type-extra-value"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Type extra value"
                                                type = "text"
                                                value = { this.state.typeExtra.stat }
                                            />
                                            <input
                                                name = "type-extra-title"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Type extra title"
                                                type = "text"
                                                value = { this.state.typeExtra.text }
                                            />
                                            <input
                                                name = "dmg"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Damage"
                                                type = "text"
                                                value = { this.state.stats.dmg }
                                            />
                                            <input
                                                name = "rpm"
                                                onChange = { this.handleFormChange }
                                                placeholder = "RPM (Rounds per minute)"
                                                type = "text"
                                                value = { this.state.stats.rpm }
                                            />
                                            <input
                                                name = "mag"
                                                onChange = { this.handleFormChange }
                                                placeholder = "MAG (Magazine size)"
                                                type = "text"
                                                value = { this.state.stats.mag }
                                            />
                                        </div>
                                    );
                                case 'gear':
                                    return (
                                        <div>
                                            <input
                                                name = "armor"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Armor"
                                                type = "text"
                                                value = { this.state.stats.armor }
                                            />
                                            <input
                                                name = "firearms"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Firearms"
                                                type = "text"
                                                value = { this.state.stats.firearms }
                                            />
                                            <input
                                                name = "stamina"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Stamina"
                                                type = "text"
                                                value = { this.state.stats.stamina }
                                            />
                                            <input
                                                name = "electronics"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Electronics"
                                                type = "text"
                                                value = { this.state.stats.electronics }
                                            />
                                        </div>
                                    );
                                case 'mod':
                                    return (
                                        <div>
                                            <input
                                                name = "firearms"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Firearms"
                                                type = "text"
                                                value = { this.state.stats.firearms }
                                            />
                                            <input
                                                name = "stamina"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Stamina"
                                                type = "text"
                                                value = { this.state.stats.stamina }
                                            />
                                            <input
                                                name = "electronics"
                                                onChange = { this.handleFormChange }
                                                placeholder = "Electronics"
                                                type = "text"
                                                value = { this.state.stats.electronics }
                                            />
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })()
                    }
                    <select
                        defaultValue = "Select one"
                        name = "talents"
                        onChange = { this.handleFormChange }
                    >
                    </select>
                </form>
            </div>
        );
    }
}

Generator.displayName = 'Generator';

Generator.propTypes = {
    onChange: React.PropTypes.func.isRequired
};

export default Generator;
