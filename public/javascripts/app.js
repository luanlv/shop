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
Main.Product = require('./main/_product.msx');

module.exports = Main;
},{"./main/_dashboard.msx":7,"./main/_home.msx":8,"./main/_product.msx":9}],3:[function(require,module,exports){


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
                        {tag: "input", attrs: {type:"text", placeholder:"Nhập từ khóa"}}, 
                        {tag: "input", attrs: {type:"button", value:"Search"}}
                    ]}

                ]}, 
                {tag: "div", attrs: {className:"h-bot"}, children: [
                    {tag: "ul", attrs: {className:"navMenu"}, children: [
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"#"}, children: ["GIỚI THIỆU"]}]}, 
                        {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"/", config:m.route, className:"active"}, children: ["LINH KIỆN"]}]}, 
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
var fn = require('./fn.msx');
var Data = Data | {};

//Data.urls =
//console.log(window.allCategory)

module.exports = Data;


},{"./fn.msx":5}],5:[function(require,module,exports){
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
fn.price = function(price){
    var priceString = price.toString();
    var priceArray = priceString.split( /(?=(?:...)*$)/ );
    return priceArray.join(',');
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

fn.preloadImages = function(srcArray) {
    for (var i = 0, len = srcArray.length; i < len; i++) {
        var img = new Image();
        img.src = srcArray[i];
        img.style.display = 'none';
        document.body.appendChild(img);
    }
}



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
},{"./partials/_left.msx":10,"./partials/_middle.msx":12,"./partials/_right.msx":13}],8:[function(require,module,exports){
var Left = require('./partials/_left.msx');
var Middle = require('./partials/_middle.msx');
var Right = require('./partials/_right.msx');


var Home = {
    controller: function() {
        var ctrl = this;
        //ctrl.slides = m.prop(window.demoSlide);
        ctrl.currentSlide = m.prop({});
        ctrl.products = m.prop([]);
        ctrl.slides = m.prop([]);
        ctrl.current = 0;

        //ctrl.currentSlide(window.demoSlide[0]);

        ctrl.loading = true;
        ctrl.ok = false;

        if(window.demoSlide === undefined || window.demoSlide.length == 0) {
            m.request({method: "GET", url: "/api/getProductInCategory/" + "sub-cate-1"}) .then(function(res){
                if(res.length > 0){
                    ctrl.products(res);
                    ctrl.slides(res.slice(2,6));
                    ctrl.currentSlide(ctrl.slides()[0]);
                    ctrl.maxSlide = ctrl.slides().length;
                    ctrl.ok = true;
                } else {
                    ctrl.ok = false;
                }
                ctrl.loading = false;
                m.redraw();
            });
        } else {
            if(window.demoSlide.length > 0) {
                ctrl.products(window.demoSlide);
                ctrl.slides(window.demoSlide.slice(2, 6));
                ctrl.currentSlide(ctrl.slides()[0]);
                ctrl.maxSlide = ctrl.slides().length;
                ctrl.ok = true;
            } else {
                ctrl.ok = false;
            }
            window.demoSlide = [];
            ctrl.loading = false;
            m.redraw();
        }
        //console.log(window.demoSlide.length)
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
},{"./partials/_left.msx":10,"./partials/_middle.msx":12,"./partials/_right.msx":13}],9:[function(require,module,exports){
var Left = require('./partials/_left.msx');
var Middle = require('./partials/_middle-product.msx');
var Right = require('./partials/_right.msx');


var Product = {
    controller: function() {
        var ctrl = this;
        ctrl.product = m.prop({status: "loading"});
        //console.log(Object.keys(ctrl.product()).length);
        if(window.product === undefined || window.product.length == 0) {
            m.request({method: "GET", url: "/api/getProduct/" + m.route.param("item")}).then(function(res){
                if(res.length > 0){
                    ctrl.product({status: "ok", data: res[0]})
                } else {
                    ctrl.product({status: "error"})
                }
                m.redraw();
            });
        } else {
            ctrl.product({status: "ok", data: window.product[0]});
            window.product = [];
            m.redraw();
        }

    },
    view: function(ctrl) {
        return m('div', [
            Left(ctrl),
            Middle(ctrl),
        ])
    }
};


module.exports = Product;
},{"./partials/_left.msx":10,"./partials/_middle-product.msx":11,"./partials/_right.msx":13}],10:[function(require,module,exports){
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
},{"../../core/data.js":4,"../../core/fn.msx":5}],11:[function(require,module,exports){
var fn = require('../../core/fn.msx');

var Middle =  function(ctrl){
    var status_loading = ctrl.product().status === "loading";
    var status_ok = ctrl.product().status === "ok";
    return (
        {tag: "div", attrs: {className:"productWrap"}, children: [
            status_loading?(
                {tag: "div", attrs: {}, children: ["LOADING !!!"]}
            ):(
                !status_ok?(
                    {tag: "div", attrs: {}, children: ["ERROR !!!"]}
                ):(
                    {tag: "div", attrs: {}, children: [
                        {tag: "div", attrs: {className:"p-top clearfix"}, children: [
                            {tag: "div", attrs: {className:"pt-left"}, children: [
                                {tag: "img", attrs: {src:ctrl.product().data.info.image[0].small, alt:""}}
                            ]}, 
                            {tag: "div", attrs: {className:"pt-right"}, children: [
                                {tag: "h1", attrs: {className:"name"}, children: [ctrl.product().data.core.name]}, 
                                {tag: "div", attrs: {className:"msp"}, children: ["Mã Sản phẩm: ", {tag: "span", attrs: {}, children: [ctrl.product().data.core.code]}]}, 
                                {tag: "div", attrs: {className:"price"}, children: ["Giá: ", {tag: "span", attrs: {}, children: [fn.price(ctrl.product().data.core.price[0].price), " VNĐ"]}]}
                            ]}
                        ]}, 
                        {tag: "div", attrs: {className:"p-bot"}

                        }
                    ]}
                )
            )
        ]}
    )
};

module.exports = Middle;
},{"../../core/fn.msx":5}],12:[function(require,module,exports){
var fn = require('../../core/fn.msx');

var Middle =  function(ctrl){
    return (ctrl.loading?({tag: "div", attrs: {className:"mid"}, children: ["LOADING !!!"]}):(
        !ctrl.ok?(
            {tag: "div", attrs: {className:"mid"}, children: [" ERROR !!!"]}
        ):(
        {tag: "div", attrs: {className:"mid"}, children: [
            {tag: "div", attrs: {className:"slider clearfix"}, children: [

                {tag: "div", attrs: {className:"sliderWr", 
                     config:
                        function(el, isInited){
                            if(!isInited){
                                var preloadedAllImages = false;
                                var onHover = false;
                                var nextSlide = function(){
                                    if(ctrl.current == (ctrl.maxSlide - 1 )){
                                        ctrl.current = 0;
                                    } else {
                                        ctrl.current += 1;
                                    }
                                    ctrl.currentSlide(ctrl.slides()[ctrl.current]);
                                    m.redraw();

                                };

                                var slideOut, slideIn;

                                slideOut = setInterval(function slide(){
                                    if(!preloadedAllImages){
                                        fn.preloadImages([ctrl.slides()[ctrl.current+1].info.image[0].origin]);
                                        if( ctrl.current + 1 === ctrl.maxSlide - 1) preloadedAllImages = true;
                                    }
                                    if(!onHover){
                                        el.classList.add("fadeOutLeft");
                                        el.classList.add("animated");
                                        slideIn = setTimeout(function(){
                                            nextSlide();
                                            var animated = el.querySelectorAll('.animated');
                                            for(var i = 0; i < animated.length; i++){
                                                animated[i].classList.remove("animated");
                                                ["fadeInDown", "fadeInLeft", "fadeInUp"].map(function(cName){
                                                    if(animated[i].classList.contains(cName)){
                                                        animated[i].classList.remove(cName);

                                                        animated[i].offsetWidth = animated[i].offsetWidth;

                                                        animated[i].classList.add(cName);
                                                    }
                                                });
                                                animated[i].classList.add("animated");
                                            }
                                            el.classList.remove("fadeOutLeft");
                                            el.classList.remove("animated");
                                        }, 700)
                                    }
                                }, 3700);

                                //setTimeout(function(){
                                //    el.classList.remove("fadeOutLeft")
                                //    el.classList.remove("animated")
                                //}, 4000)

                                el.parentNode.addEventListener('mouseover', function(){
                                    onHover = true;
                                });
                                el.parentNode.addEventListener('mouseleave', function(){
                                    onHover = false;

                                });
                            }
                        }
                     
                }, children: [
                    {tag: "div", attrs: {}, children: [
                        {tag: "div", attrs: {className:"slider-img fadeInLeft animated"}, children: [
                            {tag: "img", attrs: {src:ctrl.currentSlide().info.image[0].origin, alt:""}}
                        ]}, 
                        {tag: "div", attrs: {className:"slider-text"}, children: [
                            {tag: "div", attrs: {className:"slider-header fadeInDown animated"}, children: [
                                ctrl.currentSlide().core.name
                            ]}, 
                            {tag: "div", attrs: {className:"slider-info fadeInUp animated"}, children: [
                                m.trust(ctrl.currentSlide().extra.note)
                            ]}
                        ]}
                    ]}
                ]}

            ]}, 
            {tag: "div", attrs: {className:"productWr"}, children: [
                {tag: "h3", attrs: {}, children: ["SẢN PHẨM PHẦN CỨNG"]}, 
                (ctrl.products().length<1)?(
                    {tag: "div", attrs: {className:"listProduct"}, children: [
                        "LOADING !!!"
                    ]}
                ):(
                    {tag: "div", attrs: {className:"listProduct clearfix"}, children: [
                        ctrl.products().map(function(item){
                            return (
                                {tag: "a", attrs: {href:("/p" + window.urls[item.sku.slug] + "/" + item.slug), config:m.route}, children: [

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
                                                {tag: "div", attrs: {className:"price-item"}, children: [fn.price(item.core.price[0].price), " Đ"]}
                                            ]}
                                        ]}, 
                                        {tag: "div", attrs: {className:"side-info"}, children: [
                                            m.trust(item.extra.note)
                                        ]}
                                    ]}
                                ]}
                            )
                        })
                    ]}
                )
            ]}, 

            {tag: "div", attrs: {className:"productWr"}, children: [
                {tag: "h3", attrs: {}, children: ["MODULE"]}, 
                (ctrl.products().length<1)?(
                    {tag: "div", attrs: {className:"listProduct"}, children: [
                        "LOADING !!!"
                    ]}
                ):(
                    {tag: "div", attrs: {className:"listProduct clearfix"}, children: [
                        ctrl.products().map(function(item){
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
                                            {tag: "div", attrs: {className:"price-item"}, children: [fn.price(item.core.price[0].price), " Đ"]}
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
            ]}

        ]}
        )
        )
    )
};

module.exports = Middle;
},{"../../core/fn.msx":5}],13:[function(require,module,exports){
var fn = require('../../core/fn.msx');

var Right = function(ctrl){
    return (
        {tag: "div", attrs: {className:"right"}, children: [
            {tag: "div", attrs: {className:"notify"}, children: [
                {tag: "div", attrs: {className:"notify-header"}, children: [
                    "THÔNG BÁO"
                ]}, 
                {tag: "div", attrs: {className:"notify-body"}, children: [
                    "- Ship nội thành: 10,000Đ -", 
                    {tag: "br", attrs: {}}, 
                    {tag: "br", attrs: {}}, 
                    "Miễn phí tiền ship với đơn hàng trên 200,000Đ (HN), trên 500,000Đ (TQ)"
                ]}
            ]}, 
            {tag: "div", attrs: {className:"saleWr"}, children: [
                {tag: "h3", attrs: {}, children: ["SẢN PHẨM KHUYẾN MÃI"]}, 
                (ctrl.products().length<1)?(
                    {tag: "div", attrs: {}, children: ["LOADING !!!"]}
                ):(
                    {tag: "div", attrs: {className:"listSale"}, children: [
                        ctrl.products().map(function(item){
                            return (
                                {tag: "div", attrs: {className:"saleWr clearfix"}, children: [
                                    {tag: "div", attrs: {className:"sale-info"}, children: [
                                        {tag: "div", attrs: {className:"sale-name"}, children: [item.core.name]}, 
                                        {tag: "div", attrs: {className:"sale-price"}, children: [
                                            fn.price((item.extra.saleOff2>0)?(item.core.price[0].price -item.extra.saleOff2):(
                                                (100 - item.extra.saleOff1)* (item.core.price[0].price) /100
                                            )), " Đ"
                                        ]}, 
                                        {tag: "div", attrs: {className:"old-price"}, children: [ fn.price(item.core.price[0].price), " Đ"]}
                                    ]}, 
                                    {tag: "div", attrs: {className:"sale-img"}, children: [
                                        {tag: "img", attrs: {src:item.info.image[0].thumb, alt:""}}
                                    ]}
                                ]}

                            )
                        })
                    ]}
                )
            ]}
        ]}
    )
};

module.exports = Right;

},{"../../core/fn.msx":5}]},{},[6])