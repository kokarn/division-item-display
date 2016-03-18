import React from 'react';
import Weapon from './Weapon';
import Gear from './Gear';
import Mod from './Mod';

import queryString from 'query-string';
import xhr from 'xhr';

class MainWrapper extends React.Component {
    constructor( props ){
        super( props );

        this.state = {};
    }

    componentDidMount(){
        this.loadDisplayData();
    }

    isNumeric( number ){
        return !isNaN( number );
    }

    attributesToList( attributesRawData ){
        let attributesList = [];
        let attributesData = attributesRawData;

        if ( typeof attributesRawData === 'string' ){
            attributesData = [ attributesRawData ];
        }

        for ( let i = 0; i < attributesData.length; i = i + 1 ){
            let stringParts = attributesData[ i ].split( ' ' );
            attributesList.push({
                value: stringParts.shift(),
                title: stringParts.join( ' ' )
            });
        }

        return attributesList;
    }

    loadDisplayData(){
        let queryData = queryString.parse( location.search );
        if ( queryData.group ){

            // Move all numbers to actual numbers
            for ( let index in queryData ){
                if ( this.isNumeric( queryData[ index ] )){
                    queryData[ index ] = Number( queryData[ index ] );
                }
            }

            queryData.stats = {
                armor: queryData.arm,
                dmg: queryData.dmg,
                rpm: queryData.rpm,
                mag: queryData.mag,
                firearms: queryData.firearms,
                electronics: queryData.electronics,
                stamina: queryData.stamina
            };

            if ( typeof queryData.talents === 'string' ){
                queryData.talents = [ queryData.talents ];
            }

            if ( queryData.typeextratext || queryData.typeextrastat ){
                queryData.typeExtra = {};

                if ( queryData.typeextratext ){
                    queryData.typeExtra.text = queryData.typeextratext;
                }

                if ( queryData.typeextrastat ){
                    queryData.typeExtra.stat = queryData.typeextrastat;
                }
            }

            if ( queryData.major || queryData.minor || queryData.skill ){
                queryData.attributes = {};
            }

            if ( queryData.major ){
                queryData.attributes.major = this.attributesToList( queryData.major );
            }

            if ( queryData.minor ){
                queryData.attributes.minor = this.attributesToList( queryData.minor );
            }

            if ( queryData.skill ){
                queryData.attributes.skill = this.attributesToList( queryData.skill );
            }

            this.setupData( queryData );
        } else if ( typeof globalData !== 'undefined' ){
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

    normalizeItem( item ){
        if ( item.group === 'weapon' ){
            if ( item.type.toLowerCase() === 'smg' ){
                item.type = 'Submachine Gun';
            }

            if ( item.type.toLowerCase() === 'lmg' ){
                item.type = 'Light Machine gun';
            }

            if ( item.type.toLowerCase() === 'mr' ){
                item.type = 'Marksman Rifle';
            }

            if ( item.type.toLowerCase() === 'ar' ){
                item.type = 'Assault Rifle';
            }
        } else if ( item.group === 'mod' ){
            item.title = item.title.replace( ' Mag ', ' Magazine ' );
        }

        return item;
    }

    setupData( rawData ){
        let weapons = [];
        let gear = [];
        let mods = [];

        let data = [];

        // Make sure it's an array
        if ( !Array.isArray( rawData )){
            data.push( rawData );
        } else {
            data = rawData;
        }

        for ( let i = 0; i < data.length; i = i + 1 ){
            data[ i ] = this.normalizeItem( data[ i ] );
            switch ( data[ i ].group ){
                case 'weapon':
                    weapons.push( data[ i ] );
                    break;
                case 'gear':
                    gear.push( data[ i ] );
                    break;
                case 'mod':
                    mods.push( data[ i ] );
                    break;
                default:
                    console.log( 'Failed to find group for ', data[ i ] );
                    break;
            }
        }

        this.setState({
            weapons: weapons,
            gear: gear,
            mods: mods
        });
    }

    render(){
        let modNodes = null;
        let weaponNodes = null;
        let gearNodes = null;

        if ( this.state.weapons ){
            weaponNodes = this.state.weapons.map(( weapon, index ) => {
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

        if ( this.state.gear ){
            gearNodes = this.state.gear.map(( gear, index ) => {
                return (
                    <Gear
                        attributes = { gear.attributes }
                        key = { index }
                        level = { gear.level }
                        modslots = { gear.modslots }
                        rarity = { gear.rarity }
                        stats = { gear.stats }
                        talents = { gear.talents }
                        title = { gear.title }
                        type = { gear.type }
                    />
                );
            });
        }

        if ( this.state.mods ){
            modNodes = this.state.mods.map(( mod, index ) => {
                return (
                    <Mod
                        attributes = { mod.attributes }
                        key = { index }
                        level = { mod.level }
                        rarity = { mod.rarity }
                        stats = { mod.stats }
                        talents = { mod.talents }
                        title = { mod.title }
                        type = { mod.type }
                    />
                );
            });
        }

        return (
            <div
                className = "outer-wrapper"
            >
                { modNodes }
                { gearNodes }
                { weaponNodes }
            </div>
        );
    }
}

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
