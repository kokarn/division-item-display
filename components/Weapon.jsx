import React from 'react';
import Talents from './Talents';

class Weapon extends React.Component {
    constructor( props ){
        super( props );
    }

    capitalizeFirstLetter( string ) {
        return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
    }

    render(){
        let typeExtra = null;

        if ( this.props.typeExtra ){
            typeExtra = (
                <div
                    className = "type-extra-stat-wrapper"
                >
                    <div
                        className = "type-extra-stat-number-wrapper"
                    >
                        { this.props.typeExtra.stat }
                    </div>
                    <div
                        className = "type-extra-stat-text-wrapper"
                    >
                        { this.props.typeExtra.text }
                    </div>
                </div>
            );
        }

        return (
            <div
                className = { 'item-wrapper ' + this.props.rarity.toLowerCase() }
            >
                <div
                    className = "section-wrapper title-section"
                >
                    <div
                        className = "rarity-indicator"
                    />
                    <div
                        className = "title-wrapper"
                    >
                        { this.props.title }
                    </div>
                    <div
                        className = "rarity-wrapper"
                    >
                        { this.capitalizeFirstLetter( this.props.rarity ) }
                    </div>
                    <div
                        className = "level-wrapper"
                    >
                        { 'level' }
                        <div
                            className = "number-wrapper level-number-wrapper"
                        >
                            { this.props.level }
                        </div>
                    </div>
                </div>
                <div
                    className = "section-wrapper"
                >
                    <div
                        className = { 'type-icon-wrapper ' + this.props.type.toLowerCase() }
                    />
                    <div
                        className = "type-name-wrapper"
                    >
                        { this.props.type }
                    </div>
                    { typeExtra }
                </div>
                <div
                    className = "section-wrapper"
                >
                    <div
                        className = "stat-wrapper"
                    >
                        { 'DMG' }
                        <div
                            className = "number-wrapper stat-number-wrapper"
                        >
                            { this.props.stats.dmg }
                        </div>
                    </div>
                    <div
                        className = "stat-wrapper"
                    >
                        { 'RPM' }
                        <div
                            className = "number-wrapper stat-number-wrapper"
                        >
                            { this.props.stats.rpm }
                        </div>
                    </div>
                    <div
                        className = "stat-wrapper"
                    >
                        { 'MAG' }
                        <div
                            className = "number-wrapper stat-number-wrapper"
                        >
                            { this.props.stats.mag }
                        </div>
                    </div>
                </div>
                <Talents
                    talents = { this.props.talents }
                />
            </div>
        );
    }
}

Weapon.displayName = 'Weapon';

Weapon.propTypes = {
    level: React.PropTypes.number.isRequired,
    rarity: React.PropTypes.string.isRequired,
    stats: React.PropTypes.shape({
        dmg: React.PropTypes.oneOfType( [
            React.PropTypes.string.isRequired,
            React.PropTypes.number.isRequired
        ] ),
        rpm: React.PropTypes.number.isRequired,
        mag: React.PropTypes.number.isRequired
    }),
    talents: React.PropTypes.array,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    typeExtra: React.PropTypes.shape({
        stat: React.PropTypes.string,
        text: React.PropTypes.string
    })
}

export default Weapon;
