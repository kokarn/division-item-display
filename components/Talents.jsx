import React from 'react';
import Talent from './Talent';

class Talents extends React.Component {
    constructor( props ){
        super( props );
    }

    capitalizeFirstLetter( string ) {
        return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
    }

    render(){
        let renderNode = null;

        if ( this.props.talents ){
            let talents = this.props.talents.map(( talent ) => {
                let node;
                let identifier = talent.replace( '-', '' );

                if ( typeof talent === 'string' ){
                    node = (
                        <Talent
                            identifier = { identifier }
                            key = { talent }
                            title = { this.capitalizeFirstLetter( talent ) }
                        />
                    );
                } else {
                    node = (
                        <Talent
                            identifier = { identifier }
                            key = { talent }
                            requirements = { talent.requirements }
                            title = { this.capitalizeFirstLetter( talent ) }
                        />
                    );
                }

                return node;
            });

            renderNode = (
                <div
                    className = "section-wrapper talents-wrapper"
                >
                    { talents }
                </div>
            )
        }

        return renderNode;
    }
}

Talents.displayName = 'Talents';

Talents.propTypes = {
    talents: React.PropTypes.array
};

export default Talents;
