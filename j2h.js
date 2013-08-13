(function(){
'use strict';

function j2h()
{
    var obj = {},
        delegator;
    
    this.__defineSetter__('delegator', function( newDelegator ){
        delegator = newDelegator;
    });
    
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
}

window.j2h = j2h;

}());
