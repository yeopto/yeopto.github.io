(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[691],{7091:function(t){"use strict";var e="%[a-f0-9]{2}",r=new RegExp(e,"gi"),n=new RegExp("("+e+")+","gi");function o(t,e){try{return decodeURIComponent(t.join(""))}catch(a){}if(1===t.length)return t;e=e||1;var r=t.slice(0,e),n=t.slice(e);return Array.prototype.concat.call([],o(r),o(n))}function a(t){try{return decodeURIComponent(t)}catch(a){for(var e=t.match(r),n=1;n<e.length;n++)e=(t=o(e,n).join("")).match(r);return t}}t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var r={"%FE%FF":"��","%FF%FE":"��"},o=n.exec(t);o;){try{r[o[0]]=decodeURIComponent(o[0])}catch(e){var i=a(o[0]);i!==o[0]&&(r[o[0]]=i)}o=n.exec(t)}r["%C2"]="�";for(var s=Object.keys(r),u=0;u<s.length;u++){var l=s[u];t=t.replace(new RegExp(l,"g"),r[l])}return t}(t)}}},8616:function(t){"use strict";t.exports=function(t,e){for(var r={},n=Object.keys(t),o=Array.isArray(e),a=0;a<n.length;a++){var i=n[a],s=t[i];(o?-1!==e.indexOf(i):e(i,s,t))&&(r[i]=s)}return r}},2203:function(t,e,r){"use strict";var n=r(8416),o=r(7424),a=r(861);function i(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){u=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var u=r(8936),l=r(7091),c=r(4734),p=r(8616),f=Symbol("encodeFragmentIdentifier");function d(t){if("string"!=typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function m(t,e){return e.encode?e.strict?u(t):encodeURIComponent(t):t}function g(t,e){return e.decode?l(t):t}function y(t){return Array.isArray(t)?t.sort():"object"==typeof t?y(Object.keys(t)).sort((function(t,e){return Number(t)-Number(e)})).map((function(e){return t[e]})):t}function x(t){var e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),t}function h(t){var e=(t=x(t)).indexOf("?");return-1===e?"":t.slice(e+1)}function v(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&"string"==typeof t&&""!==t.trim()?t=Number(t):!e.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function b(t,e){d((e=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);var r=function(t){var e;switch(t.arrayFormat){case"index":return function(t,r,n){e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===n[t]&&(n[t]={}),n[t][e[1]]=r):n[t]=r};case"bracket":return function(t,r,n){e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"colon-list-separator":return function(t,r,n){e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"comma":case"separator":return function(e,r,n){var o="string"==typeof r&&r.includes(t.arrayFormatSeparator),a="string"==typeof r&&!o&&g(r,t).includes(t.arrayFormatSeparator);r=a?g(r,t):r;var i=o||a?r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)})):null===r?r:g(r,t);n[e]=i};case"bracket-separator":return function(e,r,n){var o=/(\[\])$/.test(e);if(e=e.replace(/\[\]$/,""),o){var a=null===r?[]:r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)}));void 0!==n[e]?n[e]=[].concat(n[e],a):n[e]=a}else n[e]=r?g(r,t):r};default:return function(t,e,r){void 0!==r[t]?r[t]=[].concat(r[t],e):r[t]=e}}}(e),n=Object.create(null);if("string"!=typeof t)return n;if(!(t=t.trim().replace(/^[?#&]/,"")))return n;var a,s=i(t.split("&"));try{for(s.s();!(a=s.n()).done;){var u=a.value;if(""!==u){var l=c(e.decode?u.replace(/\+/g," "):u,"="),p=o(l,2),f=p[0],m=p[1];m=void 0===m?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?m:g(m,e),r(g(f,e),m,n)}}}catch(j){s.e(j)}finally{s.f()}for(var x=0,h=Object.keys(n);x<h.length;x++){var b=h[x],w=n[b];if("object"==typeof w&&null!==w)for(var k=0,A=Object.keys(w);k<A.length;k++){var Z=A[k];w[Z]=v(w[Z],e)}else n[b]=v(w,e)}return!1===e.sort?n:(!0===e.sort?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((function(t,e){var r=n[e];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?t[e]=y(r):t[e]=r,t}),Object.create(null))}e.extract=h,e.parse=b,e.stringify=function(t,e){if(!t)return"";d((e=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);for(var r=function(r){return e.skipNull&&null==t[r]||e.skipEmptyString&&""===t[r]},n=function(t){switch(t.arrayFormat){case"index":return function(e){return function(r,n){var o=r.length;return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[m(e,t),"[",o,"]"].join("")]:[[m(e,t),"[",m(o,t),"]=",m(n,t)].join("")])}};case"bracket":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[m(e,t),"[]"].join("")]:[[m(e,t),"[]=",m(n,t)].join("")])}};case"colon-list-separator":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[m(e,t),":list="].join("")]:[[m(e,t),":list=",m(n,t)].join("")])}};case"comma":case"separator":case"bracket-separator":var e="bracket-separator"===t.arrayFormat?"[]=":"=";return function(r){return function(n,o){return void 0===o||t.skipNull&&null===o||t.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[m(r,t),e,m(o,t)].join("")]:[[n,m(o,t)].join(t.arrayFormatSeparator)])}};default:return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[m(e,t)]:[[m(e,t),"=",m(n,t)].join("")])}}}}(e),o={},i=0,s=Object.keys(t);i<s.length;i++){var u=s[i];r(u)||(o[u]=t[u])}var l=Object.keys(o);return!1!==e.sort&&l.sort(e.sort),l.map((function(r){var o=t[r];return void 0===o?"":null===o?m(r,e):Array.isArray(o)?0===o.length&&"bracket-separator"===e.arrayFormat?m(r,e)+"[]":o.reduce(n(r),[]).join("&"):m(r,e)+"="+m(o,e)})).filter((function(t){return t.length>0})).join("&")},e.parseUrl=function(t,e){e=Object.assign({decode:!0},e);var r=c(t,"#"),n=o(r,2),a=n[0],i=n[1];return Object.assign({url:a.split("?")[0]||"",query:b(h(t),e)},e&&e.parseFragmentIdentifier&&i?{fragmentIdentifier:g(i,e)}:{})},e.stringifyUrl=function(t,r){r=Object.assign(n({encode:!0,strict:!0},f,!0),r);var o=x(t.url).split("?")[0]||"",a=e.extract(t.url),i=e.parse(a,{sort:!1}),s=Object.assign(i,t.query),u=e.stringify(s,r);u&&(u="?".concat(u));var l=function(t){var e="",r=t.indexOf("#");return-1!==r&&(e=t.slice(r)),e}(t.url);return t.fragmentIdentifier&&(l="#".concat(r[f]?m(t.fragmentIdentifier,r):t.fragmentIdentifier)),"".concat(o).concat(u).concat(l)},e.pick=function(t,r,o){o=Object.assign(n({parseFragmentIdentifier:!0},f,!1),o);var a=e.parseUrl(t,o),i=a.url,s=a.query,u=a.fragmentIdentifier;return e.stringifyUrl({url:i,query:p(s,r),fragmentIdentifier:u},o)},e.exclude=function(t,r,n){var o=Array.isArray(r)?function(t){return!r.includes(t)}:function(t,e){return!r(t,e)};return e.pick(t,o,n)}},4734:function(t){"use strict";t.exports=function(t,e){if("string"!=typeof t||"string"!=typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];var r=t.indexOf(e);return-1===r?[t]:[t.slice(0,r),t.slice(r+e.length)]}},8936:function(t){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,(function(t){return"%".concat(t.charCodeAt(0).toString(16).toUpperCase())}))}},8571:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return L}});var n=r(7294),o=r(1008),a=r(3723),i=r(3431);var s=(0,o.Z)(a.G,{target:"e1n1u3tj0"})({name:"686r2t",styles:"width:120px;height:120px;margin-bottom:30px;border-radius:50%;img{border-radius:50%;}@media (max-width: 768px){width:80px;height:80px;}"}),u=function(t){var e=t.profileImage;return(0,i.tZ)(s,{image:e,alt:"Profile Image"})};var l=(0,o.Z)("div",{target:"e160b015"})({name:"1u7ncg7",styles:"width:100%;background-image:linear-gradient(60deg, #29323c 0%, #485563 100%);color:#ffffff"}),c=(0,o.Z)("div",{target:"e160b014"})({name:"1kgufjg",styles:"display:flex;flex-direction:column;justify-content:center;align-items:flex-start;width:768px;height:350px;margin:0 auto;@media (max-width: 768px){width:100%;height:300px;padding:0 20px;}"}),p=(0,o.Z)("div",{target:"e160b013"})({name:"1h8u8jj",styles:"font-size:20px;font-weight:400;@media (max-width: 768px){font-size:15px;}"}),f=(0,o.Z)("div",{target:"e160b012"})({name:"1mgdphf",styles:"margin-top:5px;font-size:35px;font-weight:700;@media (max-width: 768px){font-size:25px;}"}),d=(0,o.Z)("div",{target:"e160b011"})({name:"m1vat2",styles:"display:flex;justify-content:space-evenly;float:right;width:110px;margin:5px 5px;@media (max-width: 768px){width:70px;}"}),m=(0,o.Z)("img",{target:"e160b010"})({name:"1owoeio",styles:"width:40px;height:40px;border-radius:50%;&:hover{box-shadow:0 0 20px rgba(0, 0, 0, 0.5);}@media (max-width: 768px){width:30px;height:30px;}"}),g=function(t){var e=t.profileImage;return(0,i.tZ)(l,null,(0,i.tZ)(c,null,(0,i.tZ)(u,{profileImage:e}),(0,i.tZ)("div",null,(0,i.tZ)(p,null,"코린이의 성장모험"),(0,i.tZ)(f,null,"yeopto 블로그입니다."))),(0,i.tZ)(d,null,(0,i.tZ)("a",{href:"https://velog.io/@yeopto"},(0,i.tZ)(m,{src:"data:image/png;base64,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",alt:"Velog Image"})),(0,i.tZ)("a",{href:"https://github.com/yeopto"},(0,i.tZ)(m,{src:"https://cdn-icons-png.flaticon.com/512/25/25231.png",alt:"Github Image"}))))};var y=r(1597),x=["active"];var h=(0,o.Z)("div",{target:"e1kn8q5k1"})({name:"7on4i6",styles:"display:flex;flex-wrap:wrap;width:768px;margin:100px auto 0;@media (max-width: 768px){width:100%;margin-top:50px;padding:0 20px;}"}),v=(0,o.Z)((function(t){t.active;var e=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,x);return(0,i.tZ)(y.rU,e)}),{target:"e1kn8q5k0"})("margin-right:20px;padding:5px 0;font-size:18px;font-weight:",(function(t){return t.active?"800":"400"}),";cursor:pointer;&:last-of-type{margin-right:0;}@media (max-width: 768px){font-size:15px;}"),b=function(t){var e=t.selectedCategory,r=t.categoryList;return(0,i.tZ)(h,null,Object.entries(r).map((function(t){var r=t[0],n=t[1];return(0,i.tZ)(v,{to:"/?category="+r,active:r===e,key:r},"#",r,"(",n,")")})))},w=r(7462);var k=(0,o.Z)(y.rU,{target:"e1eg5kak7"})({name:"m7gxp6",styles:"display:flex;flex-direction:column;border-radius:10px;box-shadow:0 0 8px rgba(0, 0, 0, 0.15);transition:0.3s box-shadow;cursor:pointer;&:hover{box-shadow:0 0 10px rgba(0, 0, 0, 0.3);}"}),A=(0,o.Z)(a.G,{target:"e1eg5kak6"})({name:"1axbq5h",styles:"width:100%;height:200px;border-radius:10px 10px 0 0"}),Z=(0,o.Z)("div",{target:"e1eg5kak5"})({name:"1do7u82",styles:"flex:1;display:flex;flex-direction:column;padding:15px"}),j=(0,o.Z)("div",{target:"e1eg5kak4"})({name:"kw2b4d",styles:"display:-webkit-box;overflow:hidden;margin-bottom:3px;text-overflow:ellipsis;white-space:normal;overflow-wrap:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:20px;font-weight:700"}),I=(0,o.Z)("div",{target:"e1eg5kak3"})({name:"xm5j9w",styles:"font-size:14px;font-weight:400;opacity:0.7"}),C=(0,o.Z)("div",{target:"e1eg5kak2"})({name:"1bobky6",styles:"display:flex;flex-wrap:wrap;margin-top:10px;margin:10px -5px"}),O=(0,o.Z)("div",{target:"e1eg5kak1"})({name:"1bzcbme",styles:"margin:2.5px 5px;padding:3px 5px;border-radius:3px;background:black;font-size:14px;font-weight:700;color:white"}),F=(0,o.Z)("div",{target:"e1eg5kak0"})({name:"1wehmme",styles:"display:-webkit-box;overflow:hidden;margin-top:auto;text-overflow:ellipsis;white-space:normal;overflow-wrap:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:16px;opacity:0.8"}),G=function(t){var e=t.title,r=t.date,n=t.categories,o=t.summary,a=t.thumbnail.childImageSharp.gatsbyImageData,s=t.link;return(0,i.tZ)(k,{to:s},(0,i.tZ)(A,{image:a,alt:"Post Item Image"}),(0,i.tZ)(Z,null,(0,i.tZ)(j,null,e),(0,i.tZ)(I,null,r),(0,i.tZ)(C,null,n.map((function(t){return(0,i.tZ)(O,{key:t},t)}))),(0,i.tZ)(F,null,o)))},E=function(t,e){var r=(0,n.useRef)(null),o=(0,n.useState)(1),a=o[0],i=o[1],s=(0,n.useMemo)((function(){return e.filter((function(e){var r=e.node.frontmatter.categories;return"All"===t||r.includes(t)}))}),[t]);if("undefined"!=typeof window){var u=new IntersectionObserver((function(t,e){t[0].isIntersecting&&(i((function(t){return t+1})),e.disconnect())}));(0,n.useEffect)((function(){10*a>=s.length||null===r.current||0===r.current.children.length||u.observe(r.current.children[r.current.children.length-1])}),[a,t])}return(0,n.useEffect)((function(){return i(1)}),[t]),{containerRef:r,postList:s.slice(0,10*a)}};var S=(0,o.Z)("div",{target:"es8e92y0"})({name:"11grurp",styles:"display:grid;grid-template-columns:1fr 1fr;grid-gap:20px;width:768px;margin:0 auto;padding:50px 0 100px;@media (max-width: 768px){grid-template-columns:1fr;width:100%;padding:50px 20px;}"}),R=function(t){var e=t.selectedCategory,r=t.posts,n=E(e,r),o=n.containerRef,a=n.postList;return(0,i.tZ)(S,{ref:o},a.map((function(t){var e=t.node,r=e.id,n=e.fields.slug,o=e.frontmatter;return(0,i.tZ)(G,(0,w.Z)({},o,{link:n,key:r}))})))},U=r(2203),B=r(5907),M=r(4769),q=r(5414);var z=(0,o.Z)("main",{target:"e1strnqo0"})({name:"13ku56z",styles:"display:flex;flex-direction:column;height:100%"}),N=function(t){var e=t.children,r=t.title,n=t.description,o=t.url,a=t.image;return(0,i.tZ)(z,null,(0,i.tZ)(q.q,null,(0,i.tZ)("title",null,r),(0,i.tZ)("meta",{name:"description",content:n}),(0,i.tZ)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,i.tZ)("meta",{httpEquiv:"Content-Type",content:"text/html;charset=UTF-8"}),(0,i.tZ)("meta",{property:"og:type",content:"website"}),(0,i.tZ)("meta",{property:"og:title",content:r}),(0,i.tZ)("meta",{property:"og:description",content:n}),(0,i.tZ)("meta",{property:"og:image",content:a}),(0,i.tZ)("meta",{property:"og:url",content:o}),(0,i.tZ)("meta",{property:"og:site_name",content:r}),(0,i.tZ)("meta",{name:"google-site-verification",content:"ql22z_2Y_hxY79KKMHs_pLQVmom92VRl7YZ-86hVhZo"}),(0,i.tZ)("meta",{name:"naver-site-verification",content:"afb35c954ef587db6a8825631a9011d9d7652fdb"}),(0,i.tZ)("html",{lang:"ko"})),(0,i.tZ)(B.Z,null),e,(0,i.tZ)(M.Z,null))},L=function(t){var e=t.location.search,r=t.data,o=r.site.siteMetadata,a=o.title,s=o.description,u=o.siteUrl,l=r.allMarkdownRemark.edges,c=r.file,p=c.childImageSharp.gatsbyImageData,f=c.publicURL,d=U.parse(e),m="string"==typeof d.category&&d.category?d.category:"All";console.log(l);var y=(0,n.useMemo)((function(){return l.reduce((function(t,e){return e.node.frontmatter.categories.forEach((function(e){void 0===t[e]?t[e]=1:t[e]++})),t.All++,t}),{All:0})}),[]);return(0,i.tZ)(N,{title:a,description:s,url:u,image:f},(0,i.tZ)(g,{profileImage:p}),(0,i.tZ)(b,{selectedCategory:m,categoryList:y}),(0,i.tZ)(R,{selectedCategory:m,posts:l}))}},3897:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.__esModule=!0,t.exports.default=t.exports},5372:function(t){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},3405:function(t,e,r){var n=r(3897);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8416:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.__esModule=!0,t.exports.default=t.exports},9498:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8872:function(t){t.exports=function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);i=!0);}catch(u){s=!0,o=u}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}},t.exports.__esModule=!0,t.exports.default=t.exports},2218:function(t){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},2281:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},7424:function(t,e,r){var n=r(5372),o=r(8872),a=r(6116),i=r(2218);t.exports=function(t,e){return n(t)||o(t,e)||a(t,e)||i()},t.exports.__esModule=!0,t.exports.default=t.exports},861:function(t,e,r){var n=r(3405),o=r(9498),a=r(6116),i=r(2281);t.exports=function(t){return n(t)||o(t)||a(t)||i()},t.exports.__esModule=!0,t.exports.default=t.exports},6116:function(t,e,r){var n=r(3897);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=component---src-pages-index-tsx-579c77ce7d45d4999b70.js.map