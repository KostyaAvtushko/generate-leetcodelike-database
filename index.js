import puppeteer from 'puppeteer';
import _ from 'lodash';
import fs from 'fs';
import { comments, langs, topics } from './consts.js';

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://leetcode.com/problemset/');


  await page.setViewport({width: 1080, height: 1024});

  await page.waitForSelector('[role=rowgroup] > [role=row] > [role=cell]');
  const problemSet = await page.evaluate(() => {
    console.log('hello')
    console.log(document.querySelectorAll('[role=row]'))
    return [...document.querySelectorAll('[role=row] > [role=cell] > a')]
      .map(el => el.href)
      .filter(el => el.split('https://leetcode.com/')[1].startsWith('problems'))
      .map(el => {
        const params = el.split("/");
        const link = params.slice(0, params.length - 1).join("/");
        return link;
      });
  });
  console.log(problemSet)
  let res = []
  for (let i = 0; i < problemSet.length; i++) {
    await page.goto(problemSet[i]);
    await page.waitForSelector('.text-title-large');
    const problem = {}

    const solutions = await page.waitForSelector("xpath///div[text()='Solutions']");
    await solutions.click();
    
    await page.waitForSelector("img[src*='https://assets.leetcode.com/users']", { 
      timeout: 5000,
      visible: true,
    }).catch(() => {
      return;
    });

    await page.waitForFunction(() => {
      return document.querySelectorAll("img[src*='https://assets.leetcode.com/users']").length >= 4;
    }, { 
      timeout: 5000,
    }).catch(() => {
      return;
    });

    let solsLinks = await page.evaluate(() => {
      return [...document.querySelectorAll("a[href*='solutions")].map(el => el.href);
    }).catch(() => {
      return;
    });

    if (!solsLinks) {
      solsLinks = await page.evaluate(() => {
        return [...document.querySelectorAll("a[href*='solutions")].map(el => el.href);
      }).catch(() => {
        return;
      });
    }


    const back  = await page.waitForSelector("xpath///div[text()='Description']");
    await back.click();
    const title = await page.evaluate(() => {
      return document.querySelector('.text-title-large').textContent;
    })
    problem['title'] = title;
    const description = await page.evaluate(() => {
      return document.querySelector('[data-track-load]').textContent;
    })
    problem['description'] = description;


    const difficulty = await page.evaluate(() => {
      let r = [];
      [...document.querySelectorAll('.flex .gap-1 > div')].map(el => {
        if(el.classList.value.includes("text-difficulty")) r.push(el);
      })
      return r[0].textContent;
    })

    problem['difficulty'] = difficulty;
    problem['acceptance'] = (Math.random() * ((75 - 30 + 1) + 30)).toFixed(2);
    problem['frequency'] = (Math.random() * (200 + 1)).toFixed(2);
    problem['topics'] = [_.sampleSize(topics, 10)];
    problem['languages'] = [_.sampleSize(langs, 10)];
    problem['comments'] = [...(new Array(10)).fill(1).map(() =>{ 
      return {
        author_id: (Math.random() * (998)).toFixed(),
        problem_id: i,
        body: comments[Math.floor(Math.random() * comments.length)],
        comment_reply_id: null,
      }
    })];

    problem['solutions'] = [];
    for (let j = 0; j < 4; j++) {
      if  (!solsLinks || !solsLinks[j]) continue;
      if (solsLinks && solsLinks[j].length !== 0) {
        
        const solution = {}
        if (solsLinks[j].startsWith('https://leetcode.com/accounts')) continue; 
        const newPage = await browser.newPage();
        await newPage.goto(solsLinks[j]);
        await newPage.waitForSelector("xpath///body/div[@id='__next']/div[2]/div[1]/div[1]/div[4]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]")
          .catch(() => {
            return;
          });
        solution['title'] = await newPage.evaluate(() => {
          return document.evaluate("/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[4]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
        }).catch(() => {
          return "";
        });
        solution['body'] = await newPage.evaluate(() => {
          return document.evaluate("//body/div[@id='__next']/div[2]/div[1]/div[1]/div[4]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
        }).catch(() => {
          return "";
        });
        solution['views'] = await newPage.evaluate(() => {
          return document.evaluate("/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[4]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent
        }).catch(() => {
          return 0;
        });;
        solution['upvotes'] = await newPage.evaluate(() => {
          return document.evaluate("//body/div[@id='__next']/div[2]/div[1]/div[1]/div[4]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/button[1]/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
        }).catch(() => {
          return 0;
        });
        solution['author_id'] = (Math.random() * (998)).toFixed();
        solution['problem_id'] = i;
        problem['solutions'].push(solution);
        await newPage.close();
      }
    }

    res.push(problem);
  }
  console.log(res);
  fs.writeFileSync('problems.json', JSON.stringify(res));

  await browser.close();
})();