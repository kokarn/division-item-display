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
        let weapons = [];
        let gear = [];
        let mods = [];
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

            if ( data[ i ].group === 'weapons' ){
                weapons.push( data[ i ] );
            } else if ( data[ i ].group === 'gear' ){
                gear.push( data[ i ] );
            } else if ( data[ i ].group === 'mods' ){
                mods.push( data[ i ] );
            }
        }

        this.setState({
            weapons: weapons,
            gear: gear,
            mods: mods
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
