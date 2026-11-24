// Draws the nail illustration as an SVG string.
// o = { shape, len, fin, art, col } where col is one colour or an array of 5 (one per finger).
export function hand(o,id){
  var L={short:30,medium:46,long:64}[o.len],W=28,sk='#B8825F',s='<svg viewBox="0 0 270 400" aria-hidden="true"><defs>',F=[[22,172],[62,134],[102,116],[142,132],[200,222,1]];
  var col=function(i){return Array.isArray(o.col)?o.col[i]:o.col};
  function np(x,b,h){var w=W;return {square:'M'+x+' '+b+'V'+(b-h)+'H'+(x+w)+'V'+b+'Z',oval:'M'+x+' '+b+'V'+(b-h+w/2)+'A'+w/2+' '+w/2+' 0 0 1 '+(x+w)+' '+(b-h+w/2)+'V'+b+'Z',
   almond:'M'+x+' '+b+'C'+x+' '+(b-h*.5)+' '+(x+w*.25)+' '+(b-h*.85)+' '+(x+w/2)+' '+(b-h)+'C'+(x+w*.75)+' '+(b-h*.85)+' '+(x+w)+' '+(b-h*.5)+' '+(x+w)+' '+b+'Z',
   coffin:'M'+x+' '+b+'L'+(x+w*.2)+' '+(b-h)+'H'+(x+w*.8)+'L'+(x+w)+' '+b+'Z',stiletto:'M'+x+' '+b+'Q'+(x+w*.3)+' '+(b-h*.5)+' '+(x+w/2)+' '+(b-h)+'Q'+(x+w*.7)+' '+(b-h*.5)+' '+(x+w)+' '+b+'Z'}[o.shape]}
  var body='<rect x="14" y="238" width="186" height="150" rx="50" fill="'+sk+'"/>',nails='';
  F.forEach(function(f,i){var x=f[0],y=f[1],b=y+30,nx=x+3,d=np(nx,b,L),c=col(i),fill=c;
    if(o.fin==='chrome'){s+='<linearGradient id="g'+id+i+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="'+(o.art==='french'?'#F4D8CC':c)+'"/><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="'+(o.art==='french'?'#F4D8CC':c)+'"/></linearGradient>';fill='url(#g'+id+i+')'}
    if(o.art==='french'&&o.fin!=='chrome')fill='#F4D8CC';
    var g='<path class="nl" d="'+d+'" style="fill:'+fill+'"/>';
    if(o.art==='french'){s+='<clipPath id="k'+id+i+'"><path d="'+d+'"/></clipPath>';g+='<rect x="'+nx+'" y="'+(b-L)+'" width="'+W+'" height="'+(L*.3)+'" clip-path="url(#k'+id+i+')" style="fill:'+c+'"/>'}
    if(o.fin==='glossy'||o.fin==='chrome')g+='<path d="M'+(nx+7)+' '+(b-5)+'L'+(nx+7)+' '+(b-L*.55)+'" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>';
    if(o.fin==='cateye')g+='<path d="M'+(nx+5)+' '+(b-L*.25)+'L'+(nx+W-4)+' '+(b-L*.7)+'" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round" fill="none"/>';
    if(o.art==='simple'||o.art==='full')g+='<circle cx="'+(nx+W/2)+'" cy="'+(b-L*.4)+'" r="3.4" fill="#fff" fill-opacity=".95"/>';
    if(o.art==='full')g+='<path d="M'+nx+' '+(b-L*.7)+'L'+(nx+W)+' '+(b-L*.55)+'" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><circle cx="'+(nx+6)+'" cy="'+(b-L*.2)+'" r="2" fill="#fff"/><circle cx="'+(nx+W-6)+'" cy="'+(b-L*.85)+'" r="2" fill="#fff"/>';
    var fin='<rect x="'+x+'" y="'+y+'" width="34" height="'+(310-y)+'" rx="17" fill="'+sk+'"/>';
    if(f[2]){body+='<g transform="rotate(26 217 330)">'+fin+g+'</g>'}else{body+=fin;nails+=g}});
  return s+'</defs>'+body+nails+'</svg>'}
