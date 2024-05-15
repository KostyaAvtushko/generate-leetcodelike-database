import puppeteer from 'puppeteer';
import _ from 'lodash';
import fs from 'fs';

const langs = [
  'C++','Java', 'Python', 'Python3', 'C', 'C#', 'JavaScript', 'TypeScript',
  'PHP', 'Swift', 'Kotlin', 'Dart', 'Go', 'Ruby', 'Scala', 'Rust',
  'Racket', 'Erlang', 'Elixir'
]

const topics = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Database",
  "Binary Search",
  "Tree",
  "Breadth-First Search",
  "Matrix",
  "Bit Manipulation",
  "Two Pointers",
  "Binary Tree",
  "Heap (Priority Queue)",
  "Prefix Sum",
  "Stack",
  "Simulation",
  "Graph",
  "Counting",
  "Design",
  "Sliding Window",
  "Backtracking",
  "Enumeration",
  "Union Find",
  "Linked List",
  "Ordered Set",
  "Monotonic Stack",
  "Number Theory",
  "Trie",
  "Divide and Conquer",
  "Recursion",
  "Bitmask",
  "Queue",
  "Segment Tree",
  "Binary Search Tree",
  "Geometry",
  "Memoization",
  "Hash Function",
  "Binary Indexed Tree",
  "Topological Sort",
  "Combinatorics",
  "String Matching",
  "Shortest Path",
  "Rolling Hash",
  "Game Theory",
  "Interactive",
  "Data Stream",
  "Brainteaser",
  "Monotonic Queue",
  "Randomized",
  "Merge Sort",
  "Iterator",
  "Concurrency",
  "Doubly-Linked List",
  "Probability and Statistics",
  "Quickselect",
  "Bucket Sort",
  "Suffix Array",
  "Minimum Spanning Tree",
  "Counting Sort",
  "Shell",
  "Line Sweep",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
  "Biconnected Component",
  "Collapse"
];

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  

  // Navigate the page to a URL
  await page.goto('https://leetcode.com/problemset/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Wait and click on first result
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
    problem['acceptance'] = Math.random() * ((75 - 30 + 1) + 30).toFixed(2);
    problem['frequency'] = Math.random() * (200 + 1).toFixed(2);
    problem['topics'] = [_.sampleSize(topics, 10)];
    problem['languages'] = [_.sampleSize(langs, 10)];
    res.push(problem);
  }
  console.log(res);
  fs.writeFileSync('problems.json', JSON.stringify(res));
  // const title = await page.waitForSelector(']');
  // console.log(title)
  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  //await browser.close();
})();