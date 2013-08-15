(function(){
'use strict';

var T_ARR = 1 << 0,
    T_OBJ = 1 << 1,
    T_LEAF = 1 << 2;

function j2h()
{
    var obj = {},
        delegator,
        _traverse = function( lv, obj, key )
        {
            if( typeof obj === 'object' )
            {
                if( obj instanceof Array ){
                    delegator.openTree( T_ARR, key );
                    obj.forEach( travarse );
                    delegator.closeTree( T_ARR, key );
                }
                else
                {
                    delegator.openTree( T_OBJ, key );
                    Object.keys( obj ).forEach(function(key){
                        travarse( obj[key], key );
                    });
                    delegator.closeTree( T_OBJ, key );
                }
            }
            else {
                delegator.createLeaf( obj, key );
            }
        };
    
    this.__defineSetter__('delegator', function( newDelegator ){
        delegator = newDelegator;
    });
    
    this.traverse = function()
    {
        // travarse
        delegator.begin();
        _traverse( 0, obj );
        delegator.end();
    };
    
    this.loadJSON = function( text )
    {
        var err;
        
        if( !text ){
            err = new TypeError('argument must be type of string');
        }
        else
        {
            try {
                obj = JSON.parse( text );
            } catch(e){
                err = e;
            }
        }
        
        return err;
    };
    
    this.toJSON = function( space, replacer ){
        return JSON.stringify( obj, replacer, space );
    };
}

// export constants
j2h.T_ARR = T_ARR;
j2h.T_OBJ = T_OBJ;
j2h.T_LEAF = T_LEAF;

window.j2h = j2h;

}());
