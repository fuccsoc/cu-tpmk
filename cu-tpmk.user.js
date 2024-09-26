// ==UserScript==
// @name         Central University Fixes
// @namespace    https://github.com/fuccsoc 
// @version      1.1
// @description  Fix some bugs on CU LMS
// @author       Vladislav Gorodkov
// @match        https://my.centraluniversity.ru/*
// @grant        none
// ==/UserScript==




(function() {
    'use strict';

    console.log("WELCOME TO CU FIXER!");
    console.log("powered by fvssx - t.me/fvssx");
    console.log("Now waiting for page fully loaded");
    function waitForElementToDisappear(selector, callback) {
        const observer = new MutationObserver((mutationsList, observer) => {
            const element = document.querySelector(selector);
            if (!element) {
                observer.disconnect();
                callback();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

    }

    waitForElementToDisappear('.t-content_loading', () => {
        console.log("Content loaded");
        console.log("Let's do stuff");

        fix_links()
        add_link_to_course_at_perf_page()

        console.log("All done!");
        console.log("Enjoy :)");
    })

    function convertLink(link) {
        return link.replace('/courses/', '/courses/view/');
    }

    const fix_links = () => {
        const links = document.querySelectorAll('a');
        console.log("Fixing links");
        links.forEach(link => {
            if (link.href.includes('/learn/courses/') && link.href.includes('/longreads/') && !link.href.includes('view')) {
                console.log("fixed " + link);
                link.href = convertLink(link.href);
                let nl = link.cloneNode(true); // даже не спрашивайте про этот костыль
                link.parentNode.replaceChild(nl, link); // спасибо 
            }
        });
        console.log("Fixing links done");
    }
    const add_link_to_course_at_perf_page = () => {
            console.log("Adding link to course at Performance page");
            const currentUrl = window.location.href;
            const idMatch = currentUrl.match(/\/student-performance\/(\d+)/);
            if (idMatch && idMatch[1]) {
                const id = idMatch[1];
                console.log(`ID detected - ${id}`);
                const header = document.querySelector('h1');
                if (header) {
                    console.log("header found")
                    const link = document.createElement('a');
                    link.href = `https://my.centraluniversity.ru/learn/courses/view/${id}`;
                    link.textContent = header.textContent; // Keep the original header text
                    // Replace the h1 content with the link
                    header.innerHTML = ''; 
                    header.appendChild(link);
                }
            }
            console.log("Task done");
    }
})();
