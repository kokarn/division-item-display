import React from 'react';

class Talent extends React.Component {
    constructor( props ){
        super( props );
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
                    { this.props.text }
                </div>
                { requirements }
            </div>
        );
    }
}

Talent.displayName = 'Talent';
Talent.propTypes = {
    requirements: React.PropTypes.shape({
        electronics: React.PropTypes.number,
        firearms: React.PropTypes.number,
        stamina: React.PropTypes.number
    }),
    text: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
};

export default Talent;
