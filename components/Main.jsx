import React from 'react';
import Weapon from './Weapon';

import xhr from 'xhr';

class MainWrapper extends React.Component {
    constructor( props ){
        super( props );

        this.state = {};
    }

    componentDidMount(){
        this.loadWeapons();
    }

    loadWeapons(){
        xhr({
            uri: 'http://localhost:8888/oskar-division-items/load.php',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        }, ( error, response, body ) => {
            for ( let i = 0; i < body.length; i = i + 1 ){
                if ( body[ i ].type.toLowerCase() === 'smg' ){
                    body[ i ].type = 'Submachine Gun';
                }

                if ( body[ i ].type.toLowerCase() === 'lmg' ){
                    body[ i ].type = 'Light Machine gun';
                }

                if ( body[ i ].type.toLowerCase() === 'mr' ){
                    body[ i ].type = 'Marksman Rifle';
                }

                if ( body[ i ].type.toLowerCase() === 'ar' ){
                    body[ i ].type = 'Assault Rifle';
                }
            }

            this.setState({
                weapons: body
            });
        });
    }

    render(){
        let weapons = null;
        if ( this.state.weapons ){
            weapons = this.state.weapons.map(( weapon, index ) => {
                return (
                    <Weapon
                        key = { index }
                        level = { weapon.level }
                        rarity = { weapon.rarity }
                        requirements = { weapon.requirements }
                        stats = { weapon.stats }
                        talents = { weapon.talents }
                        title = { weapon.title }
                        type = { weapon.type }
                        typeExtra = { weapon.typeExtra }
                    />
                );
            });
        }

        return (
            <div>
                { weapons }
            </div>
        );
    }
}

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
