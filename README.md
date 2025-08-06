# SQL tokenizer

> Convert SQL statements into a list of tokens

[Installation](#installation) |
[Usage](#usage) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) do

```shell
npm install sql-tokenizer
```

## Usage

Create a *tokenize* function.

```javascript
import { sqlTokenizer } from 'sql-tokenizer'

const tokenize = sqlTokenizer()
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

### Custom operators

The *tokenizer* function accepts an optional array of operators, which defaults to `sqlOperators` exported by `sql-tokenizer` and defined in [operators.js](https://github.com/fibo/SQL-tokenizer/blob/main/src/operators.js).

By **operator** here it means a sequence of characters, excluding letters. So for example `+`, `-`, `*`, `/` are operators included in the list. Instead `AND` and `OR` are not included, because they are made of letters.

In case you need to add some operator to the list, you can do something like the following:

```javascript
import { sqlOperators, sqlTokenizer } = from 'sql-tokenizer'

const myCustomOperators = ['++', '??']

const tokenize = tokenizer(sqlOperators.concat(myCustomOperators))
```

## License

[MIT](https://fibo.github.io/mit-license/)

