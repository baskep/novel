const imgBaseURL = 'http://statics.zhuishushenqi.com';

export default {
    initImgURL: (url) => {
        return imgBaseURL + url;
    },
    initDate: (time) => {
        let dateTime = new Date(time);
        return dateTime.getUTCFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
    },
    timeAgo: (dateTimeStamp) => {
        dateTimeStamp = new Date(dateTimeStamp).getTime();
        let result;
        let hour = 1000 * 60 * 60;
        let day = hour * 24;
        let week = day * 7;
        let month = day * 30;
        let year = month * 12;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return;
        }
        let hourC = diffValue / hour;
        let dayC = diffValue / day;
        let weekC = diffValue / week;
        let monthC = diffValue / month;
        let yearC = diffValue / year;
        if (yearC >= 1) {
            result = ' ' + parseInt(yearC) + '年前';
        } else if (monthC >= 1 && month <= 12) {
            result = ' ' + parseInt(monthC) + '月前';
        } else if (weekC >= 1 && weekC <= 5) {
            result = ' ' + parseInt(weekC) + '周前';
        } else if (dayC >= 1) {
            result = ' ' + parseInt(dayC) + '天前';
        } else if (hourC >= 1) {
            result = ' ' + parseInt(hourC) + '小时前';
        } else {
            result = '刚刚';
        }
        return result;
    },
    debounce: (func, wait, mustRun) => {
        let timeout = null;
        let startTime = new Date();
        return function () {
            let context = this;
            let args = arguments;
            let curTime = new Date();
            clearTimeout(timeout);
            if (curTime - startTime >= mustRun) { // 如果达到了规定的触发时间间隔，触发 handler
                func.apply(context, args);
                startTime = curTime;
            } else {
                timeout = setTimeout(func, wait); // 没达到触发间隔，重新设定定时器
            }
        };
    },
    setStore: (name, content) => {
        if (!name) {
            return;
        }
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    getStore: name => {
        let obj = JSON.parse(window.localStorage.getItem(name));
        if (obj !== null && obj !== 'null' && obj !== '') {
            return obj;
        } else {
            return null;
        }
    },
    removeStore: name => {
        if (!name) {
            return;
        }
        window.localStorage.removeItem(name);
    }
};
