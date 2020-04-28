(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/assets/style/reset.scss
var style_reset = __webpack_require__(10);

// CONCATENATED MODULE: ./src/assets/images/spike_banner.png
/* harmony default export */ var spike_banner = (__webpack_require__.p + "static/img/spike_banner.05e7f41.png");
// CONCATENATED MODULE: ./src/assets/images/bg.png
/* harmony default export */ var bg = (__webpack_require__.p + "static/img/bg.cb333c2.png");
// EXTERNAL MODULE: ./node_modules/_axios@0.19.2@axios/index.js
var _axios_0_19_2_axios = __webpack_require__(9);
var _axios_0_19_2_axios_default = /*#__PURE__*/__webpack_require__.n(_axios_0_19_2_axios);

// CONCATENATED MODULE: ./src/axios/index.js
// import Vue from 'vue'


const instance = _axios_0_19_2_axios_default.a.create({
  timeout: 60000
})
// 统一处理ajax失败
instance.interceptors.response.use(function (res) {
  // new Vue().$toast.hide()
  const response = res.data
  if (
    response.status !== '100' &&
    typeof response.errorMessges !== 'undefined' &&
    Object.prototype.toString.call(response.errorMessges) === '[object Array]'
  ) {
    // new Vue().$toast.text(response.errorMessges[0].message.trim())
    return Promise.reject(response)
  }
  return res
}, function (error) {
  // new Vue().$toast.text('网络中断了，请重试')
  return Promise.reject(error)
})

window.axios = instance

// CONCATENATED MODULE: ./src/utils.js
const ua = navigator.userAgent
let utils = {
  version: 0.01,
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isMobile: phone => /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone),
  isCar: car => /(^(浙|闽|粤|京|津|冀|晋|蒙|辽|吉|黑|沪|苏|皖|赣|鲁|豫|鄂|湘|桂|琼|渝|川|贵|云|藏|陕|甘|青|宁|新){1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(car),
  isIdNo: ID => {
    if (typeof ID !== 'string') return false
    var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(ID)) return false
    if (city[ID.substr(0, 2)] === undefined) return false
    if (time >= currentTime || birthday !== newBirthday) return false
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return false
    return true
  },
  isBankNo: num => /^([1-9]{1})(\d{15}|\d{18})$/.test(num),
  isEmail: mail => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(mail),
  isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
  isiPhone: ua.indexOf('iPhone') > -1,
  get: (url, params = {}, method = 'get') => new Promise((resolve, reject) => {
    let req = method === 'get' ? { params: params } : params
    window.axios[method](url, req).then(res => {
      resolve && res && typeof res.data !== 'undefined' && resolve(res.data)
    }, error => {
      reject && reject(error)
    })
  }),
  post: (url, params) => utils.get(url, params, 'post'),
  /**
   * 对日期进行格式化
   * @param date 要格式化的日期
   * @param format 进行格式化的模式字符串
   *     支持的模式字母有：
   *     y:年,
   *     M:年中的月份(1-12),
   *     d:月份中的天(1-31),
   *     H:小时(0-23),
   *     m:分(0-59),
   *     s:秒(0-59),
   *     S:毫秒(0-999),
   *     q:季度(1-4)
   * @return String
   */
  dateformat: (date, format) => {
    if (!date) return

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) // eslint-disable-line
      }
    }

    return format
  },
  getQueryString: (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  }
}

// base64转blob
const dataURLtoBlob = dataurl => {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// base64转file对象
const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const compare = property => {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}

const px2Rem = px => {
  let baseFontSize = 14
  let clientWidth = document.documentElement.clientWidth
  let oneRem = baseFontSize * (clientWidth / 375)
  let rate = (oneRem / baseFontSize).toFixed(3)
  return rate * px
}

const getDateStr = () => {
  let date = new Date()
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
}

/* harmony default export */ var src_utils = (utils);

// CONCATENATED MODULE: ./src/index.js





class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  getName () {
    return this.name
  }
}

(function () {
  let canvas = document.createElement('canvas')
  canvas.width = 350
  canvas.height = 200
  document.body.appendChild(canvas)
  let ctxt = canvas.getContext('2d');
  let img = new Image;
  let coordinates = [];
  let h = 200,
      w = 350;
  for(let i=0; i<200; i++){
      coordinates[i] = [];
  }
  img.src = bg; //图片路径
  img.onload = function(){
      ctxt.drawImage(img, 0, 0);
      let data = ctxt.getImageData(0, 0, 350, 200).data;//读取整张图片的像素。
      let x=0,y=0;
      for(let i =0,len = data.length; i<len;i+=4){
        let red = data[i],//红色色深
        green = data[i+1],//绿色色深
        blue = data[i+2],//蓝色色深
        alpha = data[i+3];//透明度
        //把每个像素点，以二位数组的形式展开
        if(`${red} ${green} ${blue}` === '210 227 199'){
            coordinates[y][x] = 0;
        }else{
            coordinates[y][x] = 1;
        }
        x++;
        if(x >= 350){
            x = 0;
            y++;
        }
    }
    // console.log(coordinates);
    let rst = getCountAndArea();
    // console.log(rst);
    console.log('个数： ' + rst.count);
    for(let i=0; i<rst.sum.length; i++){
        console.log(`第${i+1}个面积为: ${rst.sum[i].area} px`);
    }
  }

  const getCountAndArea = () =>{
      let sum = [];
      let count = 0;
      for(let i = 0; i < h; i++)
      {
        for(let j = 0; j < w; j++)
        {
          //连续1的个数
          if(coordinates[i][j] == 1)
          {
          let buf = 0;
          buf = linkSum(i,j,buf);
          count++;
          sum.push({
              index: count,
              area: buf
          });
          }
        }
      }
      return {
          count,
          sum
      };
  }

  //计算连续的面积和个数
  const linkSum = (i, j, num) => {
      //走过的路就置0
    coordinates[i][j] = 0;
    num++;
    //向上
    if((i+1 < h) && coordinates[i+1][j] == 1){
      num = linkSum(i+1 , j , num);
    }
    //向下
    if((j+1 < w) && coordinates[i][j+1] == 1){
      num = linkSum(i , j+1 , num);
    }
    //向左
    if((i-1 >= 0) && coordinates[i-1][j] == 1){
      num = linkSum(i-1 , j , num);
    }
      //向右
    if((j-1 >= 0) && coordinates[i][j-1] == 1){
        num = linkSum(i , j-1 , num);
    }

    return num;
  }
})();

src_utils.get('/v2/movie/weekly?apikey=0b2bdeda43b5688921839c8ecb20399b')
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

let boy = new Person('Tom', 23)
boy.getName()


/***/ })

},[[28,1,2]]]);
//# sourceMappingURL=main.797626c0.js.map