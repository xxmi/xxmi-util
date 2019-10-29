/* eslint-disable */
// https://help.aliyun.com/document_detail/125572.html?spm=a2c4g.11186623.6.1084.131d1c4cSfavJZ#h2-u64ADu653Eu5668u63A5u53E32
import Aliplayer from 'Aliplayer';

const { assign } = Object;

const isEmpty = function (args) {
  return typeof args === 'undefined' || args === null || args === '';
};

class MePlayer {
  constructor(list = [], config = {}) {
    if (new.target === undefined || new.target !== MePlayer) {
      throw new Error('MePlayer 必须实例化。');
    }
    this.config = assign({
      autoplay: false, // 自动播放
      step: 5, // 步长;默认：10 秒
      allowSetSpeed: [0.5, 1, 1.25, 1.5, 2], // 允许的倍速值；可选值：0.5, 1, 1.25, 1.5, 2（倍速还可以放大到10倍以上，但没意义眼睛都不过来了）
      setSpeed: 1, // 倍速播放
      ready: false, // 准备状态；true：已准备好；false:为准备好
      duration: 0, // 总时长；单位：秒
      currentTime: 0, // 当前播放位置；单位：秒
      state: 0, // 播放状态；0：停止；1：播放中；2：暂停；3：播放完成
      skinLayout: false,
    }, config);
    this.instanceMap = {};
    this.availableMap = {};
    this.leader = null; // 领导者/指挥家
    this.eventList = {};
    this.interval = null;
    // 配置合并
    let ids = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (isEmpty(item.source)) {
        throw new Error('播放器【 source 】未指定。');
      }
      if (isEmpty(item.id)) {
        throw new Error('播放器【 id 】未指定。');
      }
      if (ids.find(id => id === item.id)) {
        throw new Error('播发器【 id 】 不能重复。');
      }
      ids.push(item.id);
      list[i] = assign(
        {
          id: '', // 必填
          source: '', // 必填
          width: '100%',
          height: '100%',
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: 'always',
          waitingTimeout: 30,
          useH5Prism: true,
          // skinLayout: true, // 功能组件布局配置，不传该字段使用默认布局。传 false 隐藏所有功能组件，请参照皮肤定制
        }, { skinLayout: this.config.skinLayout }, item);
    }

    /**
     * 思路：
     * 1. 为每个视频创建一个实例
     * 2. 获取每个视频的时长
     * 3. 以时长最长的作为主播放
     */

