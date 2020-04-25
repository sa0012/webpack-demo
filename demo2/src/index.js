import '@/assets/style/reset.scss'
import banner from '@/assets/images/spike_banner.png'
import bg from '@/assets/images/bg.png'
import '@/axios'
import $ from '@/utils'
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

$.get('/v2/movie/weekly?apikey=0b2bdeda43b5688921839c8ecb20399b')
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

let boy = new Person('Tom', 23)
boy.getName()
