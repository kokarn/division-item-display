import React from 'react';
import Attribute from './Attribute';

class Attributes extends React.Component {
    constructor( props ){
        super( props );
    }

    render(){
        let renderNode = null;
        let majorAttributes = null;
        let minorAttributes = null;
        let skillAttributes = null;
        let modSlot = null;

        if ( this.props.attributes ){
            if ( this.props.attributes.major ){
                majorAttributes = [ (
                    <div
                        className = "attributes-title-wrapper"
                        key = "title"
                    >
                        { 'Major Attributes' }
                    </div>
                ) ];

                majorAttributes = majorAttributes.concat( this.props.attributes.major.map(( attribute, index ) => {
                    return (
                        <Attribute
                            key = { index }
                            title = { attribute.title }
                            value = { attribute.value }
                        />
                    );
                }));
            }

            if ( this.props.attributes.minor ){
                minorAttributes = [ (
                    <div
                        className = "attributes-title-wrapper"
                        key = "title"
                    >
                        { 'Minor Attributes' }
                    </div>
                ) ];

                minorAttributes = minorAttributes.concat( this.props.attributes.minor.map(( attribute, index ) => {
                    return (
                        <Attribute
                            key = { index }
                            title = { attribute.title }
                            value = { attribute.value }
                        />
                    );
                }));
            }

            if ( this.props.attributes.skill ){
                skillAttributes = [ (
                    <div
                        className = "attributes-title-wrapper"
                        key = "title"
                    >
                        { 'Skill Attributes' }
                    </div>
                ) ];

                skillAttributes = skillAttributes.concat( this.props.attributes.skill.map(( attribute, index ) => {
                    return (
                        <Attribute
                            key = { index }
                            title = { attribute.title }
                            value = { attribute.value }
                        />
                    );
                }));
            }

            if ( this.props.modslots > 0 ){
                let title = 'Mod Slot';

                if ( this.props.modslots > 1 ){
                    title = title + 's';
                }

                modSlot = (
                    <Attribute
                        title = { title }
                        value = { '+ ' + this.props.modslots }
                    />
                )
            }

            renderNode = (
                <div
                    className = "section-wrapper attributes-wrapper"
                >
                    { majorAttributes }
                    { minorAttributes }
                    { skillAttributes }
                    { modSlot }
                </div>
            )
        }

        return renderNode;
    }
}

Attributes.displayName = 'Attributes';

Attributes.propTypes = {
    attributes: React.PropTypes.object,
    modslots: React.PropTypes.number
};

export default Attributes;
