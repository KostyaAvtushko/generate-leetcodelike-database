const comments = [
  "Эта задача была настоящим испытанием ума! Сложность на высшем уровне.",
  "Подсказки были такими полезными! Они действительно помогли мне решить эту задачу.",
  "Не могу поверить, что я наконец-то разобрался с этой задачей. Спасибо, сообщество!",
  "У кого-нибудь есть идеи, как можно оптимизировать мое решение? Пока я не совсем доволен своим подходом.",
  "Эта задача заставила меня подумать вне коробки. Очень интересное решение!",
  "Чувствую себя настоящим гений после того, как решил эту задачу!",
  "Всегда думал, что эта задача невозможна. Но вот я, сделал это!",
  "Как я мог пропустить этот трюк? Благодарю за подсказку!",
  "Самая сложная часть в этой задаче - это формулировка.",
  "Потратил на решение этой задачи весь день, но это было того стоило!",
  "Мой мозг сейчас в кипении от этой задачи.",
  "Кто бы мог подумать, что решение окажется настолько простым!",
  "Чувствую себя чемпионом после этой задачи!",
  "Как я мог не догадаться о таком подходе? Спасибо за отличное объяснение!",
  "Это моя новая любимая задача! Хочу попробовать еще раз!",
  "Не могу поверить, что я решил это без помощи Google!",
  "Было трудно, но я нашел путь к решению этой задачи!",
  "Как приятно видеть, что мое решение работает!",
  "Чувствую, что становлюсь лучше с каждой решенной задачей!",
  "Эта задача заставила меня использовать все свои ресурсы!",
  "Кто-нибудь сталкивался с такой ошибкой раньше? Не могу понять, в чем проблема.",
  "Я просто в восторге от того, как эффективно работает мое решение!",
  "Сложно даже представить, сколько попыток ушло на решение этой задачи.",
  "Это было круто! Какая следующая задача?",
  "Не могу поверить, что решил это за одну попытку! Сейчас немного в шоке.",
  "Наконец-то я справился с этой задачей! Вперед к следующей!",
  "Эта задача мне не давала покоя, но теперь я горд собой!",
  "Вот почему я люблю программирование - за такие интересные задачи!",
  "Это было как головоломка, но я нашел свой путь к решению!",
  "Сложно поверить, что я только что решил это! Спасибо всем за поддержку.",
  "Теперь я чувствую, что могу решить что угодно!",
  "Это был настоящий вызов для моего ума, но я его преодолел!",
  "Наконец-то, я разобрался с этой задачей! Спасибо за все подсказки.",
  "Эта задача вынудила меня глубже погрузиться в язык программирования.",
  "Чувствую, что становлюсь лучше программистом с каждой решенной задачей.",
  "Иногда лучшее решение приходит в голову после нескольких неудачных попыток.",
  "Сколько времени я потратил на решение этой задачи? Не считаясь!",
  "Благодаря этой задаче я узнал о новой функции языка программирования.",
  "Кто-нибудь еще решал эту задачу? Хотелось бы услышать ваши мысли!",
  "Эта задача преподнесла мне неожиданный поворот! Интересно, как многие это заметили.",
  "Я не знал, что это возможно, пока не попробовал! Это было удивительно!",
  "Иногда простые решения лучше всех! Не всегда нужно усложнять.",
  "Я так рад, что решил эту задачу! Это действительно научило меня чему-то новому.",
  "Когда я столкнулся с этой задачей впервые, я думал, что это невозможно. Теперь я знаю иначе!",
  "Эта задача показала мне, насколько важно быть терпеливым в программировании.",
  "Идея для этого решения пришла ко мне во сне! Удивительно, как мозг работает иногда.",
  "Какие интересные подходы у других людей к этой задаче"
];
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

module.exports = { topics, comments, langs };