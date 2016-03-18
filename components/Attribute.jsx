import React from 'react';

class Attribute extends React.Component {
    constructor( props ){
        super( props );
    }

    render(){
        return (
            <div>
                <div
                    className = "attribute-value-wrapper"
                >
                    { this.props.value }
                </div>
                <div
                    className = "attribute-title-wrapper"
                >
                    { this.props.title }
                </div>
            </div>
        );
    }
}

Attribute.displayName = 'Attribute';

Attribute.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType( [
        React.PropTypes.string.isRequired,
        React.PropTypes.number.isRequired
    ] )
};

export default Attribute;
