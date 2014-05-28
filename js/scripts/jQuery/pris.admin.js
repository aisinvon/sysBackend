    /**
     * pris admin global config
     */
    var prisAdmGCfg = {
        // use stamp in directive, ctrollor and template page to prevent file cache
        // stamp: (new Date()).getTime()
        stamp: ''
    }
    /**
     * ---------------------------------------------------------------------------------
     * ---------------------------------------------------------------------------------
     * ---------------------------------------------------------------------------------
     * extend new Date()
     * Get the custom date of before or after
     * example: customAddDay.addDays(1)
     */
    Date.prototype.addDays = function(num) {
        var value = this.valueOf();
        value += 86400000 * num;
        return new Date(value);
    }
    /**
     * convert string to Date obj
     * example: new Date().convertDate('2014-01-02')
     */
    Date.prototype.convertDate = function(date) {
        var flag = true;
        var dateArray = date.split("-");
        if (dateArray.length != 3) {
            dateArray = date.split("/");
            if (dateArray.length != 3) {
                return null;
            }
            flag = false;
        }
        var newDate = new Date();
        if (flag) {
            newDate.setFullYear(dateArray[0], dateArray[1] - 1, dateArray[2]);
        } else {
            newDate.setFullYear(dateArray[2], dateArray[1] - 1, dateArray[0]);
        }
        newDate.setHours(0, 0, 0);
        return newDate;
    };
    /**
     * date format
     * example: new Date().format('yyyy-MM-dd hh:mm:ss')
     * d: date, 1
     * dd: date, 01
     * ddd: Sun
     * dddd: Sunday
     * M: 1
     * MM: 01
     * MMM: Jan
     * MMMM: January
     * yy: 14
     * yyyy: 2014
     * h: hour type of 12, without 0
     * hh: hour type of 12, with 0
     * H: hour type of 24, without 0
     * HH: hour type of 24, with 0
     * m: minutes, without 0
     * mm: minutes, with 0
     * s: second, without 0
     * ss: second, with 0
     * l: milliscond, without 0
     * ll: milliscond, with 0
     * tt: am/pm
     * TT: AM/PM
     * return format date
     */
    Date.prototype.format = function(str) {
        var date = this;
        var zeroize = function(value, length) {
            if (!length) {
                length = 2;
            }
            value = new String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                zeros += '0';
            }
            return zeros + value;
        };

        return str.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {
            switch ($0) {
                case 'd':
                    return date.getDate();
                case 'dd':
                    return zeroize(date.getDate());
                case 'ddd':
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd':
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M':
                    return date.getMonth() + 1;
                case 'MM':
                    return zeroize(date.getMonth() + 1);
                case 'MMM':
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM':
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy':
                    return new String(date.getFullYear()).substr(2);
                case 'yyyy':
                    return date.getFullYear();
                case 'h':
                    return date.getHours() % 12 || 12;
                case 'hh':
                    return zeroize(date.getHours() % 12 || 12);
                case 'H':
                    return date.getHours();
                case 'HH':
                    return zeroize(date.getHours());
                case 'm':
                    return date.getMinutes();
                case 'mm':
                    return zeroize(date.getMinutes());
                case 's':
                    return date.getSeconds();
                case 'ss':
                    return zeroize(date.getSeconds());
                case 'l':
                    return date.getMilliseconds();
                case 'll':
                    return zeroize(date.getMilliseconds());
                case 'tt':
                    return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT':
                    return date.getHours() < 12 ? 'AM' : 'PM';
            }
        });
    };
    /**
     * remove one value from an Array
     * example:
     *  var arr = new Array("1","2","3","4");
     *  arr.remove('1');
     */
    Array.prototype.remove = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) {
                this.splice(i, 1);
                break;
            }
        }
    }


    /**
     * ---------------------------------------------------------------------------------
     * ---------------------------------------------------------------------------------
     * ---------------------------------------------------------------------------------
     * all pages function
     */
    var fedPris = {

        // change even or odd table rows' background when hover
        tdEvenOdd: function() {
            var tr = ('tbody tr'),
                $tr = $(tr),
                td = $tr.find('td'),
                lastParentIdx;

            // $('tbody tr:even').removeClass('odd even').addClass('odd');
            // $('tbody tr:odd').removeClass('odd even').addClass('even');

            // if td has rowspan attribute, then set its class to 'rowspan' and its parent node's class to 'parent'
            td.each(function() {
                var _this = $(this),
                    tdParent = _this.parent(),
                    rowValue = _this.attr('rowspan');

                if (rowValue != undefined && rowValue !== '' && rowValue !== '1') {
                    _this.addClass('rowspan').parent().addClass('parent');
                }
            });

            // tr hover change background color
            $(document).on('mouseenter', tr, function() {
                // tr.hover(function() {
                var _this = $(this),
                    // get the length of element 'parent' before hover element
                    lastParentIdx = _this.prevAll('.parent').length - 1;

                _this.addClass('on');

                if (_this.hasClass('parent')) {
                    _this.removeClass('parentOn');
                } else {
                    // set the last 'parent' element's class before hover element
                    _this.siblings('.parent').eq(lastParentIdx).addClass('parentOn');
                }
            });

            $(document).on('mouseleave', tr, function() {
                $(this).removeClass('on').siblings().removeClass('parentOn');
            });
        },

        // nav hover
        navHover: function() {
            // get default highlight nav position
            var defaultOn = $('.nav>.wrap>ul>li').index($('.on')),
                hoverDelay;

            $('.nav li').hover(function() {
                var _this = $(this);

                _this.addClass('on').siblings().not('.on').removeClass('on');
                hoverDelay = setTimeout(function() {
                    _this.children('ul').show();
                }, 100);
            }, function() {
                var _this = $(this);

                clearTimeout(hoverDelay);
                _this.removeClass('on');
                _this.children('ul').hide();
            });

            $('.nav>.wrap>ul>li').mouseleave(function() {
                $('.nav>.wrap>ul>li').eq(defaultOn).addClass('on');
            });
        },

        // select all check boxes
        selectAll: function() {
            var defauNum = $('#billing_table input:isChecked').length;

            // set submit button to disable when there is no isChecked checkbox after page loading
            if (defauNum === 0) {
                $('#billing_table').siblings().find('.black_btn:contains(Submit)').prop('disabled', 'disabled').addClass('btn_disabled');
            }

            // click checkbox
            $('.main').on('click', 'input:checkbox', function() {
                var _this = $(this),
                    num,
                    closestTable = _this.closest('table'),
                    allCheckBox = closestTable.find('tbody input:checkbox').not(':disabled'),
                    selectAllBox = closestTable.find('.select_all input'),
                    totalNum = allCheckBox.length;

                // detect is it select all checkbox or single checkbox
                if (_this.prop('isChecked')) {
                    _this.parent().hasClass('select_all') ? allCheckBox.prop('isChecked', true) : _this.prop('isChecked', true);
                } else {
                    _this.parent().hasClass('select_all') ? allCheckBox.prop('isChecked', false) : _this.prop('isChecked', false);
                }

                // get the num of selecte items and show it on page
                num = closestTable.find('input:isChecked').not('.select_all input').length;
                closestTable.prev().find('.num_toBeSbmt').text(num);
                closestTable.next().find('.num_toBeSbmt').text(num);

                // get number of checkbox to detemine if highlight submit button
                if (num === 0) {
                    closestTable.siblings().find('.black_btn:contains(Submit)').prop('disabled', 'disabled').addClass('btn_disabled').removeClass('prim');
                } else {
                    closestTable.siblings().find('.black_btn:contains(Submit)').removeAttr('disabled').removeClass('btn_disabled').addClass('prim');
                }

                // detect num equals total num of checkbox or not
                if (num === totalNum && totalNum !== 0) {
                    selectAllBox.prop('isChecked', 'isChecked');
                } else {
                    selectAllBox.removeAttr('isChecked');

                }
            });
        },

        // go to page top
        toTop: function() {
            $('.to_top').click(function() {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);

                return false;
            });

            // prevent toTop btn showing below footer

            function toTopBtnAdjust() {
                var toTopObj = $('.pageWrapper .fixed'),
                    pageHeight = $(document).height(),
                    scrollTop = $(window).scrollTop(),
                    winHeight = $(window).height();
                if ((pageHeight - scrollTop - winHeight) < 65) {
                    toTopObj.css({
                        bottom: 115 - (pageHeight - scrollTop - winHeight)
                    });
                } else {
                    toTopObj.css({
                        bottom: ""
                    });
                }
            }

            $(window).scroll(function() {
                toTopBtnAdjust();
            });
            toTopBtnAdjust();
        },

        /**
         * feedback pop win
         */
        feedback: function() {
            $('#to_feedback').click(function() {
                var $this = $(this),
                    feedbackStr = $('.pop_feedback', this).html(),
                    clonedHtml = "<div id='pop_feedback' class='pop_win_in'><div class='pop_feedback'>" + feedbackStr + "</div></div>";

                // pop up window append and show
                fedPris.popWinShow({
                    id: "#pop_feedback",
                    maskOut: true,
                    maskIn: false,
                    newPop: clonedHtml
                });

                return false;
            });

            // close all pop up win when click send feedback
            /* $('#pop_win').on('click', '.js_btn_feedback', function(){
            $('<b>Sent.</b>').appendTo($('#pop_feedback .pop_feedback'));
        });*/
        },

        // show right fixed_table and operation
        fixedTable: function() {
            //show fixed_table
            $('.add_row').click(function(e) {
                $('.reject_text').hide();
                if ($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $('.fixed_table').hide();
                } else {
                    $(this).addClass('on');
                    $('.fixed_table').show();
                }
                e.stopPropagation();
            });

            // hide fixed_table when click anywhere except click fixed_table
            $('body').click(function() {
                $('.fixed_table').hide();
                $('.add_row, #customize').removeClass('on');
            });

            // stopPropagation when click body to hide fixed_table
            $('.fixed_table').click(function(e) {
                e.stopPropagation();
            });

            // click to add one record
            /*$('#add_record').click(function () {
            var record = $(this).siblings('.data_table').find('.editable').clone();
            // append new record to table
            $('#billing_table>tbody').append(record);
            $('.select_all input').removeAttr('isChecked');
            // change even or odd table rows' background again when add one new record
            fedPris.tdEvenOdd();
            // select all check boxes
            fedPris.selectAll('.select_all input');
        });*/
        },

        // tip of table column 'status'
        showTip: function() {
            $('.main').on('mouseenter', '.jsTipIco', function() {
                var _this = $(this);

                _this.next('.jsTip').show();
                _this.closest('td').css('zIndex', '2');
            });
            $('.main').on('mouseleave', '.jsTipIco', function() {
                var _this = $(this);

                _this.next('.jsTip').hide();
                _this.closest('td').removeAttr('style');
            });
        },

        // click reject then show reject textarea
        rejTextarea: function() {
            $('table').on('click', '.reject', function(e) {
                $(this).next('.reject_text').show();
                $(this).closest('td').addClass('cur');
                $(this).closest('tr').siblings().find('.reject_text').hide();
                $(this).closest('tr').siblings().find('.cur').removeClass('cur');
                $('.add_row').removeClass('on');
                $('.fixed_table').hide();
                e.stopPropagation();
            });

            $('body').click(function() {
                $('.reject_text').hide();
            });

            $('table').on('click', '.reject_text', function(e) {
                e.stopPropagation();
            });

            $('table').on('click', '.cancel', function() {
                $(this).parent().hide();
                $('.add_row').removeClass('on');
                $('.fixed_table').hide();
            });
        },

        /** table sort
        for example: if you want to sort a table, then:
        sortTable('id name');
    */
        sortTable: function(tableEle) {
            var clickEle = tableEle + 'thead th';

            // table head click event
            $(document).on('click', clickEle, function() {
                // if not set property 'data-type', return
                var dataType = $(this).attr('data-type');
                if (dataType == undefined || dataType == '') return;

                var table = $(this).closest('table'),
                    index = table.find('thead th').index(this) + 1,
                    arr = [],
                    // exclude rows which have class 'editable' and tr in thead 'status'
                    row = table.find('tbody tr').not('.editable, .jsTip tr');
                $.each(row, function(i) {
                    arr[i] = row[i];
                });
                // if click table head twice, then reverse sort
                if ($(this).hasClass('ascend')) {
                    arr.reverse();
                    $(this).removeClass('ascend descend').addClass('descend').siblings().removeClass('ascend descend');
                } else {
                    arr.sort(howSort(index, dataType));
                    $(this).removeClass('ascend descend').addClass('ascend').siblings().removeClass('ascend descend');
                }
                // create new fragment to save new sortable rows
                var fragment = document.createDocumentFragment();
                $.each(arr, function(i) {
                    fragment.appendChild(arr[i]);
                });
                // prepend new rows to top of table
                table.find('tbody').not('.jsTip tbody').prepend(fragment);
                // change even or odd table rows' background again when sort table
                fedPris.tdEvenOdd();
            });

            // delete row
            /*$('table').delegate('.del', 'click', function () {
            $(this).closest('tr').remove();
            // change even or odd table rows' background again when sort table
            fedPris.tdEvenOdd();
        });*/

            // value compare

            function howSort(index, dataType) {
                return function(a, b) {
                    // get each TD text
                    var aStr = $(a).find('td:nth-child(' + index + ')').text().replace(/\s*/, ''),
                        bStr = $(b).find('td:nth-child(' + index + ')').text().replace(/\s*/, '');
                    //compare two string or number
                    if (dataType != 'text') {
                        aStr = convert(aStr, dataType);
                        bStr = convert(bStr, dataType);
                        if (aStr < bStr) {
                            return -1;
                        } else if (aStr > bStr) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        return aStr.localeCompare(bStr);
                    }
                }
            }

            // convert dataType        

            function convert(data, dataType) {
                switch (dataType) {
                    case 'int':
                        return parseInt(data);
                    case 'float':
                        return parseFloat(data);
                    default:
                        return data.toString();
                }
            }
            return {
                'howSort': howSort
            };
        },

        /** tab switch
        default usage: prisTab('id name');
        customized usage: if want to show the second tab, then: prisTab('id name', '1');;
    */
        prisTab: function(tabId, index) {
            var tabIndex = index,
                tabTit = $(tabId + '>.tab_tit'),
                tabCon = $(tabId + '>.tab_con'),
                tabLi = $(tabId + '>.tab_tit>li'),
                tabOn = $(tabId + '>.tab_tit>.on'),
                tabIndex = tabLi.index(tabOn);

            // if not set parameter index, show first tab
            if (tabIndex == undefined || tabIndex == '' || tabIndex == '-1') {
                $('li', tabTit).eq(0).addClass('on').siblings().removeClass('on');
                tabCon.eq(0).show().siblings('.tab_con').hide();
            } else {
                $('li', tabTit).eq(tabIndex).addClass('on').siblings().removeClass('on');
                tabCon.eq(tabIndex).show().siblings('.tab_con').hide();
            }

            $('.main').on('click', 'li', function() {
                //tabLi.click(function () {
                tabIndex = $(this).parent().children('li').index($(this));
                $(this).addClass('on').siblings().removeClass('on');
                $(this).parent().siblings('.tab_con').eq(tabIndex).show().siblings('.tab_con').hide();
            });

            return tabIndex;
        },

        /** show and hide tips of input and textarea
    default usage: inputTips();
    customized usage: if want to use it for a specified mod, then: inputTips('id name');
    */
        inputTips: function(id) {
            var inputEle = ('.text, textarea'),
                inputDisabled = $('input:disabled, textarea:disabled, textarea[readonly=readonly], select:disabled'),
                inputTip;
            if (id == undefined || id == '') {
                inputTip = $('input[tip], textarea[tip]');
            } else {
                inputTip = $('input[tip], textarea[tip]', id);
            }
            // get input or textarea default value
            for (var i = 0; i < inputTip.length; i++) {
                var nowIpt = inputTip.eq(i),
                    nowIptTip = nowIpt.attr('tip'),
                    nowIptVal = nowIpt.attr('value');
                // if element input or textarea have value attribute, then ignore tip attribute
                if (nowIptVal == undefined || nowIptVal == '' || nowIptVal == nowIptTip) {
                    nowIpt.val(nowIptTip);
                    nowIpt.addClass('default');
                } else {
                    nowIpt.addClass('normal');
                }
            }
            // if input is disabled, then addClass
            for (var j = 0; j < inputDisabled.length; j++) {
                inputDisabled.eq(j).addClass('disabled');
            }
            // input focus and blur
            $(document).on('click', inputEle, function() {
                var _this = $(this),
                    defTip = _this.attr('tip');
                _this.addClass('on');
                if (_this.val() == defTip) {
                    _this.val('');
                    _this.addClass('normal');
                }
            });
            $(document).on('blur', inputEle, function() {
                // .blur(function() {
                var _this = $(this),
                    defTip = _this.attr('tip');
                _this.removeClass('on');
                if ((_this.val()).replace(/\s*/g, '') == '') {
                    _this.val(defTip);
                    _this.removeClass('normal');
                }
            });
        },

        // clear each input's default value
        clearIptDefaultVal: function() {
            var inputTip = $('input[tip], textarea[tip]');
            inputTip.each(function() {
                var _this = $(this);
                if (_this.val() == _this.attr('tip')) {
                    _this.val('');
                }
            });
        },

        /** mod show or hide
    default usage: modShowHide();
    customized usage: if want to show the second mod_toggle, then: modShowHide('1');
    */
        modShowHide: function(index) {
            var $modToggle = $('.mod_toggle');

            $modToggle.each(function() {
                var modIpt = $('.mod_input', this),
                    modIptLen = modIpt.length,
                    i;

                for (i = 0; i < modIptLen; i++) {
                    modIpt.eq(i).attr('data-mod-idx', i);
                    modIpt.eq(i).find('.tit_index').text(i + 1);
                    modIpt.eq(0).addClass('mod_input_first');
                }
            });

            var textareaMod, cloneMod, urlHash,
                // cloneMod's attribute data-mod-idx
                cloneModIdx = 0;

            if (index != undefined || index != '') {
                $modToggle.eq(index).addClass('on');
                $modToggle.eq(index).find('.toggle_con').show();
            }

            // click title show or hide textarea
            $(document).delegate('.mod_toggle>h4', 'click', function() {
                var mod = $(this).closest('.mod_toggle');
                urlHash = $(this).closest('.mod_toggle').attr('id');
                textareaMod = $(this).parent().siblings('.toggle_con').find('.mod_input:eq(0)');
                if (mod.hasClass('on')) {
                    mod.removeClass('on');
                } else {
                    mod.addClass('on');
                }
            });

            /**
        change attribute 'for', 'id', 'name' of input, label, textarea, select elements
        ele: the element
        eleParent: the parent node of ele
        attrName: means 'for', 'id', 'name' attribute
        */

            function changeIptName(ele, eleParent, attrName) {
                $(ele, eleParent).each(function() {
                    var defauLabel = $(this).attr(attrName),
                        newLabel,
                        dataCopy = $(this).attr('data-copy');

                    // if attribute contain number, then change that number by index value; else append index value to the end of attribute
                    if (/\d+/g.test(defauLabel) === true) {
                        newLabel = defauLabel.replace(/\d+/g, cloneModIdx);
                    } else {
                        newLabel = defauLabel + '_' + cloneModIdx;
                    }

                    // if clone module has element tit_index, then increase its value by index value
                    if ($('.tit_index', eleParent)) {
                        $(eleParent).find('.tit_index').text(cloneModIdx + 1);
                    }

                    // if cloneMod contain field-validation-error, then change it to field-validation-valid and remove its child node 'span'
                    if ($(ele).hasClass('field-validation-error')) {
                        $('.field-validation-error span', eleParent).remove();
                        $('.field-validation-error', eleParent).attr('class', 'field-validation-valid');
                    }

                    $('.input-validation-error', eleParent).removeClass('input-validation-error');
                    $('.hasDatepicker', eleParent).removeClass('hasDatepicker');

                    // set elements of cloneMod new attribute
                    if (defauLabel != undefined && defauLabel != '') {
                        $(this).attr(attrName, newLabel);
                    }

                    //  if data-copy is 'yes', then reserve the value when copy the module
                    if (dataCopy === undefined || dataCopy === '') {
                        $(this).val('').removeClass('normal');
                    }
                });
            }

            // click btn to delete one textarea
            $('.toggle_con').delegate('.delInfoIco', 'click', function() {
                var textareaIndex = $(this).closest('.toggle_con').find('.mod_input').index($(this).parent()),
                    textareaNum = $(this).closest('.toggle_con').find('.mod_input').length - 1;
                // can't remove first textarea, only can remove last textarea
                if (textareaIndex != 0 && textareaIndex == textareaNum) {
                    $(this).parent().remove();
                }
            });

            // change 'Summary' border when focus on it
            $('#Summary').focus(function() {
                $(this).parent().addClass('on');
            }).blur(function() {
                $(this).parent().removeClass('on');
            });
        },

        // show date customize
        showCustomize: function() {
            $('#customize').click(function(e) {
                $(this).addClass('on');
                $('.fixed_table').show();
                e.stopPropagation();
            });
        },

        // date picker
        datePicker: function() {
            var curYear = new Date().getFullYear(),
                monthOption = {
                    selectedYear: curYear,
                    startYear: curYear - 2,
                    finalYear: curYear + 2
                };

            // set month only
            try {
                $('#from, #to, .only_month').monthpicker(monthOption).bind('monthpicker-hide', function() {
                    var _this = $(this),
                        thisVal = _this.val();

                    if (thisVal != '') {
                        _this.addClass('normal');
                    }
                });
            } catch (e) {}

            // set date and month
            $('body').on('focus', '.date_month', function() {
                // if input is birthdate, need to set suitable year range
                if ($(this).attr('id') === 'Birthdate') {
                    $(this).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        minDate: '-80y',
                        maxDate: '-10y',
                        defaultDate: '-30y',
                        onClose: function() {
                            var _this = $(this),
                                thisVal = _this.val();
                            if (thisVal != '') {
                                _this.addClass('normal');
                            }
                            setTimeout(function() {
                                _this.trigger('blur');
                            }, 100);
                        }
                    });
                } else {
                    $(this).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        minDate: '-10y',
                        maxDate: '0',
                        onClose: function() {
                            var _this = $(this),
                                thisVal = _this.val();
                            if (thisVal != '') {
                                _this.addClass('normal');
                            }
                            setTimeout(function() {
                                _this.trigger('blur');
                            }, 100);
                        }
                    });
                }
            });

            // set date and month for meeting room
            $('body').on('focus', '.date_month_meeting', function() {
                $(this).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    minDate: '-10y',
                    maxDate: '+1y',
                    onClose: function() {
                        var _this = $(this),
                            thisVal = _this.val();
                        if (thisVal != '') {
                            _this.addClass('normal');
                        }
                        setTimeout(function() {
                            _this.trigger('blur');
                        }, 100);
                    }
                });
            });

            // stopPropagation
            $('.ui-datepicker').click(function(e) {
                e.stopPropagation();
            });
        },

        // structure report chart range select
        rangeSelect: function() {
            var curMon = new Date().getMonth();

            $('.tab_chart .auto_btn_h16').click(function() {
                $(this).addClass('on').siblings('.auto_btn_h16').removeClass('on');
            });
            $('#6_month').click(function() {
                var chart = $('#report_con_1').highcharts(),
                    startMonth = curMon - 5;
                // if current month equal or before June, then show data from January -- June.
                if (startMonth < 1) {
                    chart.xAxis[0].setExtremes(0, 5);
                } else {
                    chart.xAxis[0].setExtremes(startMonth, curMon);
                }
            });
            $('#ytd').click(function() {
                var chart = $('#report_con_1').highcharts();
                chart.xAxis[0].setExtremes(0, curMon);
            });
            $('#1_year').click(function() {
                var chart = $('#report_con_1').highcharts();
                chart.xAxis[0].setExtremes(0, 11);
            });
        },

        // add class to staff table
        staffTableClass: function(tableId) {
            // var target = $(tableId + (' thead th:lt(2)')).addClass('first_two');
            // $('tbody tr', tableId).eq(0).addClass('first_tr');
            // $('tbody tr', tableId).each(function() {
            //     $('td:lt(2)', this).addClass('first_two');
            // });

            $(tableId).delegate('thead th', 'click', function() {
                $('tbody tr', tableId).removeClass('first_tr');
                fedPris.staffTableClass(tableId);
            });
        },

        // edit and then select project for .staff_table
        editSlctProj: function() {
            // action edit
            $('.act_edit').click(function() {
                var $tableObj = $(this).parent().siblings('.staff_table');

                $(this).hide().siblings('.act_more').show();
                $tableObj.find('.proj_slct').show();
                $tableObj.find('.proj_slct').siblings('.proj_slcted').hide();

                return false;
            });

            // action cancel
            $('.act_cancel').click(function() {
                var $tableObj = $(this).parent().parent().siblings('.staff_table');

                $(this).parent().hide();
                $(this).parent().siblings('.act_edit').show();
                $tableObj.find('.proj_slcted').show();
                $tableObj.find('.proj_slcted').siblings('.proj_slct').hide();
            });
        },

        // get title property and change it to tooltip
        titleTips: function(id) {
            var titEle,
                titEleClass,
                // hover element's title attribution
                titCon,
                // html code of #tool_tip
                tipCon,
                // #tool_tip left value
                tipLeft,
                // #tool_tip top value
                tipTop,
                // hover element's height
                titEleH,
                // hover element's width
                titEleW,
                // hover element's data-title attribute
                dataTit;

            if (id === undefined) {
                titEle = $('.tit_tip, input, div, button, i, span');
            } else {
                titEle = $(id);
            }

            $(titEle).mouseenter(function() {
                var _this = $(this);
                dataTit = _this.attr('data-title');
                titCon = _this.attr('title');

                // if 'data-title' of hover element equal 'no_tit_tip' or it has no title attribute, then return
                if (dataTit === 'no_tit_tip' || titCon === undefined) return;

                // add new attribute 'data-title' to hover element
                if (dataTit == undefined || dataTit == '') {
                    titCon = this.title;
                    _this.attr('data-title', titCon);
                } else {
                    titCon = dataTit;
                }

                // remove title attribute
                this.title = '';
                // get hover element's height
                titEleH = _this.outerHeight();
                titEleW = _this.outerWidth();

                // if there is title attribute in elements
                if (titCon != undefined && titCon != '') {
                    // get hover element's top and left value
                    tipLeft = _this.offset().left;
                    tipTop = _this.offset().top + titEleH + 8;

                    // if there is not #tool_tip, create it
                    if ($('#tool_tip').length === 0) {
                        tipCon = '<div id="tool_tip" class="tool_tip" style="left:' + tipLeft + 'px; top:' + tipTop + 'px;"><i></i><div class="tool_txt">' + titCon + '</div></div>';
                        $('.pageWrapper').append(tipCon);
                    } else {
                        // if #tool_tip exists, just change its text
                        $('#tool_tip').css({
                            'left': tipLeft,
                            'top': tipTop
                        });
                        $('#tool_tip .tool_txt').html(titCon);
                    }

                    if (id !== undefined) {
                        titEleClass = id.replace(/[.#]/, '') + '_tool_tip';
                        $('#tool_tip').addClass(titEleClass);
                    }

                    $('#tool_tip').show();
                }
            }).mouseleave(function() {
                // hide #tool_tip when mouseout
                $('#tool_tip').hide();
                $('#tool_tip').attr('class', 'tool_tip');
            });
        },

        /**
         * === show pop up window
         * id: elements to show, id or class;
         * maskOut: {boolean} show #pop_win_mask or not;
         * maskIn: {boolean} show .pop_win_in_mask or not;
         * autoClose: setTimeout of pop up window, ms, fox example: autoClose: 3000. Default is false;
         * newPop: {html string} if need to create a pop up content;
         * outAreaClose: {boolean} true: close pop up window from outside of pop up, or false. Default is true;
         * fixed: {boolean} true: position:fixed, false: position:absolute. Default is true;
         *
         * === example:
         * ====== fedPris.popWinShow({
         *  id: "#pop_win_unlock",
         *  maskOut: true,
         *  maskIn: false,
         *  autoClose: 3000,
         *  newPop: (newPop's html),
         *  outAreaClose: true,
         *  fixed: true
         *  });
         */
        popWinShow: function(option) {
            var pop = $('#pop_win'),
                popIn = $('.pop_win_in'),
                mask = $('#pop_win_mask'),
                inMask = $('#pop_win .pop_win_in_mask'),
                // default options
                defaultOpt = {
                    maskOut: true,
                    maskIn: false,
                    autoClose: false,
                    outAreaClose: true,
                    fixed: true
                },
                closePop,
                popW,
                popTopV,
                popLeftV;

            var opt = {};
            opt = $.extend(defaultOpt, option);

            // clear #pop_win attribute width and margin
            pop.attr('style', '');
            // show pop and mask
            $(opt.id).show().siblings().hide();
            opt.maskOut === true ? mask.show() : mask.hide();
            opt.maskIn === true ? inMask.show() : inMask.hide();

            // create new pop up
            if (opt.newPop !== undefined) {
                // if no related pop up win, then create it
                if ($(opt.id).length === 0) {
                    pop.append(opt.newPop);
                }
                // else only show it
                $(opt.id).show().siblings().hide();
            }

            // pop up window auto close
            if (opt.autoClose !== false) {
                setTimeout(function() {
                    closePop();
                }, opt.autoClose);
            };

            // close pop up window from outside of pop up
            if (opt.outAreaClose === true) {
                mask.click(function() {
                    closePop();
                });
            }

            // set #pop_win to position fixed or absolute
            if (opt.fixed) {
                pop.removeClass('pop_win_absolute');
            } else {
                pop.addClass('pop_win_absolute');
                var scrollTopV = $(window).scrollTop() + 50;
                if (scrollTopV > 150) {
                    pop.css('top', scrollTopV);
                }
            }
            // if position of pop is fixed, then set #pop_win top value automatically; if position of pop is absolute, then use fixed value
            popW = $(opt.id).outerWidth();
            popTopV = -($(opt.id).outerHeight() / 2) + 'px';
            popLeftV = -(popW / 2) + 'px';
            pop.css({
                'width': popW,
                'marginTop': popTopV,
                'marginLeft': popLeftV
            });

            // click to close pop up window
            pop.on('click', '.pop_win_close', function() {
                closePop();
            });

            // close pop up window
            closePop = function() {
                // if the pop up window is new created, remove it; if not, just hide it
                opt.newPop === undefined ? $(opt.id).hide() : $(opt.id).remove();
                popIn.hide();
                mask.hide();
                inMask.hide();
            }
        },

        /**
         * close all pop up window
         * @param {num} time excu funtion after the time. 3000 is 3 seconds.
         */
        closeAllPop: function(time) {
            var popIn = $('#pop_win .pop_win_in'),
                mask = $('#pop_win_mask'),
                inMask = $('#pop_win .pop_win_in_mask');

            if (time === undefined) {
                popIn.hide();
                mask.hide();
                inMask.hide();
            } else {
                setTimeout(function() {
                    popIn.hide();
                    mask.hide();
                    inMask.hide();
                }, time)
            }

        },

        /**
         * === TODO: drop this function, replace it with function 'dialog'
         * === confirm dialog to replace system's alert function
         * id: id or class. Default is '#pop_win_unlock'.
         * message: {string} the content will be showed in .js_message of #pop_win_unlock.
         * clickId: {string} when pop up window shows, click clickId, then excute function 'excuFun'. Default is null.
         * excuFun: {function} click clickId, then excute this function. Default is null.
         */
        confirmDialog: function(option) {
            // default options
            var defaultOpt = {
                id: "#pop_win_unlock",
                message: '',
                clickId: null,
                excuFun: null
            };

            var opt = {};
            opt = $.extend(defaultOpt, option);

            // set content in .js_message
            if (opt.message !== '') {
                $('.js_message', opt.id).text(opt.message);
            }

            // click clickId, excute function 'excuFun'
            if (opt.excuFun !== null && opt.clickId !== null) {
                $(opt.clickId).unbind().bind('click', function() {
                    (opt.excuFun && typeof(opt.excuFun) === "function") && opt.excuFun();
                });
            }

            // show related pop up window
            fedPris.popWinShow({
                id: opt.id,
                maskIn: true,
                maskOut: true
            });
        },

        /**
         * === confirm dialog to replace system's alert function
         * id: dialog's id or class. Default is '#pop_win_dialog'.
         * message: {string} the content will be showed in .js_message of dialog.
         * type: {string}, there are two types: confirm or alert, alert type of dialog do not have message and only have one button. Default is 'confirm'.
         * btnOkTxt: {string}, text showing ok button. Default is Ok.
         * btnCancelTxt: {string}, text showing cancel button. Default is Cancel.
         * clickId: {string} when pop up window shows, click clickId, then excute function 'excuFun'. Default is null.
         * excuFun: {function} click clickId, then excute this function. Default is null.
         *
         * === example:
         * ====== alert dialog:
         * fedPris.dialog({
         *      message: "test",
         *      type: "alert"
         *   });
         *
         * ====== confirm dialog:
         * fedPris.dialog({
         *      message: "xxxxxxxxxxxdlfsjdlfskdlf",
         *      clickId: ".sbmt",
         *      excuFun: changeMesg
         * });
         */
        dialog: function(option) {
            // default options
            var defaultOpt = {
                id: "#pop_win_dialog",
                message: '',
                type: "confirm",
                btnOkTxt: 'Ok',
                btnCancelTxt: 'Cancel',
                clickId: null,
                excuFun: null
            },
                // id of dialog
                dialogId,
                // html string of dialog
                dialogStr,
                // top html string of dialog
                dialogTop,
                // bottom html string of dialog
                dialogBotm,
                // message of dialog
                dialogMsg,
                // buttons of dialog
                dialogBtn;

            var opt = {};
            opt = $.extend(defaultOpt, option);

            // replace .# of id or class
            dialogId = opt.id.replace(/[.|#]/g, '');

            // top html string of dialog
            dialogTop = "<div id='" + dialogId + "' class='pop_win_in pop_win_dialog'>";
            // bottom html string of dialog
            dialogBotm = "</div>";
            // message of dialog
            opt.message === '' ? dialogMsg = '' : dialogMsg = "<p class='tc js_message'>" + opt.message + "</p>";
            // buttons of dialog
            if (opt.type === 'confirm') {
                dialogBtn = "<p class='tc mt'><button class='auto_c_btn cancel pop_win_close' type='button'>" + opt.btnCancelTxt + "</button><button class='auto_c_btn prim sbmt' type='button'>" + opt.btnOkTxt + "</button></p>";
            } else {
                dialogBtn = "<p class='tc mt'><button class='auto_c_btn prism pop_win_close' type='button'>" + opt.btnOkTxt + "</button></p>";
            }

            // join html string of dialog
            dialogStr = dialogTop + dialogMsg + dialogBtn + dialogBotm;
            // append dialog to page
            $('#pop_win').append(dialogStr);

            // click clickId, excute function 'excuFun'
            if (opt.excuFun !== null && opt.clickId !== null) {
                $(opt.clickId).unbind().bind('click', function() {
                    (opt.excuFun && typeof(opt.excuFun) === "function") && opt.excuFun();
                });
            }

            // show related pop up window
            fedPris.popWinShow({
                id: '#' + dialogId,
                maskIn: true,
                maskOut: true
            });

            // click to remove dialog
            $('#pop_win').on('click', '.pop_win_close', function() {
                // $('#pop_win').attr('style', '');
                $(opt.id).remove();
            });
        },

        // click to show pop up window to add headcount
        addHeadc: function() {
            $('body').on('click', '.action_p', function(e) {
                var _this = $(this);

                _this.siblings('.pop_headc').show();
                _this.closest('tr').siblings().find('.pop_headc').hide();
                e.stopPropagation();
            });

            // click to hide pop up window
            $('body').on('click', '.pop_headc .close', function() {
                $(this).closest('.pop_headc').hide();
            });

            // click other places to hide pop up window
            $('body').click(function() {
                $('.pop_headc').hide();
            });

            // stopPropagation when click on pop up window
            $('body').on('click', '.pop_headc', function(e) {
                e.stopPropagation();
            });
        },

        // profile page back to previous page and print
        print: function() {
            $(".black_btn:contains('Print'), .print_btn").click(function() {
                window.print();
            });
        },

        /**
         * set all input and textarea of special id to disabled
         * id: id or calss of element
         * not: elements which not disabled
         */
        disableIpt: function(id, status, not) {
            var textEle = $('.text, select', id).not(not),
                textareaEle = $('textarea', id).not(not);

            if (status === 'open') {
                textEle.removeProp('disabled').removeClass('disabled');
                textareaEle.removeProp('readonly').removeClass('disabled');
            } else {
                textEle.prop('disabled', 'disabled').addClass('disabled');
                textareaEle.prop('readonly', 'readonly').addClass('disabled');
            }
        },

        /**
         * elements multiple select
         * id: id of module multiple select
         */
        selectMulti: function(id) {
            var newId = id.replace(/[.#]/, ''),
                jsParent = id + ' .js_parent';

            // don't highlight text when click with shift or ctrl key
            try {
                document.getElementById(newId).onselectstart = function() {
                    return false;
                }
            } catch (e) {}

            // click on each row to select elements
            $(id).on('click', '.js_parent', function(e) {
                var _this = $(this),
                    ele = $(jsParent),
                    selectedEle = _this.parent().find('.selected'),
                    selectedEleLen = selectedEle.length,
                    _thisIdx = ele.index(_this);

                if (_this.hasClass('selected')) {
                    if (e.ctrlKey || e.shiftKey) {
                        _this.removeClass('selected');
                    } else {
                        selectedEleLen === 0 ? _this.removeClass('selected') : _this.siblings().removeClass('selected');
                    }
                } else {
                    e.ctrlKey ? _this.addClass('selected') : _this.addClass('selected').siblings().removeClass('selected');

                    if (e.shiftKey) {
                        ele.removeClass('selected');
                        if (selectedEleLen === 0) {
                            ele.removeClass('selected');
                            for (var i = 0; i < (_thisIdx + 1); i++) {
                                ele.eq(i).addClass('selected');
                            }
                        } else {
                            var idxAray = [],
                                eachIdx,
                                minIdx,
                                maxIdx;

                            selectedEle.each(function() {
                                eachIdx = ele.index($(this));
                                idxAray.push(eachIdx);
                            });

                            minIdx = Math.min.apply(Math, idxAray);
                            maxIdx = Math.max.apply(Math, idxAray);

                            if (_thisIdx > maxIdx) {
                                for (var i = minIdx; i < (_thisIdx + 1); i++) {
                                    ele.eq(i).addClass('selected');
                                }
                            } else if (_thisIdx < minIdx) {
                                for (var i = _thisIdx; i < (maxIdx + 1); i++) {
                                    ele.eq(i).addClass('selected');
                                }
                            }
                        }
                    }
                }

            });

            /**
             * dblclick on each row to select elements
             */
            $(id).on('dblclick', '.js_parent', function() {
                var _this = $(this),
                    _thisParent = _this.parent();

                if (_thisParent.hasClass('js_tls_result')) {
                    $('.to_l', id).triggerHandler('click');
                } else {
                    $('.to_r', id).triggerHandler('click');
                }
            });

            // click right or left arrow to add or delete selected data
            $('.tls_btn span', id).click(function() {
                var _this = $(this);

                if (_this.hasClass('to_r')) {
                    // move selected person to right of pop up window .js_tls_result
                    fedPris.moveSlctToR(id);
                } else {
                    var slctEid;

                    // remove selected person from right to left in pop up window
                    $('.js_tls_result .selected', id).each(function() {
                        var _that = $(this);

                        slctEid = _that.attr('eid');
                        $(".tls_table .js_parent[eid='" + slctEid + "']", id).show().removeClass('selected js_none');
                        _that.remove();
                    });
                }
            });
        },

        /**
         * move selected person to right of pop up window .js_tls_result
         * id: id of module multiple select
         */
        moveSlctToR: function(id) {
            var clonedHtml = '',
                selectedId,
                selectedName,
                // selected ele on left of pop up window
                selectedEle,
                selectedNameFilter,
                // right of pop up window .js_tls_result
                container;

            selectedEle = $('.tls_table .selected', id);
            container = $('.tls_result', id);

            selectedEle.each(function() {
                selectedId = $('td:first', this).text(),
                selectedName = $('td:last', this).text(),
                selectedNameFilter = selectedName.replace(/\'/, '-');

                clonedHtml += "<p class='js_parent' ename='" + selectedNameFilter + "' eid=" + selectedId + "><span class='js_child'>" + selectedId + "</span>/<span class='js_child'>" + selectedName + "</span></p>";
            });

            selectedEle.addClass('js_none').removeClass('selected').hide();
            $(clonedHtml).appendTo(container);
        },

        /**
         * team leader selector
         * id: id of module multiple select
         */
        selectTL: function(id) {
            var idx,
                slctBtn = $('.tls_slct_btn'),
                dataUrl,
                filterIpt = id + ' .js_tls_ipt .text';

            // detect each tls_selected_list is blank or not: if not blank, then show it
            $('.tls_selected_list').each(function() {
                var _this = $(this),
                    tagP = $('p', _this),
                    tagPLen = tagP.length;

                if (tagPLen > 0) {
                    _this.show();
                }
            });

            // focus on input .offshor_mana and show pop up window
            // slctBtn.click(function() {
            //if this page is locked, then can't select person
            var _this = $(this),
                popTitle = _this.parent().siblings('.label').text().replace(/\*|\:/g, '') + ' selector',
                filterDefauStr = $(filterIpt).removeClass('normal').attr('tip'),
                dataUrl = $(id).attr('data-source-idName'),
                jsTableTrLen = $('.js_parent', id).length;

            // if there is data in .js_table>.in>table, don't loading json data again
            if (jsTableTrLen === 0) {
                // append loading tip
                $('.js_table .in', id).append("<p id='tls_tip' class='mt tc'>Loading, please wait...</p>");
                // loading data
                $.getJSON(dataUrl, function(data) {
                    var nameList = data;

                    // render name list to pop up window
                    renderName(nameList);
                    // filter data by input txt
                    fedPris.listFilter(filterIpt, (id + ' .js_table .js_parent'));
                }).done(function() {
                    // hide loading tip
                    $('#tls_tip').hide();
                });
            }

            // set pop up window's title
            // $(id + '>h4').text(popTitle);
            // reset filter input's value
            $(filterIpt).val(filterDefauStr);
            // get index of select button on age
            idx = $('.tls_slct_btn').index(_this);
            // set a mark for pop up window to check user clicking same btn or not
            $(id).attr('data-idx', idx);
            // clear result on the right of pop up window
            $('.js_tls_result', id).html('');
            // show and reset class for the left rows of pop up window
            $('.js_table tbody tr', id).show().removeClass('selected js_none');

            // elements multiple select
            fedPris.selectMulti(id);
            _this.siblings('.tls_selected_list').find('.js_parent').each(function() {
                var slctEid = $(this).attr('eid');
                $(".tls_table .js_parent[eid='" + slctEid + "']", id).addClass('selected');
            });
            // move selected person to right of pop up window .js_tls_result
            fedPris.moveSlctToR(id);
            // });

            /**
             * render name list to pop up window
             */

            function renderName(data) {
                var list = data,
                    listLen = list.length,
                    i,
                    eachListHtml,
                    rightListHtml = '',
                    listHtml = '';

                // get each person's id and name
                for (i = 0; i < listLen; i++) {
                    if (list[i].selected === 'true') {
                        eachListHtml = "<tr class='js_parent none' eid=" + list[i].id + "><td>" + list[i].id + '</td><td>' + list[i].name + "</td></tr>";

                        // only get numbers of selectedObj.id
                        var selectedId = list[i].id.replace(/^[A-Za-z]/gi, ''),
                            selectedName = list[i].name.replace(/\-/, "'");
                        rightListHtml += "<p class='js_parent' ename='" + selectedName + "' eid=" + selectedId + "><span class='js_child'>" + list[i].id + "</span>/<span class='js_child'>" + list[i].name + "</span></p>";

                        $('.js_tls_result', id).html('').append(rightListHtml);
                    } else {
                        eachListHtml = "<tr class='js_parent' eid=" + list[i].id + "><td>" + list[i].id + '</td><td>' + list[i].name + "</td></tr>";
                    }
                    listHtml += eachListHtml;
                }
                // append all person to pop up window
                $('.js_table tbody', id).html('').append(listHtml);
            }

            // click ok btn to get and submit selected data
            $('.sbmt', id).click(function() {
                var selectedAray = [],
                    selectedObj = {},
                    selectedId,
                    idNumber,
                    selectedName,
                    selectedNameFilter,
                    clonedHtml = '',
                    tlsSelectedList = $('.tls_selected_list').eq(idx);

                $('.js_tls_result p', id).each(function() {
                    var _this = $(this);

                    selectedObj.id = _this.attr('eid'),
                    // only get numbers of selectedObj.id
                    idNumber = selectedObj.id.replace(/^[A-Za-z]/gi, ''),
                    selectedObj.name = _this.attr('ename');
                    selectedNameFilter = selectedObj.name.replace(/\-/, "'");

                    clonedHtml += "<p class='js_parent' ename='" + selectedObj.name + "' eid=" + selectedObj.id + "><a href='/Profile/Edit?userId=" + idNumber + "'><span class='js_child'>" + selectedObj.id + "</span><span>/</span><span class='js_child'>" + selectedNameFilter + "</span></a><i class='delIco'></i></p>";
                    selectedAray.push(selectedObj);
                });

                if (selectedAray.length === 0) return;
                tlsSelectedList.html('').append(clonedHtml).show();
                // get selected person's name, and append them to input's value
                fedPris.storeSlctVal(tlsSelectedList, idx);
            });

            /**
             *  delete selected person
             * aray: Array of selected person's eid
             */
            $('.tls_selected_list').on('click', '.delIco', function() {
                //if this page is locked, then can't select person
                if ($('.proj_status:isChecked').val() === 'Close' || $('input#close').length === 0) return;

                var _this = $(this),
                    _thisIdx = $('.tls_slct_btn').index(_this.closest('.tls_selected_list').siblings('.tls_slct_btn')),
                    delPerson = _this.parent().attr('eid'),
                    childLen = $('.tls_selected_list p').length - 1,
                    tlsSelectedList = $('.tls_selected_list').eq(_thisIdx);

                if (childLen === 0) {
                    $('.tls_selected_list').hide();
                }
                _this.parent().remove();
                // show person in pop up window after delete selected person
                fedPris.showDeleted(delPerson, id);
                // get selected person's name, and append them to input's value
                fedPris.storeSlctVal(tlsSelectedList, _thisIdx);
            });

        },

        /**
         * filter data by input txt
         * ipt: which input to type text
         * list: which list to be searched
         */
        listFilter: function(ipt, list) {
            var newList = $(list);

            $(ipt).keyup(function() {
                var _this = $(this),
                    _thisVal = _this.val(),
                    _thisValLen = _thisVal.length;

                // only excu when type more than 4 chars
                if (_thisValLen > 1) {
                    newList.each(function() {
                        var _that = $(this),
                            _thatStr = _that.text();
                        /**
                         * search by typed string:
                         * if not match, hide list items;
                         * if matche, show the related list items (exclude which on the right of pop up window);
                         */
                        setTimeout(function() {
                            _that.hasClass('js_none') || _thatStr.search(new RegExp(_thisVal, 'i')) < 0 ? _that.hide() : _that.show();
                        }, 500);
                    });
                } else {
                    newList.not('.js_none').show();
                }
            });
        },

        /**
         * show person after delete selected person on pop up window
         * eid: eid of deleted person
         */
        showDeleted: function(eid, id) {
            var localEid = eid,
                newId = id;

            $('.js_table tbody tr', newId).each(function() {
                var _this = $(this),
                    thisEid = _this.attr('eid');

                if (thisEid === localEid) {
                    _this.show();
                }
            });

            $('.js_tls_result .js_parent', newId).each(function() {
                var _this = $(this),
                    thisEid = _this.attr('eid');

                if (thisEid === localEid) {
                    _this.remove();
                }
            });
        },

        /**
         * get selected person's name, and append them to input's value
         * id: the selected person where to show on the page
         * idx: index value of which module
         */
        storeSlctVal: function(id, idx) {
            var newId = id,
                newIdx = idx,
                selectedName,
                selectedNameFilter,
                clonedName = '',
                clonedId = '';

            $('p', newId).each(function() {
                var _this = $(this);

                selectedId = _this.attr('eid');
                selectedName = _this.attr('ename');
                selectedNameFilter = selectedName.replace(/\-/, "'");
                clonedId += selectedId + '/';
                clonedName += selectedNameFilter + '/';
            });

            // set input value as selected person and id
            $('.tls_slctId').eq(newIdx).val(clonedId);
            $('.tls_slctName').eq(newIdx).val(clonedName);
        },

        /**
         * trigger same select on page
         * if two or more select have same class, the others will be triggered to be selected when click one of them
         */
        TriggerSameSlct: function() {
            $('select').change(function() {
                var _this = $(this);

                if (_this.attr('data-group') === undefined) return;

                var _thisGroup = _this.attr('data-group'),
                    _thisTxt = $('option:selected', _this).text();

                $('select').each(function() {
                    var _that = $(this),
                        _thatGroup = _that.attr('data-group');

                    if (_thisGroup === _thatGroup) {
                        $('option', _that).each(function() {
                            var _thisOpt = $(this),
                                _thisOptTxt = _thisOpt.text();

                            if (_thisTxt === _thisOptTxt) {
                                _thisOpt.prop('selected', 'selected');
                            }
                        });
                    }
                });
            });
        },

        /**
         * blur a hidden input when focus on it
         */
        blurHiddenIpt: function(ipt) {
            $(ipt).click(function() {
                $(this).blur();
            });
        },

        /**
         * jQuery plugins zTree
         * @param  {object} id, tree's id
         * @param  {[type]} option, which zTree setting option to choose
         */
        zTree: function(option) {
            var defaultOpt = {},
                opt = $.extend(defaultOpt, option),
                strId = opt.id.replace(/[.#]/, ''),
                newCount = 1,
                className = "dark",
                curMenu = null,
                zTree_Menu = null,
                zTree,
                apiPrefix = $('#api_prefix').val(),
                hashId = Number(window.location.hash.replace(/\B#.*\B:/, '')),
                // tree's default setting
                setting01 = {
                    view: {
                        addHoverDom: addHoverDom,
                        removeHoverDom: removeHoverDom,
                        showIcon: false
                    },
                    edit: {
                        enable: true,
                        showRenameBtn: false,
                        drag: {
                            isCopy: false,
                            isMove: false
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: onClick,
                        beforeRemove: beforeRemove,
                        onRemove: zTreeOnRemove
                    }
                },
                // tree's setting option 2
                setting02 = {
                    view: {
                        showIcon: false
                    },
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: onClick,
                        beforeRemove: beforeRemove
                    }
                },
                // tree's setting option 2
                setting03 = {
                    view: {
                        showIcon: false
                    },
                    edit: {
                        enable: false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: onClick,
                        beforeRemove: beforeRemove
                    }
                },
                setting = {};

            // which zTree setting option to choose
            if (opt.setting === '1') {
                setting = setting01;
            } else if (opt.setting === '2') {
                setting = setting02;
            } else {
                setting = setting03;
            }

            $(opt.id).append('<p class="tip_loading" id="tip_loading">Loading....</p>');

            /**
             * mouseover to show add button, and add new node to tree
             * @param {string} treeId
             * @param {object} treeNode
             */

            function addHoverDom(treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";

                // when hover a node, and this node's level > opt.showAddBtnOnLevel, than hide add btn
                if (opt.showAddBtnOnLevel === undefined) {
                    sObj.after(addStr);
                } else {
                    if (treeNode.level <= Number(opt.showAddBtnOnLevel)) {
                        sObj.after(addStr);
                    }
                }

                var btn = $("#addBtn_" + treeNode.tId);

                if (btn) btn.bind("click", function() {
                    zTree.addNodes(treeNode, {
                        id: (99999 + newCount),
                        pId: treeNode.id,
                        name: "new node"
                    });

                    // delete or add node by node id
                    delAddNode(treeNode.id, 'add');

                    return false;
                });
            };
            /**
             * alert before remove node
             * @param {string} treeId
             * @param {object} treeNode
             */

            function beforeRemove(treeId, treeNode) {
                className = (className === "dark" ? "" : "dark");
                zTree.selectNode(treeNode);
                return confirm("Are you sure to delete node " + treeNode.name + "?");
            }
            /**
             * mouseleave to hide add button
             * @param {string} treeId
             * @param {object} treeNode
             */

            function removeHoverDom(treeId, treeNode) {
                $("#addBtn_" + treeNode.tId).unbind().remove();
            };
            /**
             * trigger when click on the tree: remove mask and load new page for different menu
             * @return {[type]} [description]
             */

            function onClick(treeId, treeNode, clickFlag) {
                var nodes = zTree.getSelectedNodes(),
                    newUrl = generateNewHref(nodes[0].id);

                $('.mask_adm_r').hide();

                if (opt.menuHasLink) {
                    window.location = newUrl;

                    // destroy zTree object first
                    $.fn.zTree.destroy('tree_roleGroup');
                    // them init a new zTree object again
                    fedPris.zTree({
                        id: '#tree_roleGroup',
                        // zTree's setting option
                        setting: '2',
                        // get json data base on custom url
                        dataUrl: $('#tree_roleGroup').attr('data-source') + nodes[0].id
                    });
                }
            }
            /**
             * highlight Menu by id in url
             * @param  {number} id
             */

            function highlightMenu(menuid) {
                var curMenu = zTree.getNodeByParam('id', menuid, null);
                zTree.selectNode(curMenu);
            }
            /**
             * generate new href by current url
             * @param  {number} id
             */

            function generateNewHref(menuid) {
                var _hash = '/:' + menuid,
                    _href = 'http://' + window.location.href.replace(/http\:\/\//g, '').replace(/\/:.*/, ''),
                    newHref = _href + _hash;

                return newHref;
            }
            /**
             * call back when removed node
             * @param  {object} event
             * @param  {number} treeId  id of removed node
             * @param  {object} treeNode removed node
             */

            function zTreeOnRemove(event, treeId, treeNode) {
                // delete or add node by node id
                delAddNode(treeNode.id, 'delete');
            }
            /**
             * delete or add node by node id
             * @param  {number} nodeId id of node
             * @param  {string} method action to this node id: delete or add
             */

            function delAddNode(nodeId, method) {
                var addUrlPrefix = apiPrefix + $('#postPrefix_add').val(),
                    delUrlPrefix = apiPrefix + $('#postPrefix_del').val(),
                    addUrl,
                    delUrl;

                if (method === 'add') {
                    // show loading image
                    fedPris.popWinShow({
                        id: ".pop_loading",
                        maskOut: true,
                        maskIn: true,
                        outAreaClose: false
                    });

                    addUrl = addUrlPrefix + nodeId;
                    $.post(addUrl, function(data) {
                        if (data.success) {
                            node = zTree.getNodeByParam('id', '100000', null);
                            // update node's property id
                            node.id = data.id;
                            zTree.updateNode(node[0]);
                            // hide loading image
                            fedPris.closeAllPop(3000);
                            var newUrl = generateNewHref(node.id);
                            window.location = newUrl;
                            // highlight Menu by id in url
                            highlightMenu(node.id);
                        } else {
                            alert('Add new node failed, please try again later.')
                        }
                    });
                } else {
                    delUrl = delUrlPrefix + nodeId;
                    $.post(delUrl, function(data) {
                        if (data.success) {
                            // hide loading image
                            fedPris.closeAllPop(3000);
                        } else {
                            alert('Delete node failed, please try again later.')
                        }
                    });
                }
            }

            // get json url
            var nodeUrl;
            if (opt.dataUrl !== undefined) {
                isNaN(hashId) ? nodeUrl = opt.dataUrl : nodeUrl = $('#tree_roleGroup').attr('data-source') + hashId;
            } else {
                nodeUrl = $(opt.id).attr('data-source');
            }

            // if there is no zTree id to init, return
            if ($(opt.id).length === 0) return;

            // render zTree by json
            $.getJSON(nodeUrl, function(response) {
                var unableNodes,
                    i,
                    len;

                $('#tip_loading').remove();
                // destroy zTree object first
                $.fn.zTree.destroy(strId);
                // tree init
                $.fn.zTree.init($(opt.id), setting, response);
                zTree = $.fn.zTree.getZTreeObj(strId);
                zTree.expandAll(true);

                // get nodes which have prop enable false, and set their color
                unableNodes = zTree.getNodesByParam("enable", false, null);
                len = unableNodes.length;
                for (i = 0; i < len; i++) {
                    unableNodes[i].font = "'font-style':'italic'";
                    zTree.setting.view.fontCss["color"] = '#999';
                    zTree.updateNode(unableNodes[i]);
                }

                // set related node to selected by id in url
                if (opt.defaultNode !== undefined) {
                    isNaN(hashId) ? highlightMenu(opt.defaultNode) : highlightMenu(hashId);
                }
            });

            // submit tree changes
            if ($('#tree_roleGroup').length > 0) {
                $(document).off().on('click', '.sbmt', function() {
                    var treeObj = $.fn.zTree.getZTreeObj('tree_roleGroup'),
                        changedNodes = treeObj.getChangeCheckedNodes(),
                        newChangedNodes = [],
                        changedNodesObj = {};

                    // set changed node object's id
                    if (isNaN(hashId)) {
                        changedNodesObj.id = 1;
                    } else {
                        changedNodesObj.id = hashId;
                    }

                    // get changed node object's id ang checked propertity
                    for (var i = 0, len = changedNodes.length; i < len; i++) {
                        var newObj = {};
                        if (changedNodes[i].id !== 1) {
                            newObj.id = changedNodes[i].id;
                            newObj.checked = changedNodes[i].checked;
                            newChangedNodes.push(newObj);
                        }
                    }
                    // set changed node object's selectedMenu
                    changedNodesObj.selectedMenu = newChangedNodes;
                    // submit action
                    if (newChangedNodes.length > 0) {
                        var url = apiPrefix + $('#post_sbmtMenuRole').val();

                        $.post(url, changedNodesObj, function(data) {
                            if (data.success) {
                                $('#flat_roleMenu').val('success');
                            } else {
                                alert('Add new node failed, please try again later.')
                            }
                            // hide loading image
                            // fedPris.closeAllPop();
                        });
                    } else {
                        $('#flat_roleMenu').val('noChanged');
                    }
                });
            };
        },

        /**
         * simulate rowspan effect in table
         */
        rowSpan: function() {
            $('td').each(function() {
                var $this = $(this);

                if ($this.hasClass('.js_combine')) {
                    $this.hide();
                }
            });
        },

        /**
         * show or hide pop up window to add new record to table
         * @param  {[type]} eleId: id of pop up window
         */
        ngShowPop: function(eleId) {
            // show pop up window
            $(document).on('click', '.js_showPopBtn', function() {
                fedPris.popWinShow({
                    id: eleId,
                    maskOut: true,
                    maskIn: false
                });
            });
        },

        /**
         * show loading pop up window
         * @return {[type]} [description]
         */
        ngShowLoading: function() {
            $(document).on('click', '.js_showPopBtn', function() {
                fedPris.popWinShow({
                    id: '#pop_loading',
                    maskOut: false,
                    maskIn: true
                });
            });
        },

        // common functions for pris admin pages
        common: function() {
            this.navHover(); // nav hover
            this.rowSpan(); // nav hover
            this.inputTips(); // show and hide text type inputs' text tips
            this.tdEvenOdd();
        },

        // function of set menu privilege page
        setMenuRole: function() {
            this.navHover(); // nav hover
            this.inputTips(); // show and hide text type inputs' text tips
            // this.sortTable('#angularWrap table'); // sort table  
            // this.selectTL('#tls_menuPriv'); // team leader selector
            this.zTree({
                id: '#tree_menuPriv',
                // zTree's setting option
                setting: '1',
                // hightlight one default node
                defaultNode: '3',
                // click menu to load new data or not
                menuHasLink: true
            }); // tree
            this.zTree({
                id: '#tree_roleGroup',
                // zTree's setting option
                setting: '2',
                // get json data base on custom url
                // used for debug
                dataUrl: $('#tree_roleGroup').attr('data-source') + ''
                // dataUrl: $('#tree_roleGroup').attr('data-source') + '1'
            });
            this.zTree({
                id: '#tree_roleMenu',
                // zTree's setting option
                setting: '1',
                // hightlight one default node
                defaultNode: '1',
                // when hover a node, and this node's level > 0, than hide add btn
                showAddBtnOnLevel: '0',
                // click menu to load new data or not
                menuHasLink: true
            }); // tree
            this.modShowHide(); // mod show or hide
        }
    }
