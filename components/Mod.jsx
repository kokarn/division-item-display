import React from 'react';
import Talents from './Talents';
import Attributes from './Attributes';
import StatsSection from './StatsSection';

class Mod extends React.Component {
    constructor( props ){
        super( props );
    }

    capitalizeFirstLetter( string ) {
        return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
    }

    render(){
        let statsSection = null;

        if ( this.props.stats ){
            statsSection = (
                <StatsSection
                    electronics = { this.props.stats.electronics }
                    firearms = { this.props.stats.firearms }
                    stamina = { this.props.stats.stamina }
                />
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
                <Talents
                    talents = { this.props.talents }
                />
                { statsSection }
                <Attributes
                    attributes = { this.props.attributes }
                />
            </div>
        );
    }
}

Mod.displayName = 'Mod';

Mod.propTypes = {
    attributes: React.PropTypes.shape({
        major: React.PropTypes.array,
        minor: React.PropTypes.array,
        skill: React.PropTypes.array
    }),
    level: React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] ),
    rarity: React.PropTypes.string.isRequired,
    stats: React.PropTypes.shape({
        firearms: React.PropTypes.oneOfType( [
            React.PropTypes.string,
            React.PropTypes.number
        ] ),
        stamina: React.PropTypes.oneOfType( [
            React.PropTypes.string,
            React.PropTypes.number
        ] ),
        electronics: React.PropTypes.oneOfType( [
            React.PropTypes.string,
            React.PropTypes.number
        ] )
    }),
    talents: React.PropTypes.array,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string
}

export default Mod;
