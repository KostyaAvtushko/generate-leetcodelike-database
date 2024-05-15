// const formatProblemsData = (data) => ({
//   totalQuestions: data.problemsetQuestionList.total,
//   count: data.problemsetQuestionList.questions.length,
//   problemsetQuestionList: data.problemsetQuestionList.questions,
// });

// (async (
//   res,
// ) => {
//   console.log('hello')
//   const query = `#graphql
//       query getProblems($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
//           problemsetQuestionList: questionList(
//               categorySlug: $categorySlug
//               limit: $limit
//               skip: $skip
//               filters: $filters
//           ) {
//               total: totalNum
//               questions: data {
//                   acRate
//                   difficulty
//                   freqBar
//                   questionFrontendId
//                   isFavor
//                   isPaidOnly
//                   status
//                   title
//                   titleSlug
//                   topicTags {
//                       name
//                       id
//                       slug
//                   }
//                   hasSolution
//                   hasVideoSolution
//               }
//           }
//   }`
//   try {
//     const response = await fetch('https://leetcode.com/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Referer: 'https://leetcode.com',
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: {
//           categorySlug: '',
//           skip: 0,
//           limit: 100, //by default get 20 question
//           filters: { tags: ' ' }, //filter by tags
//         },
//       }),
//     });

//     const result = await response.json();
//     console.log(result)
//     if (result.errors) {
//       console.log((formatProblemsData(result)));
//     }
//     console.log(JSON.stringify(result.data.problemsetQuestionList.questions[0]));
//   } catch (err) {
//     console.error('Error: ', err);
//     //return res.send(err);
//   }
// })();