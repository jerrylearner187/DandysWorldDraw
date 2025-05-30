const CosAuthFunc = (function () {
  'use strict';

  /*
   CryptoJS v3.1.2
   code.google.com/p/crypto-js
   (c) 2009-2013 by Jeff Mott. All rights reserved.
   code.google.com/p/crypto-js/wiki/License
   */
  var CryptoJS=CryptoJS||function(g,l){var e={},d=e.lib={},m=function(){},k=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    p=d.WordArray=k.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=l?c:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var c=this.words,q=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var b=0;b<a;b++)c[f+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((f+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[f+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
        32-8*(c%4);a.length=g.ceil(c/4)},clone:function(){var a=k.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new p.init(c,a)}}),b=e.enc={},n=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++){var d=c[f>>>2]>>>24-8*(f%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f+=2)b[f>>>3]|=parseInt(a.substr(f,
        2),16)<<24-4*(f%8);return new p.init(b,c/2)}},j=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++)b.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f++)b[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new p.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},
    r=d.BufferedBlockAlgorithm=k.extend({reset:function(){this._data=new p.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,f=c.sigBytes,d=this.blockSize,e=f/(4*d),e=a?g.ceil(e):g.max((e|0)-this._minBufferSize,0);a=e*d;f=g.min(4*a,f);if(a){for(var k=0;k<a;k+=d)this._doProcessBlock(b,k);k=b.splice(0,a);c.sigBytes-=f}return new p.init(k,f)},clone:function(){var a=k.clone.call(this);
        a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=r.extend({cfg:k.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){r.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new s.HMAC.init(a,
      d)).finalize(b)}}});var s=e.algo={};return e}(Math);
  (function(){var g=CryptoJS,l=g.lib,e=l.WordArray,d=l.Hasher,m=[],l=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new e.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(d,e){for(var b=this._hash.words,n=b[0],j=b[1],h=b[2],g=b[3],l=b[4],a=0;80>a;a++){if(16>a)m[a]=d[e+a]|0;else{var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31}c=(n<<5|n>>>27)+l+m[a];c=20>a?c+((j&h|~j&g)+1518500249):40>a?c+((j^h^g)+1859775393):60>a?c+((j&h|j&g|h&g)-1894007588):c+((j^h^
      g)-899497514);l=g;g=h;h=j<<30|j>>>2;j=n;n=c}b[0]=b[0]+n|0;b[1]=b[1]+j|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+l|0},_doFinalize:function(){var d=this._data,e=d.words,b=8*this._nDataBytes,g=8*d.sigBytes;e[g>>>5]|=128<<24-g%32;e[(g+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(g+64>>>9<<4)+15]=b;d.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=d.clone.call(this);e._hash=this._hash.clone();return e}});g.SHA1=d._createHelper(l);g.HmacSHA1=d._createHmacHelper(l)})();
  (function(){var g=CryptoJS,l=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(e,d){e=this._hasher=new e.init;"string"==typeof d&&(d=l.parse(d));var g=e.blockSize,k=4*g;d.sigBytes>k&&(d=e.finalize(d));d.clamp();for(var p=this._oKey=d.clone(),b=this._iKey=d.clone(),n=p.words,j=b.words,h=0;h<g;h++)n[h]^=1549556828,j[h]^=909522486;p.sigBytes=b.sigBytes=k;this.reset()},reset:function(){var e=this._hasher;e.reset();e.update(this._iKey)},update:function(e){this._hasher.update(e);return this},finalize:function(e){var d=
      this._hasher;e=d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e))}})})();

  // CryptoJS Base
  (function () {var C = CryptoJS;var C_lib = C.lib;var WordArray = C_lib.WordArray;var C_enc = C.enc;C_enc.Base64 = {stringify: function (wordArray) {var words = wordArray.words;var sigBytes = wordArray.sigBytes;var map = this._map;wordArray.clamp();var base64Chars = [];for (var i = 0; i < sigBytes; i += 3) {var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;var triplet = (byte1 << 16) | (byte2 << 8) | byte3;for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));}}var paddingChar = map.charAt(64);if (paddingChar) {while (base64Chars.length % 4) {base64Chars.push(paddingChar);}}return base64Chars.join('');}, parse: function (base64Str) {var base64StrLength = base64Str.length;var map = this._map;var paddingChar = map.charAt(64);if (paddingChar) {var paddingIndex = base64Str.indexOf(paddingChar);if (paddingIndex != -1) {base64StrLength = paddingIndex;}}var words = [];var nBytes = 0;for (var i = 0; i < base64StrLength; i++) {if (i % 4) {var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);nBytes++;}}return WordArray.create(words, nBytes);}, _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='};}());

  // 和 cam 保持一致的 url encode
  function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  }

  // v4 签名
  var CosAuthV4 = function (opt) {
    var pathname = opt.Pathname || '/';
    var expires = opt.Expires;

    var ShortBucketName = '';
    var AppId = '';
    var match = opt.Bucket.match(/^(.+)-(\d+)$/);
    if (match) {
      ShortBucketName = match[1];
      AppId = match[2];
    }

    var random = parseInt(Math.random() * Math.pow(2, 32));
    var now = parseInt(Date.now() / 1000);
    var e = now + (expires === undefined ? 900 : (expires * 1 || 0)); // 默认签名过期时间为当前时间 + 900s
    var path = '/' + AppId + '/' + ShortBucketName + encodeURIComponent(pathname).replace(/%2F/g, '/'); //多次签名这里填空
    var plainText = 'a=' + AppId + '&b=' + ShortBucketName + '&k=' + opt.SecretId + '&e=' + e + '&t=' + now + '&r=' + random + '&f=' + path;
    var sha1Res = CryptoJS.HmacSHA1(plainText, opt.SecretKey);
    var strWordArray = CryptoJS.enc.Utf8.parse(plainText);
    var resWordArray = sha1Res.concat(strWordArray);
    var sign = resWordArray.toString(CryptoJS.enc.Base64);

    return sign;
  }

  // v5 签名
  var CosAuth = function (opt) {

    if (!opt.SecretId) return console.error('missing param SecretId');
    if (!opt.SecretKey) return console.error('missing param SecretKey');

    if (opt.Version === '4.0') {
      return CosAuthV4(opt);
    }

    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var method = (opt.Method || 'get').toLowerCase();
    var query = opt.Query || {};
    var headers = opt.Headers || {};
    var pathname = opt.Pathname || '/';
    var expires = opt.Expires;

    var getObjectKeys = function (obj) {
      var list = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          list.push(key);
        }
      }
      return list.sort(function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a === b ? 0 : (a > b ? 1 : -1);
      });
    };

    var obj2str = function (obj, lowerCaseKey) {
      var i, key, val;
      var list = [];
      var keyList = getObjectKeys(obj);
      for (i = 0; i < keyList.length; i++) {
        key = keyList[i];
        val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
        key = lowerCaseKey? camSafeUrlEncode(key).toLowerCase() : camSafeUrlEncode(key);
        val = camSafeUrlEncode(val) || '';
        list.push(key + '=' + val)
      }
      return list.join('&');
    };

    // 签名有效起止时间
    var now = parseInt(new Date().getTime() / 1000) - 1;
    var exp = now + (expires === undefined ? 900 : (expires * 1 || 0)); // 默认签名过期时间为当前时间 + 900s

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = now + ';' + exp;
    var qKeyTime = now + ';' + exp;
    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(query).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString();

    // 步骤二：构成 FormatString
    var formatString = [method, pathname, obj2str(query, true), obj2str(headers, true), ''].join('\n');

    // 步骤三：计算 StringToSign
    var stringToSign = ['sha1', qSignTime, CryptoJS.SHA1(formatString).toString(), ''].join('\n');

    // 步骤四：计算 Signature
    var qSignature = CryptoJS.HmacSHA1(stringToSign, signKey).toString();

    // 步骤五：构造 Authorization
    var authorization = [
      'q-sign-algorithm=' + qSignAlgorithm,
      'q-ak=' + qAk,
      'q-sign-time=' + qSignTime,
      'q-key-time=' + qKeyTime,
      'q-header-list=' + qHeaderList,
      'q-url-param-list=' + qUrlParamList,
      'q-signature=' + qSignature
    ].join('&');

    return authorization;

  };

  return CosAuth
})();

export default CosAuthFunc