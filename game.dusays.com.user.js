// ==UserScript==
// @name         game.dusays.com自动云端存档
// @namespace    http://bmqy.net/
// @version      1.0.0
// @description  支持game.dusays.com平台挂机放置小游戏自动云端存档
// @author       bmqy
// @match        https://game.dusays.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dusays.com
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.c-tooltip-content .Backpack{width:60px;}.c-tooltip-content .Backpack img{vertical-align:middle;}');

    // Your code here...
    const AutoSync = {
        // 自动保存倒计时：秒
        interval: 10,
        storeKey: 'game.dusays.com',
        // 自动保存
        bindAutoSave(){
            window.onload = function(){
                // 保存进度按钮增加倒计时显示
                let $btn = document.querySelectorAll('.c-tooltip-content .Backpack')[4];
                let old = $btn.innerHTML;
                let t = AutoSync.interval;
                // 计时为0时执行存档
                setInterval(() => {
                    if(t === 0){
                        !$btn.click() && AutoSync.saveToCloud();
                        t = AutoSync.interval;
                    }
                    $btn.innerHTML = old + ' ('+ t +')';
                    t--;
                }, 1000);
            }
        },

        // 保存本地存档到云端
        saveToCloud(){
            let local = localStorage.getItem('_sd')
            if(local){
                GM_setValue(AutoSync.storeKey, local);
                console.log('存档已保存到云端')
            }
        },
        // 加载云端存档
        loadSaveForCloud(){
            let cloud = GM_getValue(AutoSync.storeKey);
            let local = localStorage.getItem('_sd')
            if(local !== cloud){
                if(confirm('检测到云端存档，是否需要恢复？')){
                    localStorage.setItem('_sd', cloud)
                    console.log('已恢复为云端存档');
                }
            }
        },

        // 初始化
        init(){
            console.log('已加载自动云端存档...');
            this.loadSaveForCloud();
            this.bindAutoSave();
        },
    }

    AutoSync.init();
})();