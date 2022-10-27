import elementPlusIcon from '../assets/templateIcons/element-plus.svg'
import vueIcon from '../assets/templateIcons/vue.png'
import reactIcon from '../assets/templateIcons/react.svg'
import elementIcon from '../assets/templateIcons/element.svg'
import echartsIcon from '../assets/templateIcons/echarts.png'
import openlayersIcon from '../assets/templateIcons/openlayers.png'
import g2Icon from '../assets/templateIcons/g2.png'
import angularIcon from '../assets/templateIcons/angular.png'
import vantIcon from '../assets/templateIcons/vant.png'
import leafletIcon from '../assets/templateIcons/leaflet.png'
import konvaIcon from '../assets/templateIcons/konva.png'
import es6Icon from '../assets/templateIcons/es6.webp'
import { base } from '@/config'

/*
const = {
    name: '',
    icon: '',
    code: {
        HTML: {
            language: 'html',
            content: ``,
            resources: []
        },
        CSS: {
            language: 'css',
            content: '',
            resources: []
        },
        JS: {
            language: 'javascript',
            content: ``,
            resources: [{
                name: '',
                url: ''
            }]
        },
        VUE: {
            language: 'vue2',
            content: ``,
            resources: []
        }
    },
}
*/

const es6Module = {
  name: '使用ES6模块语法',
  icon: es6Icon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="app">
{{ message }}
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `import Vue from 'vue'
import moment from 'moment'
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello ' + moment().format('YYYY')
    }
})`,
      resources: [],
      importMap: `
{
    "imports": {
        "vue": "./lib/vue@2.7.10.esm.browser.js"
    }
}
            `
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const vue3SFC = {
  name: 'Vue 3单文件',
  isVueSFC: true,
  icon: vueIcon,
  code: {
    HTML: {
      language: 'html',
      content: ``,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: ``,
      resources: [],
      importMap: `
{
    "imports": {
        "vue": "./lib/vue@3.2.37.esm-browser.js"
    }
}
            `
    },
    VUE: {
      language: 'vue3',
      content: `<template>
    <h1>{{ msg }}</h1>
    <input v-model="msg">
</template>

<script setup>
import { ref, createApp } from 'vue'
import moment from 'moment'
// 导出createApp是必须的
const msg = ref('Hello World!' + moment().format('YYYY'))
</script>

<style lang="less">
h1 {
    color: red;
}
</style>  
            `,
      resources: []
    }
  }
}

const vue2SFC_ESM = {
  name: 'Vue 2单文件 ESM版',
  isVueSFC: true,
  icon: vueIcon,
  code: {
    HTML: {
      language: 'html',
      content: ``,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: ``,
      resources: [],
      importMap: `
{
    "imports": {
        "vue": "./lib/vue@2.7.10.esm.browser.js"
    }
}
            `
    },
    VUE: {
      language: 'vue2',
      content: `
<template>
    <div>
        <div class="example">{{ msg }}</div>
        <input v-model="msg">
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default {
    data () {
        return {
            msg: 'Hello world!' + moment().format('YYYY')
        }
    }
}
</script>

<style>
.example {
    color: red;
}
</style>  
            `,
      resources: []
    }
  }
}

const vue2SFC = {
  name: 'Vue 2单文件',
  isVueSFC: true,
  icon: vueIcon,
  code: {
    HTML: {
      language: 'html',
      content: ``,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: ``,
      resources: [
        {
          name: 'Vue 2',
          url: base + 'lib/vue@2.6.14.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: `
<template>
    <div>
        <div class="example">{{ msg }}</div>
        <input v-model="msg">
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello world!'
        }
    }
}
</script>

<style>
.example {
    color: red;
}
</style>  
            `,
      resources: []
    }
  }
}

const vue3 = {
  name: 'Vue 3',
  icon: vueIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="hello-vue" class="demo">
{{ message }}
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: `.demo {
font-family: sans-serif;
border: 1px solid #eee;
border-radius: 2px;
padding: 20px 30px;
margin-top: 1em;
margin-bottom: 40px;
user-select: none;
overflow-x: auto;
}`,
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `const HelloVueApp = {
data() {
    return {
    message: 'Hello Vue!!'
    }
}
}

Vue.createApp(HelloVueApp).mount('#hello-vue')`,
      resources: [
        {
          name: 'Vue 3',
          url: base + 'lib/vue3.2.0-beta.7.global.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const vue2 = {
  name: 'Vue 2',
  icon: vueIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="app">
{{ message }}
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `var app = new Vue({
el: '#app',
data: {
    message: 'Hello Vue!'
}
})`,
      resources: [
        {
          name: 'Vue 2',
          url: base + 'lib/vue@2.6.14.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const react = {
  name: 'React',
  icon: reactIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="root"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'babel',
      content: `ReactDOM.render(
<h1>Hello, world!</h1>,
document.getElementById('root')
);`,
      resources: [
        {
          name: 'React',
          url: base + 'lib/react@18.2.0.js'
        },
        {
          name: 'react-dom',
          url: base + 'lib/react-dom@18.2.0.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const elementPlus = {
  name: 'element-plus',
  icon: elementPlusIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="app">
<el-button>{{ message }}</el-button>
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: [
        {
          name: 'element-plus',
          url: base + 'lib/element-plus@2.2.6.css'
        }
      ]
    },
    JS: {
      language: 'javascript',
      content: `const App = {
data() {
    return {
    message: "Hello Element Plus",
    };
},
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");`,
      resources: [
        {
          name: 'Vue 3',
          url: base + 'lib/vue3.2.0-beta.7.global.js'
        },
        {
          name: 'element-plus',
          url: base + 'lib/element-plus@.2.26.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const elementUi = {
  name: 'element-ui',
  icon: elementIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="app">
<el-button @click="visible = true">按钮</el-button>
<el-dialog :visible.sync="visible" title="Hello world">
    <p>欢迎使用 Element</p>
</el-dialog>
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: [
        {
          name: 'element-ui',
          url: base + 'lib/element-ui@2.15.9.css'
        }
      ]
    },
    JS: {
      language: 'javascript',
      content: `new Vue({
el: '#app',
data: function() {
    return { visible: false }
}
})`,
      resources: [
        {
          name: 'Vue 2',
          url: base + 'lib/vue@2.6.14.js'
        },
        {
          name: 'element-ui',
          url: base + 'lib/element-ui@2.15.9.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const openLayers = {
  name: 'OpenLayers',
  icon: openlayersIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="map" class="map"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: `.map {
height: 400px;
width: 100%;
}`,
      resources: [
        {
          name: 'OpenLayers',
          url: base + 'lib/ol@6.5.0.css'
        }
      ]
    },
    JS: {
      language: 'javascript',
      content: `var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});`,
      resources: [
        {
          name: 'OpenLayers',
          url: base + 'lib/ol@6.5.0.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const eCharts = {
  name: 'ECharts',
  icon: echartsIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:400px;"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
title: {
    text: 'ECharts 入门示例'
},
tooltip: {},
legend: {
    data:['销量']
},
xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
},
yAxis: {},
series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
}]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);`,
      resources: [
        {
          name: 'ECharts',
          url: base + 'lib/echarts@5.1.0.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const g2 = {
  name: 'G2',
  icon: g2Icon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="container"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `const data = [
    { type: '未知', value: 654, percent: 0.02 },
    { type: '17 岁以下', value: 654, percent: 0.02 },
    { type: '18-24 岁', value: 4400, percent: 0.2 },
    { type: '25-29 岁', value: 5300, percent: 0.24 },
    { type: '30-39 岁', value: 6200, percent: 0.28 },
    { type: '40-49 岁', value: 3300, percent: 0.14 },
    { type: '50 岁以上', value: 1500, percent: 0.06 },
];

const chart = new G2.Chart({
    container: 'container',
    autoFit: true,
    height: 500,
    padding: [50, 20, 50, 20],
    });
    chart.data(data);
    chart.scale('value', {
    alias: '销售额(万)',
});

chart.axis('type', {
    tickLine: {
        alignTick: false,
    },
});
chart.axis('value', false);

chart.tooltip({
    showMarkers: false, 
});
chart.interval().position('type*value');
chart.interaction('element-active');

// 添加文本标注
data.forEach((item) => {
    chart
        .annotation()
        .text({
        position: [item.type, item.value],
        content: item.value,
        style: {
            textAlign: 'center',
        },
        offsetY: -30,
        })
        .text({
        position: [item.type, item.value],
        content: (item.percent * 100).toFixed(0) + '%',
        style: {
            textAlign: 'center',
        },
        offsetY: -12,
        });
});
chart.render();`,
      resources: [
        {
          name: 'g2',
          url: base + 'lib/g2@4.1.16.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const angular = {
  name: 'Angular 1.x',
  icon: angularIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div ng-app="">
    <p>名字 : <input type="text" ng-model="name"></p>
    <h1>Hello {{name}}</h1>
    <p ng-bind="name"></p>
</div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: []
    },
    JS: {
      language: 'javascript',
      content: ``,
      resources: [
        {
          name: 'angular',
          url: base + 'lib/angular@1.4.6.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const leaflet = {
  name: 'Leaflet',
  icon: leafletIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="mapid"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '#mapid { height: 180px; }',
      resources: [
        {
          name: 'leaflet',
          url: base + 'lib/leaflet@1.7.1.css'
        }
      ]
    },
    JS: {
      language: 'javascript',
      content: `const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
}).addTo(mymap);`,
      resources: [
        {
          name: 'leaflet',
          url: base + 'lib/leaflet@1.7.1.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const vant = {
  name: 'Vant',
  icon: vantIcon,
  code: {
    HTML: {
      language: 'html',
      content: `
<div id="app"></div>            
            `,
      resources: []
    },
    CSS: {
      language: 'css',
      content: '',
      resources: [
        {
          name: 'vant',
          url: base + 'lib/vant@2.12.css'
        }
      ]
    },
    JS: {
      language: 'javascript',
      content: `// 在 #app 标签下渲染一个按钮组件
new Vue({
    el: '#app',
    template: '<van-button>按钮</van-button>',
});

// 调用函数组件，弹出一个 Toast
vant.Toast('提示');

// 通过 CDN 引入时不会自动注册 Lazyload 组件
// 可以通过下面的方式手动注册
Vue.use(vant.Lazyload);`,
      resources: [
        {
          name: 'vue',
          url: base + 'lib/vue@2.6.14.js'
        },
        {
          name: 'vant',
          url: base + 'lib/vant@2.12.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

const konva = {
  name: 'Konva',
  icon: konvaIcon,
  code: {
    HTML: {
      language: 'html',
      content: `<div id="container"></div>`,
      resources: []
    },
    CSS: {
      language: 'css',
      content: `.container {
    width: 500px;
    height: 500px;
}`,
      resources: []
    },
    JS: {
      language: 'javascript',
      content: `// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 500,
    height: 500
});

// then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();`,
      resources: [
        {
          name: 'konva',
          url: base + 'lib/konva@7.0.3.js'
        }
      ]
    },
    VUE: {
      language: 'vue2',
      content: ``,
      resources: []
    }
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-05-14 10:47:23
 * @Desc: 模板列表
 */
const templateList = [
  es6Module,
  vue3SFC,
  vue2SFC_ESM,
  vue2SFC,
  vue3,
  vue2,
  react,
  elementPlus,
  elementUi,
  openLayers,
  eCharts,
  g2,
  angular,
  vant,
  leaflet,
  konva
]
const templateMap = {
  es6Module,
  vue3SFC,
  vue2SFC_ESM,
  vue2SFC,
  vue3,
  vue2,
  react,
  elementPlus,
  elementUi,
  openLayers,
  eCharts,
  g2,
  angular,
  vant,
  leaflet,
  konva
}

export const getTemplate = name => {
  return templateMap[name]
}

export default templateList
