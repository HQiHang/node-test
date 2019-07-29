const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

const app = express();

let hotNews = [];
let localNews = [];

superagent.get('http://news.baidu.com/').end((err, res) => {
    if(err){
        console.log(`热点新闻抓取失败 - ${err}`)
    }else{
        hotNews = getHotNews(res);
        localNews = getLocalNews(res);
    }
});

let getHotNews = (res) => {
    let hotNews = [];
    let $ = cheerio.load(res.text);
    $('div#pane-news ul li a').each((idx, ele) => {
        // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
        // 参数idx是当前遍历的元素的索引，ele就是当前遍历的DOM元素
        let news = {
            title: $(ele).text(),        // 获取新闻标题
            href: $(ele).attr('href')    // 获取新闻网页链接
        };
        hotNews.push(news)              // 存入最终结果数组
    });
    return hotNews
};

// 抓取本地新闻页面
nightmare
    .goto('http://news.baidu.com/')
    .wait("div#local_news")
    .evaluate(() => document.querySelector("div#local_news").innerHTML)
    .then(htmlStr => {
        // 获取本地新闻数据
        localNews = getLocalNews(htmlStr)
    })
    .catch(error => {
        console.log(`本地新闻抓取失败 - ${error}`);
    });

let getLocalNews = (htmlStr) => {
    let localNews = [];
    let $ = cheerio.load(htmlStr);

    // 本地新闻
    $('ul#localnews-focus li a').each((idx, ele) => {
        let news = {
            title: $(ele).text(),
            href: $(ele).attr('href'),
        };
        localNews.push(news)
    });

    // 本地资讯
    $('div#localnews-zixun ul li a').each((index, item) => {
        let news = {
            title: $(item).text(),
            href: $(item).attr('href')
        };
        localNews.push(news);
    });

    return localNews
};

app.get('/', async (req, res, next) => {
    res.send({
        hotNews: hotNews,
        localNews: localNews
    })
}).listen(3003);