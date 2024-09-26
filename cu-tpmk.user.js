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

    // Function to convert the link
    function convertLink(link) {
        return link.replace('/courses/', '/courses/view/');
    }

    // Get all the links on the page
    const links = document.querySelectorAll('a');

    // Iterate through the links and convert the matching ones
    links.forEach(link => {
        if (link.href.includes('/learn/courses/') && link.href.includes('/longreads/')) {
            link.href = convertLink(link.href);
        }
    });
})();
