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

Create a *tokenize* function.

```javascript
const tokenize = require('sql-tokenizer')()
```

Turn SQL statement into tokens.

```javascript
tokenize('select * from revenue')
// ['select', ' ', '*', ' ', 'from', ' ', 'revenue']
```

## License

[MIT](http://g14n.info/mit-license/)