    let successErrorCount = 0; // 记录成功和错误的视频数
    let readyHandler = () => {
      successErrorCount++;
      if (successErrorCount < list.length) return;
      if (this.leader.duration <= 0) return;
      this.config.ready = true;
      this.emit('ready', this.config);
      this.emit('init', this.config);
      if (this.config.autoplay) {
        this.play();
        this.emit('play', this.config);
      }
    };
    // 创建播放实例
    for (let item of list) {
      let { id } = item;
      let m = {
        player: null, // 播放器实例
        state: 0, // 状态；0:未创建播放器；1：已准备好；2：错误
        duration: 0, // 视频总时长；单位：秒
        currentTime: 0, // 当前播放的位置；单位：秒
      };
      m.player = new Aliplayer(item);
      m.player.on('ready', (args) => {
        m.state = 1;
        let duration = m.player.getDuration();
        m.duration = /\d/.test(duration) ? duration : 0; // 获取视频总时长
        if (m.duration > 0) {
          this.availableMap[`player:${id}`] = m; // 存放有效的
        }
        if (m.duration > this.config.duration) {
          this.config.duration = duration;
          this.leader = m;
        }
        readyHandler();
      });
      m.player.on('error', (args) => {
        console.error(`${id} 错误`, args);
        m.state = 2;
        let { paramData: { error_code } } = args;
        readyHandler();
      });
      this.instanceMap[`player:${id}`] = m;
    }
    this.list = list;
  }

  on(eventName, callback) {
    if (typeof callback === 'undefined' || !(callback instanceof Function)) return;
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }
    this.eventList[eventName].push(callback);
  }

  emit(eventName, params) {
    let events = this.eventList[eventName];
    if (!events || events.length <= 0) return;
    for (let callback of events) {
      callback(params);
    }
  }

  isReady() {
    return this.config.ready && this.leader !== null;
  }

  /**
   * 监控和校正时间
   * @param flag
   */
  monitor(flag = true) {
    clearInterval(this.interval);
    if (!flag) return;
    this.interval = setInterval(() => {
      let { currentTime, duration } = this.config;
      if (currentTime === duration) {
        clearInterval(this.interval);
      }
      let leaderDuration = this.leader.duration;
      let leaderCurrTime = this.leader.player.getCurrentTime(); // 领导者播放位置
      // 校正播放位置偏差（允许的范围 3 秒）
      let rangeVal = 1.5;
      let minTime = leaderCurrTime - rangeVal <= 0 ? 0 : leaderCurrTime - rangeVal;
      let maxTime = leaderCurrTime + rangeVal >= leaderDuration ? leaderDuration : leaderCurrTime + rangeVal;
      this.config.currentTime = leaderCurrTime;
      for (let item of Object.values(this.availableMap)) {
        // 排除领导者
        if (this.leader === item) continue;
        let { player, duration, currentTime } = item;
        // 领导者位置 >= 当前视频总时长
        if (leaderCurrTime >= duration) {
          if (currentTime < duration) { // 当前视频未播放完
            item.currentTime = duration;
            player.seek(duration + 1); // 必须加1秒
          }
          continue;
        }
        let itemCurrTime = player.getCurrentTime();
        if (itemCurrTime >= minTime && itemCurrTime <= maxTime) {
          item.currentTime = itemCurrTime;
        } else {
          item.currentTime = leaderCurrTime >= duration ? duration : leaderCurrTime;
          player.play();
          player.seek(item.currentTime);
        }
      }
      if (leaderCurrTime >= leaderDuration) {
        clearInterval(this.interval);
        this.config.state = 3;
        this.emit('complete', this.config);
      }
      this.emit('monitor', this.config);
    }, 500);

  }

  /**
   * 播放
   */
  play() {
    if (!this.isReady() || this.config.state === 1) return;
    const { setSpeed } = this.config;
    // 领导者播放的位置
    let leaderCurrTime = this.leader.player.getCurrentTime();
    for (let item of Object.values(this.availableMap)) {
      // 排除领导者
      if (this.leader === item) continue;
      let { player, duration } = item;
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
  }

  /**
   * 暂停播放
   */
  pause() {
    if (!this.isReady() || this.config.state === 2) return;
    this.monitor(false);
    for (let item of Object.values(this.availableMap)) {
      item.player.pause();
    }
    this.config.state = 2;
  }

  /**
   * 调整播放位置
   * @param playPosition
   */
  seek(playPosition = 0) {
    if (!this.isReady()) return;
    for (let item of Object.values(this.availableMap)) {
      let { player, duration } = item;
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
  prev() {
    this.prevAndForward(false);
  }

  /**
   * 快进
   */
  forward() {
    this.prevAndForward(true);
  }

  prevAndForward(flag) {
    if (!this.isReady()) return;
    let leaderDuration = this.leader.duration;
    let { step } = this.config;
    // 领导者播放的位置
    let leaderCurrTime = this.leader.player.getCurrentTime();
    let playPosition = flag ? (leaderCurrTime + step) >= leaderDuration ? leaderDuration : leaderCurrTime + step : (leaderCurrTime - step) <= 0 ? 0 : leaderCurrTime - step;
    this.seek(playPosition);
  }

  /**
   * 设备播放倍速
   * @param val 默认 1 倍播放速度
   */
  setSpeed(val = 1) {
    if (!this.isReady()) return;
    val = this.config.allowSetSpeed.find(item => item == val) ? val : 1;
    this.config.setSpeed = val;
    for (let item of Object.values(this.availableMap)) {
      item.player.setSpeed(val); // 设置播放倍速
    }
  }
}

export default MePlayer;
