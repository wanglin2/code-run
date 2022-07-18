/** 
    此文件修改完后打包时会被编译成es5语法，并输出到./compile.js，所以你不应该直接修改./compile.js文件，你也可以手动运行`npm run buildConsole`来编译
 */
(function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-05-12 18:22:12 
   * @Desc: 错误监听 
   */
  window.onerror = function (message, source, lineno, colno, error) {
    errorRun();
    window.parent.postMessage({
      type: 'console',
      method: 'string',
      data: [message, source, lineno, colno, error].map(function (item) {
        return handleData(item);
      })
    });
  };

  window.addEventListener('unhandledrejection', function (err) {
    errorRun();
    window.parent.postMessage({
      type: 'console',
      method: 'string',
      data: [handleData(err.reason.stack)]
    });
  });
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2022-07-18 17:57:27 
   * @Desc: 发送运行出错的通知 
   */

  var errorRun = function errorRun() {
    window.parent.postMessage({
      type: 'errorRun'
    });
  };
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-05-07 20:22:41 
   * @Desc: 判断类型 
   */


  var type = function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  };
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-05-08 09:33:40 
   * @Desc: 格式化数据 
   * data:数据、hasKey：是否是作为一个key的属性值、isLast：是否在对象或数组中是最后一项、visited：已经遍历过的对象/数组，用来检测循环引用、root：是否是根节点
   */


  var stringify = function stringify(data, hasKey, isLast, visited) {
    var contentType = type(data);
    var str = '';
    var len = 0;
    var lastComma = isLast ? '' : ','; // 当最后一项是数组或对象时，不需要显示逗号

    switch (contentType) {
      case 'object':
        // 对象
        // 检测到循环引用就直接终止遍历
        if (visited.includes(data)) {
          str += "<span class=\"string\">\u68C0\u6D4B\u5230\u5FAA\u73AF\u5F15\u7528</span>";
        } else {
          visited.push(data);
          var keys = Object.keys(data);
          len = keys.length; // 空对象

          if (len <= 0) {
            // 如果该对象是作为某个属性的值的话，那么左括号要和key显示在同一行
            str += hasKey ? "<span class=\"bracket\">{ }".concat(lastComma, "</span>") : "<div class=\"bracket\">{ }".concat(lastComma, "</div>");
          } else {
            // 非空对象
            // expandBtn是展开和收缩按钮
            str += "<span class=\"el-icon-arrow-right expandBtn\"></span>";
            str += hasKey ? "<span class=\"bracket\">{</span>" : '<div class="bracket">{</div>'; // 这个wrap的div用来实现展开和收缩

            str += '<div class="wrap">'; // 遍历对象的所有属性

            keys.forEach(function (key, index) {
              var childIsJson = ['object', 'array'].includes(type(data[key])); // 最后一项不显示逗号

              str += "\n                                <div class=\"object\">\n                                    <span class=\"key\">\"".concat(key, "\"</span>\n                                    <span class=\"colon\">:</span>\n                                    ").concat(stringify(data[key], true, index >= len - 1, visited)).concat(index < len - 1 && !childIsJson ? ',' : '', "\n                                </div>");
            });
            str += '</div>';
            str += "<div class=\"bracket\">}".concat(lastComma, "</div>");
          }
        }

        break;

      case 'array':
        // 数组
        if (visited.includes(data)) {
          str += "<span class=\"string\">\u68C0\u6D4B\u5230\u5FAA\u73AF\u5F15\u7528</span>";
        } else {
          visited.push(data);
          len = data.length; // 空数组

          if (len <= 0) {
            // 如果该数组是作为某个属性的值的话，那么左括号要和key显示在同一行
            str += hasKey ? "<span class=\"bracket\">[ ]".concat(lastComma, "</span>") : "<div class=\"bracket\">[ ]".concat(lastComma, "</div>");
          } else {
            // 非空数组
            str += "<span class=\"el-icon-arrow-right expandBtn\"></span>";
            str += hasKey ? "<span class=\"bracket\">[</span>" : '<div class="bracket">[</div>';
            str += '<div class="wrap">';
            data.forEach(function (item, index) {
              // 最后一项不显示逗号
              str += "\n                            <div class=\"array\">\n                                ".concat(stringify(item, true, index >= len - 1, visited)).concat(index < len - 1 ? ',' : '', "\n                            </div>");
            });
            str += '</div>';
            str += "<div class=\"bracket\">]".concat(lastComma, "</div>");
          }
        }

        break;

      default:
        // 其他类型
        var res = handleData(data);
        var quotationMarks = res.contentType === 'string' ? '\"' : ''; // 字符串显示双引号

        str += "<span class=\"".concat(res.contentType, "\">").concat(quotationMarks).concat(res.content).concat(quotationMarks, "</span>");
        break;
    }

    return str;
  };
  /**
   * @Author: 王林25
   * @Date: 2021-05-07 19:53:56
   * @Desc: 处理数据
   */


  var handleData = function handleData(content) {
    var contentType = type(content);

    switch (contentType) {
      case 'boolean':
        // 布尔值
        content = content ? 'true' : 'false';
        break;

      case 'null':
        // null
        content = 'null';
        break;

      case 'undefined':
        // undefined
        content = 'undefined';
        break;

      case 'symbol':
        // Symbol，Symbol不能直接通过postMessage进行传递，会报错，需要转成字符串
        content = content.toString();
        break;

      case 'function':
        // 函数
        content = content.toString();
        break;

      case 'array': // 数组

      case 'object':
        // 对象
        content = stringify(content, false, true, [], true);
        break;

      default:
        break;
    }

    return {
      contentType: contentType,
      content: content
    };
  };
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-05-10 09:41:41 
   * @Desc: 处理特定方法 
   */
  // 计数


  var countIndex = {};

  if (sessionStorage.getItem('CONSOLE_COUNT')) {
    countIndex = JSON.parse(sessionStorage.getItem('CONSOLE_COUNT'));
  } // 计时


  var timeData = {};

  var handleArgs = function handleArgs(method, contents) {
    // 处理占位符
    if (contents.length > 0) {
      if (type(contents[0]) === 'string') {
        // 只处理%s、%d、%i、%f、%c
        var match = contents[0].match(/(%[sdifc])([^%]*)/gm); // "%d年%d月%d日" -> ["%d年", "%d月", "%d日"]

        if (match) {
          // 剩余参数
          var sliceArgs = contents.slice(1);
          var strList = []; // 遍历匹配到的结果

          match.forEach(function (item, index) {
            var placeholder = item.slice(0, 2);
            var arg = sliceArgs[index]; // 对应位置没有数据，那么就原样输出占位符

            if (arg === undefined) {
              strList.push(item);
              return;
            }

            var newStr = '';

            switch (placeholder) {
              // 字符串，此处为简单处理，实际和chrome控制台的输出有差异
              case '%s':
                newStr = String(arg) + item.slice(2);
                break;
              // 整数

              case '%d':
              case '%i':
                newStr = (type(arg) === 'number' ? parseInt(arg) : 'NaN') + item.slice(2);
                break;
              // 浮点数

              case '%f':
                newStr = (type(arg) === 'number' ? arg : 'NaN') + item.slice(2);
                break;
              // 样式

              case '%c':
                newStr = "<span style=\"".concat(arg, "\">").concat(item.slice(2), "</span>");
                break;

              default:
                break;
            }

            strList.push(newStr);
          });
          contents = strList; // 超出占位数量的剩余参数也不能丢弃，需要展示

          if (sliceArgs.length > match.length) {
            contents = contents.concat(sliceArgs.slice(match.length));
          }
        }
      }
    } // 处理方法


    switch (method) {
      // 只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果
      case 'assert':
        if (contents[0]) {
          contents = null;
        } else {
          method = 'error';
          contents = ['Assertion failed: ' + (contents[1] || 'console.assert')];
        }

        break;
      // 用于计数，输出它被调用了多少次

      case 'count':
        if (contents[0]) {
          if (countIndex[contents[0]] !== undefined) {
            countIndex[contents[0]]++;
          } else {
            countIndex[contents[0]] = 1;
          }

          sessionStorage.setItem('CONSOLE_COUNT', JSON.stringify(countIndex));
          contents = [contents[0] + ': ' + countIndex[contents[0]]];
        } else {
          contents = null;
        }

        break;
      // 计时开始

      case 'time':
        timeData[contents[0]] = Date.now();
        contents = null;
        break;
      // 计时结束

      case 'timeEnd':
        if (timeData[contents[0]]) {
          contents = [contents[0] + ': ' + (Date.now() - timeData[contents[0]]) + ' ms'];
        } else {
          contents = null;
        }

        break;

      default:
        break;
    }

    return {
      method: method,
      args: contents
    };
  }; // 代理console构造函数


  function ProxyConsole() {} // 拦截console的所有方法


  ['debug', 'clear', 'error', 'info', 'log', 'warn', 'dir', 'props', 'group', 'groupEnd', 'dirxml', 'table', 'trace', 'assert', 'count', 'markTimeline', 'profile', 'profileEnd', 'time', 'timeEnd', 'timeStamp', 'groupCollapsed'].forEach(function (method) {
    var originMethod = console[method]; // 设置原型方法

    ProxyConsole.prototype[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 发送信息给父窗口
      var res = handleArgs(method, args);

      if (res.args) {
        window.parent.postMessage({
          type: 'console',
          method: res.method,
          data: res.args.map(function (item) {
            return handleData(item);
          })
        });
      } // 调用原始方法


      originMethod.apply(ProxyConsole, args);
    };
  }); // 覆盖原console对象

  window.console = new ProxyConsole();
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-05-12 18:22:05 
   * @Desc: 监听事件 
   */

  var onMessage = function onMessage(_ref) {
    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data;

    // 动态执行代码
    if (data.type === 'command') {
      try {
        // 打印要执行的代码
        console.log('＞ ' + data.data);
        console.log(eval(data.data));
      } catch (error) {
        console.error('js执行出错');
        console.error(error);
      }
    } else if (data.type === 'log_info') {
      // 打印日志
      console.log(data.data);
    } else if (data.type === 'log_error') {
      // 打印错误
      console.error(data.data);
    }
  };

  window.addEventListener('message', onMessage);
})();
