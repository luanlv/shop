(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Footer = Footer || {};

Footer.controller = function(){

};

Footer.view = function(ctrl){
    return (
        {tag: "div", attrs: {}, children: [
            "FOOTER"
        ]}
    )
}
},{}],2:[function(require,module,exports){

var Main = Main || {};

Main.Home = require('./main/_home.msx');
Main.Dashboard = require('./main/_dashboard.msx');

module.exports = Main;
},{"./main/_dashboard.msx":7,"./main/_home.msx":8}],3:[function(require,module,exports){


var Nav = {};
Nav.controller = function(){
    //setInterval(function(){m.redraw()}, 2000)
};
Nav.view = function(){
    //console.log("render view");
    return (
        {tag: "div", attrs: {className:"h-container"}, children: [
            {tag: "div", attrs: {className:"h-left"}}, 
            {tag: "div", attrs: {className:"h-right"}, children: [
                {tag: "div", attrs: {className:"h-top"}, children: [
                    {tag: "div", attrs: {className:"search"}, children: [
                        {tag: "input", attrs: {type:"text"}}
                    ]}

                ]}, 
                {tag: "div", attrs: {className:"h-bot"}, children: [
                    {tag: "ul", attrs: {className:"navMenu"}, children: [
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["GIỚI THIỆU"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#", className:"active"}, children: ["LINH KIỆN"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["SẢN PHẨM"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["NGHIÊN CỨU"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["DỊCH VỤ"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["LIÊN HỆ"]}]}
                    ]}
                ]}
            ]}
        ]}
    )
};


module.exports = Nav;
},{}],4:[function(require,module,exports){
var data = data | {};




module.exports = data;


},{}],5:[function(require,module,exports){
var fn = fn || {};

fn.checkMenu = function(link){
    var partRoute = m.route().split('/');
    var result = true;
    var partLink = link.replace('https://', '').replace('http://', '').split('/');
    for(var i = 1; i < partLink.length; i++){
        if(partLink[i] != partRoute[i]){
            result = false;
        }
    }
    return result;
};

fn.createMenu = function(menuJson, level){
    return m('ul.level' + level, [
        menuJson.map(function(child){
            return m('li' + ((child.children != undefined)?'.has-sub':'.no-sub') + (fn.checkMenu(child.http)?'.active':'') +  ((fn.checkMenu(child.http) || (level === 1))?'.open':'') + (( level === 1 )?'.topMenu':''),  [
                m('.link-menu-wr', [
                    m('span', {
                        onclick: function(event){
                            var el = event.target.parentNode.parentNode;

                            var flag = el.classList.contains('open');

                            var listContainer = document.querySelectorAll('.level2 .open');

                            for(var i = 0; i < listContainer.length; i++){
                                listContainer[i].classList.remove('open')
                            }

                            if (el.classList) {
                                if(!el.classList.contains('open') && !flag) {
                                    el.classList.add('open');
                                }
                            } else {
                                var classes = el.className.split(' ');
                                var existingIndex = classes.indexOf('open');

                                if (existingIndex >= 0)
                                    classes.splice(existingIndex, 1);
                                else
                                    classes.push('open');
                                el.className = classes.join(' ');
                            }
                        }
                    } ,''),
                    m('a', {href: child.http, config: m.route} ,m('span', child.title))
                ]),
                (child.children != undefined)?fn.createMenu(child.children, level + 1):''
            ])
        })
    ])
};


module.exports = fn;

},{}],6:[function(require,module,exports){
"use strict";


m.route.mode = "pathname";

var Nav = require('./_nav.msx');
window.Main = require('./_main.msx');
window.Footer = require('./_footer.msx');

m.mount(document.querySelector('#header'), Nav);




//re-route to dashboard
//m.route("/dashboard"); // logs "unloading home component"








},{"./_footer.msx":1,"./_main.msx":2,"./_nav.msx":3}],7:[function(require,module,exports){
var Left = require('./partials/_left.msx');
var Middle = require('./partials/_middle.msx');
var Right = require('./partials/_right.msx');


var Dashboard = {
    controller: function() {
        var ctrl = this;
        ctrl.foo = 'foo';
        ctrl.data = m.prop([]);
        //m.request({method: "GET", url: "/data2.json"}).then(function(res){
        //  ctrl.data(res.data)
        //});

        ctrl.data([
            {"value": 5}
        ])
    },
    view: function(ctrl) {
        return m('div', [
            Left(ctrl),
            Middle(ctrl),
            Right(ctrl),
        ])
    }
};

module.exports = Dashboard;
},{"./partials/_left.msx":9,"./partials/_middle.msx":10,"./partials/_right.msx":11}],8:[function(require,module,exports){
var Left = require('./partials/_left.msx');
var Middle = require('./partials/_middle.msx');
var Right = require('./partials/_right.msx');


var Home = {
    controller: function() {
        var ctrl = this;
        //ctrl.data = m.prop([]);
        //m.request({method: "GET", url: "/data1.json"}).then(function(res){
        //  ctrl.data(res.data)
        //});
    },
    view: function(ctrl) {
        return m('div', [
            Left(ctrl),
            Middle(ctrl),
            Right(ctrl),
        ])
    }
};


module.exports = Home;
},{"./partials/_left.msx":9,"./partials/_middle.msx":10,"./partials/_right.msx":11}],9:[function(require,module,exports){
var fn = require('../../core/fn.msx');
var data = require('../../core/data.js');

var Left = function(ctrl){
    url = 'http://' + document.domain + ':9000' + m.route();
    return m('.left', {
        config: function(){

        }
    }, m('#sideMenu', fn.createMenu(window.menu, 1)))
};


var menu = [
    {
        "title" : "SẢN PHẨM PHẦN CỨNG",
        "http" : "http://localhost:9000/",
        "children" : [
            {
                "title" : "cBUS",
                "http" : "http://localhost:9000/z",
                "children": [
                    {
                        "title" : "OpAmp & Comparator",
                        "http" : "http://localhost:9000/z/1"
                    },
                    {
                        "title" : "Instrumentation Amplifier",
                        "http" : "http://localhost:9000/z/2"
                    },
                    {
                        "title" : "OpAmp",
                        "http" : "http://localhost:9000/z/3"
                    }, {
                        "title" : "Cuộn cảm",
                        "http" : "http://localhost:9000/z/4"
                    }
                ]
            },
            {
                "title" : "Development Board",
                "http" : "http://localhost:9000/2"
            }
        ]
    },
    {
        "title" : "MODULE",
        "http" : "http://localhost:9000/dashboard",
        "children" : [
            {
                "title" : "Interface Converter",
                "http" : "http://localhost:9000/dashboard/1",
                "children" : [
                    {
                        "title" : "SD / MicroSD Card",
                        "http" : "http://localhost:9000/dashboard/1/1"
                    },
                    {
                        "title" : "Bluetooth",
                        "http" : "http://localhost:9000/dashboard/1/2"
                    },
                    {
                        "title" : "Bluetooth  2",
                        "http" : "http://localhost:9000/dashboard/1/3"
                    }
                ]
            },

            {
                "title" : "Motor Driver",
                "http" : "http://localhost:9000/dashboard/2",
                "children" : [
                    {
                        "title" : "DC Motor",
                        "http" : "http://localhost:9000/dashboard/2/1"
                    },   {
                        "title" : "Audio/Codec",
                        "http" : "http://localhost:9000/dashboard/2/2"
                    },
                    {
                        "title" : "Realtime Clock",
                        "http" : "http://localhost:9000/dashboard/2/3"
                    }
                ]
            },
            {
                "title": "Wireless",
                "http" : "http://localhost:9000/dashboard/3"
            }
        ]
    },

    {
        "title" : "VI ĐIỀU KHIỂN",
        "http" : "http://localhost:9000/product",
        "children" : [
            {
                "title" : "Atmel",
                "http" : "http://localhost:9000/product/1",
                "children" : [
                    {
                        "title" : "Microchip",
                        "http" : "http://localhost:9000/product/1/1"
                    },
                    {
                        "title" : "STMicroelectronics",
                        "http" : "http://localhost:9000/product/1/2"
                    },
                    {
                        "title" : "Nuvoton",
                        "http" : "http://localhost:9000/product/1/3"
                    },
                    {
                        "title" : "STM32 ",
                        "http" : "http://localhost:9000/product/1/4"
                    }
                ]
            },

            {
                "title" : "Ánh sáng / Hồng ngoại",
                "http" : "http://localhost:9000/product/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/product/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/product/2/2"
                    },
                    {
                        "title" : "Con quay hồi chuyển",
                        "http" : "http://localhost:9000/product/2/3"
                    }
                ]
            },
            ,
            {
                "title": "Power Supply",
                "http" : "http://localhost:9000/product/3"
            }
        ]
    },
    {
        "title" : "CẢM BIẾN",
        "http" : "http://localhost:9000/cambien",
        "children" : [
            {
                "title" : "Atmel",
                "http" : "http://localhost:9000/cambien/1",
                "children" : [
                    {
                        "title" : "Microchip",
                        "http" : "http://localhost:9000/cambien/1/1"
                    },
                    {
                        "title" : "STMicroelectronics",
                        "http" : "http://localhost:9000/cambien/1/2"
                    },
                    {
                        "title" : "Nuvoton",
                        "http" : "http://localhost:9000/cambien/1/3"
                    },
                    {
                        "title" : "STM32 ",
                        "http" : "http://localhost:9000/cambien/1/4"
                    }
                ]
            },

            {
                "title" : "Ánh sáng",
                "http" : "http://localhost:9000/hongngoai/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/hongngoai/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/hongngoai/2/2"
                    }
                ]
            },
            {
                "title" : "Hồng ngoại",
                "http" : "http://localhost:9000/hongngoai/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/hongngoai/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/hongngoai/2/2"
                    }
                ]
            }
        ]
    },
    {
        "title" : "IC",
        "http" : "http://localhost:9000/ic",
        "children" : [
            {
                "title" : "Atmel",
                "http" : "http://localhost:9000/ic/1",
                "children" : [
                    {
                        "title" : "Microchip",
                        "http" : "http://localhost:9000/ic/1/1"
                    },
                    {
                        "title" : "STMicroelectronics",
                        "http" : "http://localhost:9000/ic/1/2"
                    },
                    {
                        "title" : "Nuvoton",
                        "http" : "http://localhost:9000/ic/1/3"
                    },
                    {
                        "title" : "STM32 ",
                        "http" : "http://localhost:9000/ic/1/4"
                    }
                ]
            },

            {
                "title" : "Ánh sáng / Hồng ngoại",
                "http" : "http://localhost:9000/anhsang/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/anhsang/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/anhsang/2/2"
                    },
                    {
                        "title" : "Con quay hồi chuyển",
                        "http" : "http://localhost:9000/anhsang/2/3"
                    }
                ]
            }
        ]
    },
    {
        "title" : "LINH KIỆN CƠ BẢN",
        "http" : "http://localhost:9000/linhkien",
        "children" : [
            {
                "title" : "Atmel",
                "http" : "http://localhost:9000/linhkien/1",
                "children" : [
                    {
                        "title" : "Microchip",
                        "http" : "http://localhost:9000/linhkien/1/1"
                    },
                    {
                        "title" : "STMicroelectronics",
                        "http" : "http://localhost:9000/linhkien/1/2"
                    },
                    {
                        "title" : "Nuvoton",
                        "http" : "http://localhost:9000/linhkien/1/3"
                    },
                    {
                        "title" : "STM32 ",
                        "http" : "http://localhost:9000/linhkien/1/4"
                    }
                ]
            },

            {
                "title" : "Ánh sáng / Hồng ngoại",
                "http" : "http://localhost:9000/linhkien/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/linhkien/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/linhkien/2/2"
                    },
                    {
                        "title" : "Con quay hồi chuyển",
                        "http" : "http://localhost:9000/linhkien/2/3"
                    }
                ]
            }
        ]
    },
    {
        "title" : "PHỤ KIỆN & DỤNG CỤ",
        "http" : "http://localhost:9000/phukien",
        "children" : [
            {
                "title" : "Atmel",
                "http" : "http://localhost:9000/phukien/1",
                "children" : [
                    {
                        "title" : "Microchip",
                        "http" : "http://localhost:9000/phukien/1/1"
                    },
                    {
                        "title" : "STMicroelectronics",
                        "http" : "http://localhost:9000/phukien/1/2"
                    },
                    {
                        "title" : "Nuvoton",
                        "http" : "http://localhost:9000/phukien/1/3"
                    },
                    {
                        "title" : "STM32 ",
                        "http" : "http://localhost:9000/phukien/1/4"
                    }
                ]
            },

            {
                "title" : "Ánh sáng / Hồng ngoại",
                "http" : "http://localhost:9000/phukien/2",
                "children" : [
                    {
                        "title" : "Gia tốc",
                        "http" : "http://localhost:9000/phukien/2/1"
                    },   {
                        "title" : "PIR",
                        "http" : "http://localhost:9000/phukien/2/2"
                    },
                    {
                        "title" : "Con quay hồi chuyển",
                        "http" : "http://localhost:9000/phukien/2/3"
                    }
                ]
            }
        ]
    }

];


