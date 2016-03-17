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
        if ( typeof globalData !== 'undefined' ){
            this.setupData( globalData );
        } else {
            xhr({
                uri: 'testdata.json',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            }, ( error, response, body ) => {
                this.setupData( body );
            });
        }
    }

    setupData( data ){
        for ( let i = 0; i < data.length; i = i + 1 ){
            if ( data[ i ].type.toLowerCase() === 'smg' ){
                data[ i ].type = 'Submachine Gun';
            }

            if ( data[ i ].type.toLowerCase() === 'lmg' ){
                data[ i ].type = 'Light Machine gun';
            }

            if ( data[ i ].type.toLowerCase() === 'mr' ){
                data[ i ].type = 'Marksman Rifle';
            }

            if ( data[ i ].type.toLowerCase() === 'ar' ){
                data[ i ].type = 'Assault Rifle';
            }
        }

        this.setState({
            weapons: data
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
