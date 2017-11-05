export default {
			addDay(date, count) {
                date = this.convertToDate(date);
                return new Date(date.setDate(date.getDate() + count)); //获取AddDayCount天后的日期
            },

            timestampToDate (timestamp) {
                if (!timestamp) return new Date();

                // 特殊处理php时间戳
                if (timestamp.toString().length === 10) {
                    timestamp = timestamp * 1000;
                }
                return new Date(parseInt(timestamp));
            },
            timestampToDateInfo (timestamp) {
                var date;
                try {
                    timestamp = parseFloat(timestamp);
                    date = new Date(timestamp);
                } catch (e) {
                    date = new Date();
                }
                return this.getDateInfo(date);
            },
            timestampToTimeStr (timestamp) {
                var Re = "";
                try {
                    timestamp = parseInt(timestamp);
                    if(timestamp.toString().length===10){
                        timestamp = timestamp*1000;
                    }
                    var date = new Date(timestamp);
                    var now = new Date();
                    var time = now.getTime();
                    var dateInfo = this.getDateInfo(date);
                    var nowDateInfo = this.getDateInfo(now);
                    if(timestamp.toString().length>10){
                        time = parseInt((time - timestamp) / 1000);
                    }else{
                        time = parseInt((time - timestamp));
                    }
                    var s;
                    if (time < 60 * 1) {
                        Re = '刚刚';
                    } else if ((time < 60 * 60) && (time >= 60 * 1)) {
                        s = Math.floor(time / 60);
                        Re = s + "分钟前";
                    } else if (nowDateInfo.year === dateInfo.year && nowDateInfo.day === dateInfo.day && nowDateInfo.month === dateInfo.month) {
                        Re = "今天 " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    } else if (nowDateInfo.year === dateInfo.year) {
                        Re = dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    } else {
                        Re = dateInfo.year + "-" + dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
                    }
                } catch (e) {

                }
                return Re;
            },

		    convertStrToDate (str) {
                if (!str) {
                    return new Date();
                }
                var str_arr = str.split(" ");
                var yearmonthday = str_arr[0];
                var hourminsecond = str_arr[1] || "";
                var hourminsecond_arr = hourminsecond.split(":");
                var yearmonthday_arr = yearmonthday.split("-");
                if (yearmonthday_arr.length != 3) {
                    yearmonthday_arr = yearmonthday.split("/");
                }
                if (yearmonthday_arr.length != 3) {
                    return new Date();
                }
                if (!hourminsecond) {
                    return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2]);
                }
                return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2], hourminsecond_arr[0] || 0, hourminsecond_arr[1] || 0, hourminsecond_arr[2] || 0);

            },
            getPreMonth (date) {
                var dateInfo = this.getDateInfo(date);
                var nextMonth = new Date(dateInfo.year, dateInfo.month - 1, 0);
                return nextMonth;
            },
            getCurMonthFirstDay (date) {
                date = this.convertToDate(date);
                var dateInfo = this.getDateInfo(date);
                return new Date(dateInfo.year, dateInfo.month - 1, 1);
            },
            getPreYear (date) {
                var dateInfo = this.getDateInfo(date);
                var preYear = new Date(dateInfo.year - 1, dateInfo.month - 1, 1);
                return preYear;
            },
            compareDate (date1, date2) {
                date1 = this.ConvertDateToStr(date1, "yyyy-MM-dd");
                date2 = this.ConvertDateToStr(date2, "yyyy-MM-dd");
                date1 = this.convertToDate(date1);
                date2 = this.convertToDate(date2);
                if (date1 > date2) {
                    return 1;
                }
                if (date1 - date2 === 0) {
                    return 0;
                }
                return -1;
            },
            compareDateToDay (date1, date2) {
                //比较精确到天,返回相差天数
                var dayTimeStamp = 1000*60*60*24;
                date1 = this.ConvertDateToStr(date1, "yyyy-MM-dd");
                date2 = this.ConvertDateToStr(date2, "yyyy-MM-dd");
                date1 = parseInt(this.convertToDate(date1).getTime() / dayTimeStamp);
                date2 = parseInt(this.convertToDate(date2).getTime() / dayTimeStamp);
                return date1-date2;
            },
            setDateToYear (date, year) {
                var dateInfo = this.getDateInfo(date);
                var preYear = new Date(year, dateInfo.month - 1, 1);
                return preYear;
            },
            setMonthToDate (date, month) {
                month = parseInt(month);
                var dateInfo = this.getDateInfo(date);
                return new Date(dateInfo.year, month - 1, 1);
            },
            getNextYear (date) {
                var dateInfo = this.getDateInfo(date);
                var nextYear = new Date(dateInfo.year + 1, dateInfo.month - 1, 1);
                return nextYear;
            },
            getNextMonth (date) {
                var dateInfo = this.getDateInfo(date);
                var nextMonth = new Date(dateInfo.year, dateInfo.month + 1, 0);
                return nextMonth;
            },
            getMonthFirstDayWhicDayInWeek (date) {
                date = this.convertToDate(date);
                var d = new Date(date.getFullYear(), date.getMonth(), 1);
                return d.getDay();
            },
            //根据formart转换成相应格式
            ConvertDateToStr (date, formart) {
                date = this.convertToDate(date);
                var info = this.getDateInfo(date);
                info.month = info.month < 10 ? "0" + info.month : info.month;
                info.day = info.day < 10 ? "0" + info.day : info.day;
                info.min = info.min < 10 ? "0" + info.min : info.min;
                info.second = info.second < 10 ? "0" + info.second : info.second;
                info.hour = info.hour < 10 ? "0" + info.hour : info.hour;
                if (formart == "yyyy-MM-dd") {
                    return info.year + "-" + info.month + "-" + info.day;
                } else if (formart == "yyyy-MM") {
                    return info.year + "-" + info.month;
                } else if (formart == "yyyy-MM-dd hh:mm:ss") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min + ":" + info.second;
                } else if (formart == "MM-dd hh:mm") {
                    return info.month + "-" + info.day + " " + info.hour + ":" + info.min;
                } else if (formart == "hh:mm") {
                    return info.hour + ":" + info.min;
                } else if (formart == "MM-dd week") {
                    return info.month + "-" + info.day + " " + info.week;
                } else if (formart == "yyyy-MM-dd week") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.week;
                } else if (formart == "yyyy-MM-dd hh:mm") {
                    return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min;
                }else if(formart == "yyyyMMdd week hh:mm"){
                    return info.year + "年" + info.month + "月" + info.day + "日" + info.week + " " + info.hour + ":" + info.min;
                }
                return info.year + "-" + info.month + "-" + info.day;
            },
            //转换成年月日
            ConverStampToText (date) {
                date = this.convertToDate(date);
                var info = this.getDateInfo(date);
                info.month = info.month < 10 ? "0" + info.month : info.month;
                info.day = info.day < 10 ? "0" + info.day : info.day;
                return info.year + "年" + info.month + "月" + info.day + "日";
            },
            getMonthDayCount (date) {
                date = this.convertToDate(date);
                var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                return newDate.getDate();
            },
            convertToDate (date) {
                try {
                    if (date instanceof Date) {
                        return date;
                    } else if (!isNaN(date)) {
                        return this.timestampToDate(date);
                    } else if (typeof(date) == "string") {
                        return this.convertStrToDate(date);
                    }
                } catch (e) {
                    return new Date();
                }

                return new Date();
            },
            _processtime (num) {
                return (num < 10 ? ("0" + num) : num);
            },
            weekArr: ["日", "一", "二", "三", "四", "五", "六"],
            getDateInfo (date) {
                date = this.convertToDate(date);
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var second = date.getSeconds();
                var week = date.getDay();
                return {
                    year: date.getFullYear(),
                    month: month,
                    weekStr: this.weekArr[week],
                    weekFullStr: "星期" + this.weekArr[week],
                    week: "周" + this.weekArr[week],
                    monthStr: this._processtime(month),
                    day: day,
                    dayStr: this._processtime(day),
                    hour: hour,
                    hourStr: this._processtime(hour),
                    min: min,
                    minStr: this._processtime(min),
                    second: second,
                    secondStr: this._processtime(second)
                };
            },
            

}