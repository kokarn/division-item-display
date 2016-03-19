import React from 'react';
import SingleStat from './SingleStat';

class StatsSection extends React.Component {
    constructor( props ){
        super( props );
    }

    render(){
        let renderNode = null;

        if ( this.props.electronics || this.props.firearms || this.props.stamina ){
            let firearmsNode = (
                <SingleStat
                    type = "firearms"
                    value = { this.props.firearms || 0 }
                />
            );

            let staminaNode = (
                <SingleStat
                    type = "stamina"
                    value = { this.props.stamina || 0 }
                />
            );

            let electronicsNode = (
                <SingleStat
                    type = "electronics"
                    value = { this.props.electronics || 0 }
                />
            );

            renderNode = (
                <div
                    className = "section-wrapper stats-wrapper"
                >
                    { firearmsNode }
                    { staminaNode }
                    { electronicsNode }
                </div>
            )
        }

        return renderNode ;
    }
}

StatsSection.displayName = 'StatsSection';

StatsSection.propTypes = {
    electronics: React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] ),
    firearms: React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] ),
    stamina: React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] )
};

export default StatsSection;
