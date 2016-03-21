import React from 'react';
import Weapon from './Weapon';
import Gear from './Gear';
import Mod from './Mod';
import Generator from './Generator';

import queryString from 'query-string';
import xhr from 'xhr';

class MainWrapper extends React.Component {
    constructor( props ){
        super( props );

        this.state = {
            tooltip: false
        };

        this.getItemUrl.bind( this );
    }

    componentWillMount(){
        let queryData = queryString.parse( location.search );
        if ( typeof queryData.generate !== 'undefined' ){
            this.setState({
                generator: true
            });
        } else {
            this.loadDisplayData();
        }
    }

    getItemUrl( item ){
        let url = location.protocol + '//' + location.hostname + location.pathname;

        // Add group
        url = url + '?group=' + item.group;

        // Add title
        url = url + '&title=' + item.title;

        // Add level
        url = url + '&level=' + item.level;

        // Add rarity
        url = url + '&rarity=' + item.rarity;

        if ( item.type ){
            url = url + '&type=' + item.type;
        }

        if ( item.typeExtra ){
            url = url + '&typeextratext=' + item.typeExtra.text;
            url = url + '&typeextrastat=' + encodeURIComponent( item.typeExtra.stat );
        }

        if ( item.stats ){
            if ( item.stats.firearms && Number( item.stats.firearms ) > 0 ){
                url = url + '&firearms=' + Number( item.stats.firearms );
            }

            if ( item.stats.stamina && Number( item.stats.stamina ) > 0 ){
                url = url + '&stamina=' + Number( item.stats.stamina );
            }

            if ( item.stats.electronics && Number( item.stats.electronics ) > 0 ){
                url = url + '&firearms=' + Number( item.stats.electronics );
            }

            if ( item.stats.dmg ){
                url = url + '&dmg=' + item.stats.dmg;
            }

            if ( item.stats.rpm ){
                url = url + '&rpm=' + Number( item.stats.rpm );
            }

            if ( item.stats.mag ){
                url = url + '&mag=' + Number( item.stats.mag );
            }

            if ( item.stats.arm ){
                url = url + '&arm=' + Number( item.stats.arm );
            } else if ( item.stats.armor ){
                url = url + '&arm=' + Number( item.stats.armor );
            }
        }

        if ( item.attributes ){
            if ( item.attributes.major ){
                for ( let i = 0; i < item.attributes.major.length; i = i + 1 ){
                    url = url + '&major=' + encodeURIComponent( item.attributes.major[ i ].value ) + ' ' + item.attributes.major[ i ].title;
                }
            }

            if ( item.attributes.minor ){
                for ( let i = 0; i < item.attributes.minor.length; i = i + 1 ){
                    url = url + '&minor=' + encodeURIComponent( item.attributes.minor[ i ].value ) + ' ' + item.attributes.minor[ i ].title;
                }
            }

            if ( item.attributes.skill ){
                for ( let i = 0; i < item.attributes.skill.length; i = i + 1 ){
                    url = url + '&skill=' + encodeURIComponent( item.attributes.skill[ i ].value ) + ' ' + item.attributes.skill[ i ].title;
                }
            }
        }

        if ( item.talents ){
            for ( let i = 0; i < item.talents.length; i = i + 1 ){
                url = url + '&talents=' + item.talents[ i ];
            }
        }

        if ( item.modslots && item.modslots > 0 ){
            url = url + '&modslots=' + item.modslots;
        }

        return url;
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

    handleGeneratorChange(){
        console.log( 'got generator change' );
    }

    loadDisplayData(){
        let queryData = queryString.parse( location.search );

        if ( queryData.tooltip ){
            this.setState({
                tooltip: true
            })
        }

        if ( queryData.url ){
            xhr({
                uri: atob( queryData.url ),
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            }, ( error, response, body ) => {
                this.setupData( body );
            });
        } else if ( queryData.group ){

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

        let generator = null;

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
                        url = { this.getItemUrl( weapon ) }
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
                        url = { this.getItemUrl( gear ) }
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
                        url = { this.getItemUrl( mod ) }
                    />
                );
            });
        }

        if ( this.state.generator ){
            generator = (
                <Generator
                    onChange = { this.handleGeneratorChange }
                />
            );
        }

        return (
            <div
                className = { this.state.tooltip ? 'outer-wrapper tooltip' : 'outer-wrapper' }
            >
                { generator }
                { modNodes }
                { gearNodes }
                { weaponNodes }
            </div>
        );
    }
}

MainWrapper.displayName = 'MainWrapper';

export default MainWrapper;
