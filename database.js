const pg = require('pg');
const data = require('./problems.js');
const { topics, langs } = require('./consts.js');


const pool = new pg.Pool({
  user: '',
  host: 'localhost',
  database: 'database',
  password: '',
  port: 5432,
  keepAlive: true,
  idleTimeoutMillis: 0,
  max: 100
});

function formatUpvotes(upvotes) {
  if (String(upvotes).endsWith("K")) {
    return parseInt(upvotes.replace("K", "")) * 1000;
  }
  return upvotes;
}

function formatViews(views) {
  let v = parseInt(views, 10);
  if(!v) return (Math.random() * ((10000 - 1000 + 1) + 1000)).toFixed();
  return v
}

(async () => {

  for (let j = 0; j < data.length; j++) {
    const resInsertProblem = await pool.query("INSERT INTO problems (title, body, difficulty, acceptance, frequency) VALUES ($1, $2, $3, $4, $5)", [data[j].title, data[j].description, data[j].difficulty, parseInt(data[j].acceptance, 10), data[j].frequency]);
    console.log(resInsertProblem.rows + 'RES_INSERT_PROBLEM');
    for (let i = 0; i < data[j].topics[0].length; i++) {
      const resInsertProblemsTopics = await pool.query("INSERT INTO problems_topics (problem_id, topic_id) VALUES ($1, $2)", [j + 1, topics.indexOf(`${data[j].topics[0][i]}`) + 1]);
      console.log(resInsertProblemsTopics.rows + 'RES_INSERT_PROBLEMS_TOPICS');
    }

    for (let i = 0; i < data[j].solutions.length; i++) {
      const resInsertSolutions = await pool.query("INSERT INTO solutions (title, body, author_id, problem_id, views, upvotes) VALUES ($1, $2, $3, $4, $5, $6)", [data[j].solutions[i].title, data[j].solutions[i].body, data[j].solutions[i].author_id, data[j].solutions[i].problem_id, formatViews(data[j].solutions[i].views), formatUpvotes(data[j].solutions[i].upvotes) || 0]);
      console.log(j + 1, data[j].solutions[i].author_id);
      const resInsertProblemUser = await pool.query("INSERT INTO problems_solved_by_users (problem_id, user_id) VALUES ($1, $2)", [j + 1 , data[j].solutions[i].author_id]);
      console.log(resInsertSolutions.rows + 'RES_INSERT_SOLUTIONS');
      console.log(resInsertProblemUser.rows + 'RES_INSERT_PROBLEMS_USERS');
    }

    for (let i = 0; i < data[j].comments.length; i++) {
      const resInsertComments = await pool.query("INSERT INTO comments (author_id, problem_id, body, upvotes, comment_reply_id) VALUES ($1, $2, $3, $4, $5)", [data[j].comments[i].author_id, data[j].comments[i].problem_id, data[j].comments[i].body, (Math.random() * ((150 - 0 + 1) + 0)).toFixed(), data[j].comments[i].comment_reply_id]);
      console.log(resInsertComments.rows + 'RES_INSERT_COMMENTS');
    }

    for (let i = 0; i < data[j].languages[0].length; i++) {
      const resInsertLanguages = await pool.query("INSERT INTO problems_languages (problem_id, language_id) VALUES ($1, $2)", [j + 1 , langs.indexOf(data[j].languages[0][i]) + 1]);
      console.log(resInsertLanguages.rows + 'RES_INSERT_LANGUAGES');
    } 
  }
})();