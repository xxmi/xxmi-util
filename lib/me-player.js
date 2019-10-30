import Aliplayer from 'Aliplayer';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var assign = Object.assign;

var isEmpty = function isEmpty(args) {
  return typeof args === 'undefined' || args === null || args === '';
};

var MePlayer =
/*#__PURE__*/
function () {
  function MePlayer() {
    var _this = this;

    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MePlayer);

    if ((this instanceof MePlayer ? this.constructor : void 0) === undefined || (this instanceof MePlayer ? this.constructor : void 0) !== MePlayer) {
      throw new Error('MePlayer 必须实例化。');
    }

    this.config = assign({
      autoplay: false,
      // 自动播放
      step: 10,
      // 步长;默认：10 秒
      allowSetSpeed: [0.5, 1, 1.25, 1.5, 2],
      // 允许的倍速值；可选值：0.5, 1, 1.25, 1.5, 2（倍速还可以放大到10倍以上，但没意义眼睛都不过来了）
      setSpeed: 1,
      // 倍速播放
      ready: false,
      // 准备状态；true：已准备好；false:为准备好
      duration: 0,
      // 总时长；单位：秒
      currentTime: 0,
      // 当前播放位置；单位：秒
      state: 0,
      // 播放状态；0：停止；1：播放中；2：暂停；3：播放完成
      skinLayout: false
    }, config);
    this.instanceMap = {};
    this.availableMap = {};
    this.leader = null; // 领导者/指挥家

    this.eventList = {};
    this.interval = null; // 配置合并

    var ids = [];

    var _loop = function _loop(i) {
      var item = list[i];

      if (isEmpty(item.source)) {
        throw new Error('播放器【 source 】未指定。');
      }

      if (isEmpty(item.id)) {
        throw new Error('播放器【 id 】未指定。');
      }

      if (ids.find(function (id) {
        return id === item.id;
      })) {
        throw new Error('播发器【 id 】 不能重复。');
      }

      ids.push(item.id);
      list[i] = assign({
        id: '',
        // 必填
        source: '',
        // 必填
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'always',
        waitingTimeout: 30,
        useH5Prism: true // skinLayout: true, // 功能组件布局配置，不传该字段使用默认布局。传 false 隐藏所有功能组件，请参照皮肤定制

      }, {
        skinLayout: _this.config.skinLayout
      }, item);
    };

    for (var i = 0; i < list.length; i++) {
      _loop(i);
    }
    /**
     * 思路：
     * 1. 为每个视频创建一个实例
     * 2. 获取每个视频的时长
     * 3. 以时长最长的作为主播放
     */


    var successErrorCount = 0; // 记录成功和错误的视频数

    var readyHandler = function readyHandler() {
      successErrorCount++;
      if (successErrorCount < list.length) return;
      if (!_this.leader || _this.leader.duration <= 0) return;
      _this.config.ready = true;

      _this.emit('ready', _this.config);

      _this.emit('init', _this.config);

      _this.emit('state', _this.config);

      if (_this.config.autoplay) {
        _this.play();

        _this.emit('play', _this.config);
      }
    }; // 创建播放实例


    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop2 = function _loop2() {
        var item = _step.value;
        var id = item.id;
        var m = {
          player: null,
          // 播放器实例
          state: 0,
          // 状态；0:未创建播放器；1：已准备好；2：错误
          duration: 0,
          // 视频总时长；单位：秒
          currentTime: 0 // 当前播放的位置；单位：秒

        };
        m.player = new Aliplayer(item);
        m.player.on('ready', function (args) {
          m.state = 1;
          var duration = m.player.getDuration();
          m.duration = /\d/.test(duration) ? duration : 0; // 获取视频总时长

          if (m.duration > 0) {
            _this.availableMap["player:".concat(id)] = m; // 存放有效的
          }

          if (m.duration > _this.config.duration) {
            _this.config.duration = duration;
            _this.leader = m;
          }

          readyHandler();
        });
        m.player.on('error', function (args) {
          console.error("".concat(id, " \u9519\u8BEF"), args);
          m.state = 2;
          var error_code = args.paramData.error_code;
          readyHandler();
        });
        _this.instanceMap["player:".concat(id)] = m;
      };

      for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.list = list;
  }

  _createClass(MePlayer, [{
    key: "on",
    value: function on(eventName, callback) {
      if (typeof callback === 'undefined' || !(callback instanceof Function)) return;

      if (!this.eventList[eventName]) {
        this.eventList[eventName] = [];
      }

      this.eventList[eventName].push(callback);
    }
  }, {
    key: "emit",
    value: function emit(eventName, params) {
      var events = this.eventList[eventName];
      if (!events || events.length <= 0) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var callback = _step2.value;
          callback(params);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return this.config.ready && this.leader !== null;
    }
    /**
     * 监控和校正时间
     * @param flag
     */

  }, {
    key: "monitor",
    value: function monitor() {
      var _this2 = this;

      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      clearTimeout(this.interval);
      if (!flag) return;

      var ex = function ex() {
        var _this2$config = _this2.config,
            currentTime = _this2$config.currentTime,
            duration = _this2$config.duration;

        if (currentTime === duration) {
          clearTimeout(_this2.interval);
        }

        var leaderDuration = _this2.leader.duration;

        var leaderCurrTime = _this2.leader.player.getCurrentTime(); // 领导者播放位置
        // 校正播放位置偏差（允许的范围 3 秒）


        var rangeVal = 1.5;
        var minTime = leaderCurrTime - rangeVal <= 0 ? 0 : leaderCurrTime - rangeVal;
        var maxTime = leaderCurrTime + rangeVal >= leaderDuration ? leaderDuration : leaderCurrTime + rangeVal;
        _this2.config.currentTime = leaderCurrTime;

        for (var _i = 0, _Object$values = Object.values(_this2.availableMap); _i < _Object$values.length; _i++) {
          var item = _Object$values[_i];
          // 排除领导者
          if (_this2.leader === item) continue;
          var player = item.player,
              _duration = item.duration,
              _currentTime = item.currentTime; // 领导者位置 >= 当前视频总时长

          if (leaderCurrTime >= _duration) {
            if (_currentTime < _duration) {
              // 当前视频未播放完
              item.currentTime = _duration;
              player.seek(_duration + 1); // 必须加1秒
            }

            continue;
          }

          var itemCurrTime = player.getCurrentTime();

          if (itemCurrTime >= minTime && itemCurrTime <= maxTime) {
            item.currentTime = itemCurrTime;
          } else {
            item.currentTime = leaderCurrTime >= _duration ? _duration : leaderCurrTime;
            player.play();
            player.seek(item.currentTime);
          }
        }

        _this2.emit('monitor', _this2.config);

        if (leaderCurrTime >= leaderDuration) {
          clearTimeout(_this2.interval);
          _this2.config.state = 3;

          _this2.emit('complete', _this2.config);

          _this2.emit('state', _this2.config);
        } else {
          setTimeout(ex, 500);
        }
      };

      ex();
    }
    /**
     * 播放
     */

  }, {
    key: "play",
    value: function play() {
      if (!this.isReady() || this.config.state === 1) return;
      var setSpeed = this.config.setSpeed; // 领导者播放的位置

      var leaderCurrTime = this.leader.player.getCurrentTime();

      for (var _i2 = 0, _Object$values2 = Object.values(this.availableMap); _i2 < _Object$values2.length; _i2++) {
        var item = _Object$values2[_i2];
        // 排除领导者
        if (this.leader === item) continue;
        var player = item.player,
            duration = item.duration;
        player.setSpeed(setSpeed); // 设置播放倍率
        // 领导者播放的位置 >= 视频总时间

        if (leaderCurrTime >= duration) {
          player.seek(duration + 1); // // 必须加1秒；跳转到某个时刻进行播放，time的单位为秒。

          item.currentTime = duration;
          continue;
        }

        player.play(); // 开始播放（注意顺序，先播放然后在跳转播放位置，不然会造成跳转位置失败（这个视频播放完成的情况））
        // 领导者播放的位置 < 视频总时间

        player.seek(leaderCurrTime);
      }

      this.leader.player.setSpeed(setSpeed); // 设置播放倍率

      this.leader.player.play(); // 开始播放

      this.monitor(true);
      this.config.state = 1;
      this.emit('state', this.config);
    }
    /**
     * 暂停播放
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this.isReady() || this.config.state === 2) return;
      this.monitor(false);

      for (var _i3 = 0, _Object$values3 = Object.values(this.availableMap); _i3 < _Object$values3.length; _i3++) {
        var item = _Object$values3[_i3];
        item.player.pause();
      }

      this.config.state = 2;
      this.emit('state', this.config);
    }
    /**
     * 调整播放位置
     * @param playPosition
     */

  }, {
    key: "seek",
    value: function seek() {
      var playPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.isReady()) return;

      for (var _i4 = 0, _Object$values4 = Object.values(this.availableMap); _i4 < _Object$values4.length; _i4++) {
        var item = _Object$values4[_i4];
        var player = item.player,
            duration = item.duration;

        if (playPosition >= duration) {
          player.seek(duration + 1);
          item.currentTime = duration;
          continue;
        }

        if (this.config.state === 1) {
          player.play();
        }

        player.seek(playPosition);
      }

      this.config.currentTime = playPosition;
      this.emit('monitor', this.config);
    }
    /**
     * 快退
     */

  }, {
    key: "prev",
    value: function prev() {
      this.prevAndForward(false);
    }
    /**
     * 快进
     */

  }, {
    key: "forward",
    value: function forward() {
      this.prevAndForward(true);
    }
  }, {
    key: "prevAndForward",
    value: function prevAndForward(flag) {
      if (!this.isReady()) return;
      var leaderDuration = this.leader.duration;
      var step = this.config.step; // 领导者播放的位置

      var leaderCurrTime = this.leader.player.getCurrentTime();
      var playPosition = flag ? leaderCurrTime + step >= leaderDuration ? leaderDuration : leaderCurrTime + step : leaderCurrTime - step <= 0 ? 0 : leaderCurrTime - step;
      this.seek(playPosition);
    }
    /**
     * 设备播放倍速
     * @param val 默认 1 倍播放速度
     */

  }, {
    key: "setSpeed",
    value: function setSpeed() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (!this.isReady()) return;
      val = this.config.allowSetSpeed.find(function (item) {
        return item == val;
      }) ? val : 1;
      this.config.setSpeed = val;

      for (var _i5 = 0, _Object$values5 = Object.values(this.availableMap); _i5 < _Object$values5.length; _i5++) {
        var item = _Object$values5[_i5];
        item.player.setSpeed(val); // 设置播放倍速
      }
    }
    /**
     * 销毁播放器
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this.config.ready = false;
      clearTimeout(this.interval);

      for (var _i6 = 0, _Object$values6 = Object.values(this.instanceMap); _i6 < _Object$values6.length; _i6++) {
        var item = _Object$values6[_i6];
        item.player.dispose(); // 销毁
      }
    }
  }]);

  return MePlayer;
}();

export default MePlayer;
