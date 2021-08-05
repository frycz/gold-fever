(this["webpackJsonpreact-experiments"]=this["webpackJsonpreact-experiments"]||[]).push([[0],{22:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r,i=n(3),c=n.n(i),a=n(17),l=n.n(a),s=(n(22),n(7)),o=n(8),d=n(1),u=n(16),m=n.n(u),j=(n(39),n(0)),y=function(e){var t=e.width,n=e.height,r=e.playerX,i=e.playerY,c=e.items,a=e.enemies;return Object(j.jsx)("div",{className:"grid",children:Array(n).fill(null).map((function(e,n){return Object(j.jsx)("div",{style:{display:"flex"},children:Array(t).fill(null).map((function(e,t){return Object(j.jsxs)("div",{className:"grid-field",children:[r===t&&i===n?Object(j.jsx)("div",{className:"player-field"}):null,c.find((function(e){return e.x===t&&e.y===n}))?Object(j.jsx)("div",{className:"item-field"}):null,a.find((function(e){return e.x===t&&e.y===n}))?Object(j.jsx)("div",{className:"enemy-field"}):null]},"".concat(t,"-").concat(n))}))},n)}))})},x=(n(41),new m.a.AStarFinder),f={currentLevel:0,maxLevel:0,points:0,player:{x:0,y:0},items:[{x:2,y:7},{x:8,y:5},{x:4,y:5},{x:6,y:3}],enemies:[{x:9,y:9}]},p=function(e,t,n){var r=e.items.findIndex((function(e){return e.x===t.x&&e.y===t.y}));return Object(d.a)(Object(d.a)({},e),-1!==r?Object(d.a)(Object(d.a)({},n(e)),{},{items:-1!==r?[].concat(Object(o.a)(e.items.slice(0,r)),[{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}],Object(o.a)(e.items.slice(r+1,e.items.length))):e.items}):{})},b=(r={gridWidth:10,gridHeight:10},function(e,t,n){return n.reduce((function(e,n){return n(e,t,r)}),e)}),h=function(e,t,n){return function(e,t,n){var r=e.player.x,i=e.player.y;return"up"===t&&(r=e.player.x,i=e.player.y>0?e.player.y-1:e.player.y),"down"===t&&(r=e.player.x,i=e.player.y<n.gridHeight-1?e.player.y+1:e.player.y),"left"===t&&(r=e.player.x>0?e.player.x-1:e.player.x,i=e.player.y),"right"===t&&(r=e.player.x<n.gridWidth-1?e.player.x+1:e.player.x,i=e.player.y),Object(d.a)(Object(d.a)({},e),{},{player:{x:r,y:i}})}(e,t,n)},v=function(e,t,n){return b(e,t,e.enemies.map((function(e,t){return function(e,n,r){return O(e,t,x)}})))},O=function(e,t,n){var r=Object(d.a)({},e.enemies[t]),i=new m.a.Grid(10,10);i.setWalkableAt(e.player.x,e.player.y,!1),e.enemies.forEach((function(n,r){r!==t&&i.setWalkableAt(e.enemies[r].x,e.enemies[r].y,!1)}));var c=e.maxLevel-e.currentLevel,a=e.items.slice(0,e.items.length>c?e.items.length-c:e.items.length).map((function(e){return n.findPath(r.x,r.y,e.x,e.y,i.clone())})).filter((function(e){return e.length})).sort((function(e,t){return e.length-t.length})),l=a[0]&&a[0][1]?a[0][1]:[r.x,r.y],u=Object(s.a)(l,2),j=u[0],y=u[1];return r.x=j<=9&&j>=0?j:r.x,r.y=y<=9&&y>=0?y:r.y,Object(d.a)(Object(d.a)({},e),{},{enemies:[].concat(Object(o.a)(e.enemies.slice(0,t)),[r],Object(o.a)(e.enemies.slice(t+1,e.enemies.length)))})},g=function(e,t){return b(e,t,[h,function(e,t,n){return p(e,e.player,(function(e){return Object(d.a)(Object(d.a)({},e),{},{points:e.points+1})}))},v,function(e,t,n){return b(e,t,e.enemies.map((function(e,t){return function(t,n,r){return p(t,e,(function(e){return Object(d.a)(Object(d.a)({},e),{},{points:e.points-1})}))}})))}])},w=function(e){var t=e.currentLevel,n=e.maxLevel,r=c.a.useReducer(g,Object(d.a)(Object(d.a)({},f),{},{currentLevel:t,maxLevel:n})),i=Object(s.a)(r,2),a=i[0],l=i[1],o=function(e){"ArrowUp"===e.key&&l("up"),"ArrowDown"===e.key&&l("down"),"ArrowLeft"===e.key&&l("left"),"ArrowRight"===e.key&&l("right")};return c.a.useEffect((function(){return window.addEventListener("keydown",o),function(){return window.removeEventListener("keydown",o)}}),[]),Object(j.jsx)("div",{className:"grid-wrapper",children:Object(j.jsxs)("div",{className:"grid-container",children:[Object(j.jsxs)("div",{className:"side",children:[Object(j.jsx)("div",{className:"game-title",children:"Gold Fever"}),Object(j.jsx)("div",{className:"game-description",children:"Collect all the gold"}),Object(j.jsx)("div",{className:"game-instruction",children:"Use arrow keys to move"})]}),Object(j.jsx)(y,{width:10,height:10,playerX:a.player.x,playerY:a.player.y,items:a.items,enemies:a.enemies}),Object(j.jsx)("div",{className:"side",children:Object(j.jsxs)("div",{className:"score",children:[Object(j.jsx)("div",{className:"score-title",children:"Score:"}),Object(j.jsx)("div",{className:"score-value",children:a.points})]})})]})})},N=(n(42),function(){var e=c.a.useState(),t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(j.jsx)("div",{children:void 0===n?Object(j.jsx)("div",{className:"grid-wrapper",children:Object(j.jsx)("div",{className:"grid-container",children:Object(j.jsxs)("div",{className:"side",style:{textAlign:"center"},children:[Object(j.jsx)("div",{className:"game-title",children:"Gold Fever"}),Object(j.jsx)("div",{className:"game-description",children:"Collect all the gold"}),Object(j.jsx)("div",{style:{marginBottom:"20px",marginTop:"12px",color:"#887a12",fontSize:"24px"},children:"Select difficulty level"}),Object(j.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:["Easy","Medium","Hard","Master"].map((function(e,t){return Object(j.jsx)("div",{className:"button",style:{marginBottom:"10px"},onClick:function(){return r(t)},children:e})}))})]})})}):Object(j.jsx)(w,{currentLevel:n,maxLevel:3})})}),L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),c(e),a(e)}))};l.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(N,{})}),document.getElementById("root")),L()}},[[43,1,2]]]);
//# sourceMappingURL=main.dbcbb62e.chunk.js.map