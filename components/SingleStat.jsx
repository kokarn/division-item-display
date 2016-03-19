import React from 'react';

class SingleStat extends React.Component {
    constructor( props ){
        super( props );
    }

    render(){
        let wrapperClass = 'single-stat-block';
        let value = '+' + this.props.value;

        if ( this.props.value === undefined || this.props.value <= 0 ){
            wrapperClass = wrapperClass + ' inactive';
            value = '+0';
        }

        return (
            <div
                className = { wrapperClass }
            >
                <div
                    className = { 'icon ' + this.props.type }
                />
                <div
                    className = "single-stat-value-wrapper"
                >
                    { value }
                </div>
            </div>
        );
    }
}

SingleStat.displayName = 'SingleStat';

SingleStat.propTypes = {
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] )
};

export default SingleStat;
