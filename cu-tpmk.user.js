// ==UserScript==
// @name         Central University Fixes
// @namespace    https://github.com/fuccsoc 
// @version      1.0
// @description  Fix some bugs on CU LMS
// @author       Vladislav Gorodkov
// @match        https://my.centraluniversity.ru/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    function convertLink(link) {
        return link.replace('/courses/', '/courses/view/');
    }

    setInterval(() => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.href.includes('/learn/courses/') && link.href.includes('/longreads/') && !link.href.includes('view')) {
                link.href = convertLink(link.href);
            }
        });
    }, 500)
})();