module.exports = Left;
},{"../../core/data.js":4,"../../core/fn.msx":5}],10:[function(require,module,exports){
var Middle =  function(ctrl){
    return (
    {tag: "div", attrs: {className:"mid"}, children: [
        {tag: "div", attrs: {className:"slider"}, children: ["SLIDER"]}, 
        {tag: "div", attrs: {className:"productWr"}, children: [
            {tag: "h3", attrs: {}, children: ["SẢN PHẨM PHẦN CỨNG"]}, 
            (window.listProduct1.length<1)?(
                {tag: "div", attrs: {className:"listProduct"}, children: [
                    "LOADING !!!"
                ]}
            ):(
                {tag: "div", attrs: {className:"listProduct clearfix"}, children: [
                    window.listProduct1.map(function(item){
                        return (
                            {tag: "div", attrs: {className:"itemWr"}, children: [
                                {tag: "div", attrs: {className:"img-item"}, children: [
                                    {tag: "img", attrs: {src:item.info.image[0].small, alt:""}}
                                ]}, 

                                {tag: "div", attrs: {className:"info-item"}, children: [
                                    {tag: "div", attrs: {className:"name-item"}, children: [
                                        item.core.name
                                    ]}, 
                                    {tag: "div", attrs: {className:"info-extra-item"}, children: [
                                        {tag: "span", attrs: {}, children: ["Bán lẻ:"]}, 
                                        {tag: "div", attrs: {className:"price-item"}, children: [item.core.price[0].price, " Đ"]}
                                    ]}
                                ]}, 
                                {tag: "div", attrs: {className:"side-info"}, children: [
                                    m.trust(item.extra.note)
                                ]}
                            ]}

                        )
                    })
                ]}
            )
        ]}, 

        {tag: "div", attrs: {className:"productWr"}, children: [
            {tag: "h3", attrs: {}, children: ["MODULE"]}, 
            {tag: "div", attrs: {className:"listProduct"}
            }
        ]}

    ]}
    )
};

module.exports = Middle;
},{}],11:[function(require,module,exports){
var Right = function(ctrl){
    return (
        {tag: "div", attrs: {className:"right"}, children: [
            {tag: "div", attrs: {className:"notify"}}, 
            {tag: "div", attrs: {className:"saleWr"}, children: [
                {tag: "h3", attrs: {}, children: ["SẢN PHẨM KHUYẾN MÃI"]}, 
                {tag: "div", attrs: {className:"listSale"}}
            ]}
        ]}
    )
};

module.exports = Right;

},{}]},{},[6])