import React from 'react'
import {  
  Platform,  
  Dimensions,
  View
} from 'react-native';  

// iPhoneX  
const X_WIDTH = 375;  
const X_HEIGHT = 812;  

// screen  
const SCREEN_WIDTH = Dimensions.get('window').width;  
const SCREEN_HEIGHT = Dimensions.get('window').height;


 export function  isIphoneX() {
  return (  
    Platform.OS === 'ios' &&   
    ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||   
    (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))  
 )  
}

export function getLabelOfRooms(data){
  const arr = data.map(room=>room.houseTypex)
  return arrUnquie(arr)
}

// 数组去重
export function arrUnquie(arr) {
  return [...new Set(arr)]
}

// num to  arr
 export function numToArr(num) {
   let arr = []
   for(let i=0;i<num;i++) {
      arr=[...arr,1]
   }
   return arr
 }

 // date format
 export function dateFormat(dateIsc) {
   const date = new Date(dateIsc)
   const year = date.getFullYear(date)
   let month = date.getMonth(date)
   month = month>9?month+1:'0'+(month+1)
   let day = date.getDate(date)
   day = day>9?day:'0'+(day)
   return year+'-'+month+'-'+day
 }
// 字母排序
 export function pySegSort(arr1) {
  var letters = "*abcdefghjklmnopqrstwxyz".split('');
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  let segs = []
  var curr;
  letters.forEach(function(item,i){
      curr = {letter: item, data:[]};
      arr1.forEach(function(item2){
          if((!zh[i-1] || zh[i-1].localeCompare(item2.name,'zh') <= 0) && item2.name.localeCompare(zh[i],'zh') == -1) {
              curr.data.push(item2);
          }
      });
      if(curr.data.length) {
          segs.push(curr)
          curr.data.sort(function(a,b){
              return a.name.localeCompare(b.name,'zh');
          });
      }
  });
  return segs;
}
// encode64
export function encode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;
      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);
      return output;
}

// 判断低级象限
export function quadrant(x,x0,y,y0){
  if (x<=x0 && y<=y0) {
    return 3
  }
  if (x<x0 && y>y0) {
    return 4
  }
  if(x>x0 && y<y0) {
    return 2
  }
  if(x>=x0 && y>=y0) {
    return 1
  }
}

// 返回房子押金方式
export function TransformDepositType(num) {
  switch (num) {
    case 1:
      return '押一付一'
    case 2:
     return '押一付三'
    case 3:
      return '押一付六' 
    case 4:
     return '年付'
    default:
      return '押一付三'
  }
}
export function TransfromDecorate(num) {
  switch (num) {
    case 0:
      return '毛坯'
    case 1:
     return '简装'
    case 2:
      return '中等装修' 
    case 3:
     return '精装修'
    case 5:
      return '豪华装修'
    default:
      return '简装'
  }
}
export function TransformOrientation(num) {
  switch (num) {
    case 1:
      return '朝东'
    case 2:
     return '朝西'
    case 3:
      return '朝北' 
    case 5:
     return '朝南'
    default:
      return '朝南'
  }
}
export function TransformStatus(num) {
  switch (num) {
    case 1:
      return '待付款'
    case 2:
     return '待审核'
    case 3:
      return '审核通过' 
    case 5:
     return '审核不通过'
    case 6:
    return '已安装(待测试)'
    case 7:
     return '测试通过(待发布)'
    case 8:
      return '测试不通过' 
    case 9:
     return '已发布'
     case 10:
      return '已出租'
    case 11:
     return '待下架'
    case 12:
      return '下架' 
    case 5:
     return '审核不通过'
    default:
      return '’'
  }
}

export function auditFailStatus(num) {
  switch (num) {
    case '1':
      return '缺少图片'
    case '2':
     return '详细地址'
    case '3':
      return '身份信息' 
    case '5':
     return '房屋面积'
    case '6':
      return '租金' 
    case '7':
     return '房源简介'
    default:
      return ''
  }
}

export function telephoneFormat(num) {
  if(num) {
    return num.slice(0,3)+'-'+num.slice(3,7)+'-'+num.slice(7)
  }
}

export function telephoneHidden(num) {
  if(num) {
    return num.slice(0,3)+'****'+num.slice(7)
  }
}
