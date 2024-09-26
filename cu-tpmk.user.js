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

    const interval = setInterval(() => {
        // Чиним линки
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.href.includes('/learn/courses/') && link.href.includes('/longreads/') && !link.href.includes('view')) {
                clearInterval(interval);
                link.href = convertLink(link.href);
                let nl = link.cloneNode(true); // даже не спрашивайте про этот костыль
                link.parentNode.replaceChild(nl, link); // спасибо 
            }
        });
        // Добавляем ссылку на страницу
        (() => {
            const currentUrl = window.location.href;
            const idMatch = currentUrl.match(/\/student-performance\/(\d+)/);
            if (idMatch && idMatch[1]) {
                const id = idMatch[1];
        
                const header = document.querySelector('h1');
                if (header) {
                    const link = document.createElement('a');
                    link.href = `https://my.centraluniversity.ru/learn/courses/view/${id}`;
                    link.textContent = header.textContent; // Keep the original header text
        
                    // Replace the h1 content with the link
                    header.innerHTML = ''; 
                    header.appendChild(link);
                }
            }
        })()
    }, 500)


   
})();
