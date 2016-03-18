import React from 'react';
import SingleStat from './SingleStat';
import Talents from './Talents';
import Attributes from './Attributes';

class Gear extends React.Component {
    constructor( props ){
        super( props );
    }

    capitalizeFirstLetter( string ) {
        return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
    }

    render(){
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
                        className = "stat-wrapper"
                    >
                        { 'ARMOR' }
                        <div
                            className = "number-wrapper stat-number-wrapper"
                        >
                            { this.props.stats.armor }
                        </div>
                    </div>
                </div>
                <div
                    className = "section-wrapper stats-wrapper"
                >
                    <SingleStat
                        type = "firearms"
                        value = { this.props.stats.firearms }
                    />
                    <SingleStat
                        type = "stamina"
                        value = { this.props.stats.stamina }
                    />
                    <SingleStat
                        type = "electronics"
                        value = { this.props.stats.electronics }
                    />
                </div>
                <Talents
                    talents = { this.props.talents }
                />
            </div>
        );
    }
}

Gear.displayName = 'Gear';

Gear.propTypes = {
    attributes: React.PropTypes.shape({
        major: React.PropTypes.array,
        minor: React.PropTypes.array,
        skill: React.PropTypes.array
    }),
    level: React.PropTypes.number.isRequired,
    modslots: React.PropTypes.number,
    rarity: React.PropTypes.string.isRequired,
    stats: React.PropTypes.shape({
        armor: React.PropTypes.number.isRequired,
        firearms: React.PropTypes.number,
        stamina: React.PropTypes.number,
        electronics: React.PropTypes.number
    }),
    talents: React.PropTypes.array,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
}

export default Gear;
