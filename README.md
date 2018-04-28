# SQL tokenizer

> analyzes SQL statements and converts it into a list of tokens

[Installation](#installation) |
[Usage](#usage) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install sql-tokenizer
```

## Usage

Create a *tokenize* function using CommonJS.

```javascript
const tokenize = require('sql-tokenizer')()
```

You can also create a *tokenize* function with ES6 syntax.

```javascript
import tokenizer from 'sql-tokenizer'
const tokenize = tokenizer()
```

Turn SQL statement into tokens.

```javascript
tokenize('select * from revenue')
// ['select', ' ', '*', ' ', 'from', ' ', 'revenue']
```

Quotes are handled properly.

```javascript
tokenize(`select 'O''Reilly' as "book shelf"`)
// ['select', ' ', "'O''Reilly'", ' ', 'as', ' ', '"book shelf"']
```

Indentation is preserved.

```javascript
tokenize(`
SELECT COUNT(*) AS num
FROM (
	SELECT *
	FROM mytable
	WHERE yyyymmdd=20170101
		AND country IN ('IT','US')
)
`)
// '\n',
// 'SELECT', ' ', 'COUNT', '(', '*', ')', ' ', 'AS', ' ', 'num', '\n',
// 'FROM', ' ', '(', '\n',
// '\t', 'SELECT', ' ', '*', '\n',
// '\t', 'FROM', ' ', 'mytable', '\n',
// '\t', 'WHERE', ' ', 'yyyymmdd', '=', '20170101', '\n',
// '\t\t', 'AND', ' ', 'country', ' ', 'IN', ' ', '(', "'IT'", ',', "'US'", ')', '\n',
// ')', '\n'
```

The *tokenizer* function accepts an optional array of operators, which defaults to [SQL92-operators].
The following example shows how to extend the SQL92 operators list with PostgreSQL bitwise operators.

```javascript
const sql92Operators = require('sql92-operators')
const tokenizer = require('sql-tokenizer')

const operators = sql92Operators.concat(['&', '|', '#', '~' '>>', '<<'])

const tokenize = tokenizer(operators)
```

## License

[MIT](http://g14n.info/mit-license/)

[SQL92-operators]: http://g14n.info/SQL92-operators "SQL92 operators"
