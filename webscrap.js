import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function scrapeSite(url) {
    const resposne = await fetch(url);
    const body = await resposne.text();
    const $ = cheerio.load(body);
    const links = [];
    $('a').each((index, element) => {
        const link = $(element).attr('href');
        if (
            link &&
            link.trim() !== '' &&
            link.includes('https://www.discover.com')
        ) {
            links.push($.html($(element)));
        }
    });
    return links;
}

const url =
    'https://www.discover.com/personal-loans/resources/consolidate-debt/plan-after-recession/';
scrapeSite(url)
    .then((result) => {
        result.forEach((element, index) => {
            console.log(element, '\n');
        });
    })
    .catch((err) => console.log(err));
