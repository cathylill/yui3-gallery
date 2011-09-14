YUI.add("gallery-makenode",function(a){(function(){var k=a.Lang,n="dump",p=" ",m="{",o="}",l=/(~-(\d+)-~)/g;a.substitute=function(F,r,z,q){var x,w,u,D,C,E,B=[],t,y,A=F.length;r=a.merge({LBRACE:m,RBRACE:o},r);for(;;){x=F.lastIndexOf(m,A);if(x<0){break;}w=F.indexOf(o,x);if(x+1>=w){break;}t=F.substring(x+1,w);D=t;E=null;u=D.indexOf(p);if(u>-1){E=D.substring(u+1);D=D.substring(0,u);}C=r[D];if(z){C=z(D,C,E);}if(k.isObject(C)){if(!a.dump){C=C.toString();}else{if(k.isArray(C)){C=a.dump(C,parseInt(E,10));}else{E=E||"";y=E.indexOf(n);if(y>-1){E=E.substring(4);}if(C.toString===Object.prototype.toString||y>-1){C=a.dump(C,parseInt(E,10));}else{C=C.toString();}}}}else{if(k.isUndefined(C)){C="~-"+B.length+"-~";B.push(t);}}F=F.substring(0,x)+C+F.substring(w+1);if(!q){A=x-1;}}F=F.replace(l,function(G,v,s){return m+B[parseInt(s,10)]+o;});return F;};})();var b=/\s+/,c="Node",i=".",h="boundingBox",f=a.Lang,j=' for "{name}" defined in class {recentDef} also defined in class {prevDef}',e=/^(?:([ \t]+)|("[^"\\]*(?:\\.[^"\\]*)*")|(true)|(false)|(null)|([\-+]?[0-9]*(?:\.[0-9]+)?))/,d=/\\"/g,g=function(){this._makeClassNames();this._concatUIAttrs();this._publishEvents();this.after("render",this._attachEvents,this);this.after("destroy",this._detachEvents,this);};g.prototype={_classNames:null,_templateHandlers:{"@":function(k){return this.get(k);},"p":function(k){return this[k];},"m":function(k){var l=k.split(b)[0];k=k.substr(l.length);k=this._parseMakeNodeArgs(k);return this[l].apply(this,k);},"c":function(k){return this._classNames[k];},"s":function(k){return this.get("strings")[k];},"?":function(k){k=this._parseMakeNodeArgs(k);return(!!k[0])?k[1]:k[2];},"1":function(k){k=this._parseMakeNodeArgs(k);return parseInt(k[0],10)===1?k[1]:k[2];}},_parseMakeNodeArgs:function(k){var l=[],m=function(n,o){if(n!==undefined&&o){switch(o){case 1:break;case 2:l.push(n.substr(1,n.length-2).replace(d,'"'));break;case 3:l.push(true);break;case 4:l.push(false);break;case 5:l.push(null);break;case 6:if(n){l.push(parseFloat(n));}else{k=k.substr(1);}break;}k=k.substr(n.length);return true;}};while(k.length){a.some(e.exec(k),m);}return l;},_makeNode:function(l,k){if(!l){a.some(this._getClasses(),function(m){l=m._TEMPLATE;if(l){return true;}});}return a.Node.create(this._substitute(l,k));},_substitute:function(m,l){var k;return a.substitute(m,l||{},a.bind(function(o,p,n){if(n){k=this._templateHandlers[o.toLowerCase()];if(k){return k.call(this,n);}}return p;},this),true);},_locateNodes:function(){var k=this.get(h),l;if(arguments.length){a.each(arguments,function(m){l=k.one(i+this._classNames[m]);if(l){this["_"+m+c]=l;}},this);}else{a.each(this._classNames,function(m,n){l=k.one(i+m);if(l){this["_"+n+c]=l;}},this);}},_makeClassNames:function(){var l=a.ClassNameManager.getClassName,m={},k=this._classNames={};a.each(this._getClasses(),function(n){if(n._CLASS_NAMES){a.each(n._CLASS_NAMES,function(o){if(m[o]){}else{k[o]=l(n.NAME.toLowerCase(),o);m[o]=n.NAME;}});}});k.content=(k.boundingBox=l(this.constructor.NAME.toLowerCase()))+"-content";if(this.getStdModNode){k.HEADER="yui3-widget-hd";k.BODY="yui3-widget-bd";k.FOOTER="yui3-widget-ft";}},_concatUIAttrs:function(){var m,l,k={};a.each(["BIND","SYNC"],function(n){m={};a.each(this._UI_ATTRS[n],function(o){m[o]="Widget";});a.each(this._getClasses(),function(o){l=o._ATTRS_2_UI;if(l){a.each(a.Array(l[n]),function(p){if(m[p]){}else{m[p]=o.NAME;}});}});k[n]=a.Object.keys(m);},this);this._UI_ATTRS=k;},_attachEvents:function(){var s=this.get(h),l,r=this,m=[],o,p,n,q=function(t){return t.charAt(0).toUpperCase()+t.substr(1);},k={boundingBox:s,document:s.get("ownerDocument"),THIS:r,Y:a};a.each(this._getClasses(),function(t){a.each(t._EVENTS||{},function(u,v){l=k[v]||i+this._classNames[v];a.each(a.Array(u),function(w){p=null;if(f.isString(w)){o=w;n=null;}else{if(f.isObject(w)){o=w.type;p=w.fn;n=w.args;}else{}}if(o){p=p||"_after"+q(v)+q(o);if(!r[p]){}else{p=r[p];}if(f.isString(l)){if(o==="key"){m.push(s.delegate(o,p,n,l,r));}else{m.push(s.delegate(o,p,l,r,n));}}else{if(l===r||l===a){m.push(l.after(o,p,r,n));}else{if(o==="key"){m.push(a.after(o,p,l,n,r));}else{m.push(a.after(o,p,l,r,n));}}}}else{}});},this);},this);this._eventHandles=m;},_publishEvents:function(){var n=this._getClasses(),k=n.length,m,o=function(p,l){var q={};a.each(p||{},function(s,r){q[r]=r.substr(-2)==="Fn"?this[s]:s;},this);this.publish(l,q);};for(m=k-1;m>=0;m--){a.each(n[m]._PUBLISH||{},o,this);}},_detachEvents:function(){a.each(this._eventHandles,function(k){k.detach();});}};a.MakeNode=g;},"gallery-2011.09.07-20-35",{requires:["substitute","classnamemanager"],skinnable:false});