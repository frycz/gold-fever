(this["webpackJsonpreact-experiments"]=this["webpackJsonpreact-experiments"]||[]).push([[0],{22:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(2),i=n.n(r),a=n(17),c=n.n(a),s=(n(22),n(16)),l=n(4),o=n(5),y=n(15),d=n.n(y),u=(n(39),n(0)),m=function(e){var t=e.width,n=e.height,r=e.playerX,i=e.playerY,a=e.items,c=e.enemies;return Object(u.jsx)("div",{className:"grid",children:Array(n).fill(null).map((function(e,n){return Object(u.jsx)("div",{style:{display:"flex"},children:Array(t).fill(null).map((function(e,t){return Object(u.jsx)("div",{className:"grid-field".concat(r===t&&i===n?" player-field":"").concat(a.find((function(e){return e.x===t&&e.y===n}))?" item-field":"").concat(c.find((function(e){return e.x===t&&e.y===n}))?" enemy-field":"")},"".concat(t,"-").concat(n))}))},n)}))})},p=(n(41),new d.a.AStarFinder),f={points:0,player:{x:0,y:0},items:[{x:2,y:7},{x:8,y:5},{x:4,y:5},{x:6,y:3}],enemies:[{x:9,y:9}]},x=function(){return f},j=function(e,t){var n=function(e,t){var n,r,i=e.player.x,a=e.player.y;return"up"===t&&(i=e.player.x,a=e.player.y>0?e.player.y-1:e.player.y),"down"===t&&(i=e.player.x,a=e.player.y<9?e.player.y+1:e.player.y),"left"===t&&(i=e.player.x>0?e.player.x-1:e.player.x,a=e.player.y),"right"===t&&(i=e.player.x<9?e.player.x+1:e.player.x,a=e.player.y),r=-1!==(n=e.items.findIndex((function(e){return e.x===i&&e.y===a})))?[{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}]:[],Object(o.a)(Object(o.a)({},e),{},{player:{x:i,y:a},points:-1!==n?e.points+1:e.points,items:[].concat(Object(l.a)(-1!==n?e.items.filter((function(e,t){return t!==n})):e.items),Object(l.a)(r))})}(e,t);return e.enemies.reduce((function(e,t,n){return function(e,t,n){var r=Object(o.a)({},e.enemies[t]),i=new d.a.Grid(10,10);i.setWalkableAt(e.player.x,e.player.y,!1),e.enemies.forEach((function(n,r){r!==t&&i.setWalkableAt(e.enemies[r].x,e.enemies[r].y,!1)}));var a=e.items.map((function(e){return n.findPath(r.x,r.y,e.x,e.y,i.clone())})).sort((function(e,t){return e.length-t.length})),c=a[0][1]?a[0][1]:[r.x,r.y],y=Object(s.a)(c,2),u=y[0],m=y[1];r.x=u<=9&&u>=0?u:r.x,r.y=m<=9&&m>=0?m:r.y;var p=e.items.findIndex((function(e){return e.x===r.x&&e.y===r.y})),f=-1!==p?[{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}]:[];return Object(o.a)(Object(o.a)({},e),{},{items:[].concat(Object(l.a)(-1!==p?e.items.filter((function(e,t){return t!==p})):e.items),f),points:-1!==p?e.points-1:e.points,enemies:[].concat(Object(l.a)(e.enemies.slice(0,t)),[r],Object(l.a)(e.enemies.slice(t+1,e.enemies.length)))})}(e,n,p)}),n)};var h=function(){var e=i.a.useReducer(j,f,x),t=Object(s.a)(e,2),n=t[0],r=t[1],a=function(e){"ArrowUp"===e.key&&r("up"),"ArrowDown"===e.key&&r("down"),"ArrowLeft"===e.key&&r("left"),"ArrowRight"===e.key&&r("right")};return i.a.useEffect((function(){return window.addEventListener("keydown",a),function(){return window.removeEventListener("keydown",a)}}),[]),Object(u.jsx)("div",{className:"grid-wrapper",children:Object(u.jsxs)("div",{className:"grid-container",children:[Object(u.jsxs)("div",{className:"side",children:[Object(u.jsx)("div",{className:"game-title",children:"Gold Fever"}),Object(u.jsx)("div",{className:"game-description",children:"Collect all the gold"}),Object(u.jsx)("div",{className:"game-instruction",children:"Use arrow keys to move"})]}),Object(u.jsx)(m,{width:10,height:10,playerX:n.player.x,playerY:n.player.y,items:n.items,enemies:n.enemies}),Object(u.jsx)("div",{className:"side",children:Object(u.jsxs)("div",{className:"score",children:[Object(u.jsx)("div",{className:"score-title",children:"Score:"}),Object(u.jsx)("div",{className:"score-value",children:n.points})]})})]})})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),a(e),c(e)}))};c.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(h,{})}),document.getElementById("root")),b()}},[[42,1,2]]]);
//# sourceMappingURL=main.fbaedbed.chunk.js.map