import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

const outputFile = 'articleImages.txt';
async function scrapeSite(url) {
    const resposne = await fetch(url);
    const body = await resposne.text();
    const $ = cheerio.load(body);
    let element = $('.blog-single-img');
    if (element.length === 0) {
        return '';
    }
    let image = element.attr('src');
    return image;
}

function parseString(file) {
    let text = fs.readFileSync(file, 'utf8', function (err, data) {
        if (err) throw err;
    });
    let list = text.split('\n');
    return list;
}

function eraseFile(file) {
    fs.writeFileSync(file, '', (err) => {
        if (err) throw err;
    });
}

function scrapeAllUrls() {
    const site_list = parseString('page.txt');
    eraseFile(outputFile);
    let index = 0;
    for (let url of site_list) {
        scrapeSite(url)
            .then((result) => {
                fs.appendFileSync(outputFile, result, (err) => {
                    if (err) throw err;
                });
                if (index !== site_list.length - 1) {
                    fs.appendFileSync(outputFile, '\n', (err) => {
                        if (err) throw err;
                    });
                }
                index++;
            })
            .catch((err) => console.log(err));
    }
}

scrapeAllUrls();
