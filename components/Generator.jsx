import React from 'react';

class Generator extends React.Component {
    constructor( props ){
        super( props );
    }

    render(){
        return (
            <div
                className = "generator-wrapper"
            >
                <form>
                    <select
                        name = "group"
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
                    <select
                        name = "type"
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
