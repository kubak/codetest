# Code Test

Simple issue tracker with UI.

### Getting up and running

1. Run `npm install` from the root directory
2. Run `mysql -u username -p < sql/0.sql` from the root directory with valid mysql username instead of "username" this will create the database for you along with some test data
3. Edit and save `config/db.json` putting in valid values
4. Run `npm start` from the root directory

Your API will now be served to `localhost:3000` by default.

---

### API Architecture


```
/api              (Contains all files relevant to the API and database logic)
  /controllers    (Contains all route controllers, separated by entity type)
    issue.js      (Methods related to issue management)
    index.js      (Exports all controllers to be required in the API)
  /models         (Will contain all database models/schema definitions)
  /utils          (Contains miscellaneous files used within the API)
  index.js        (Associates endpoints with route controllers)
/tests            (Contains tests for the API, organized in the same structure as the /api directory)
  helper.js       (Runs before any of the tests, defining test libraries and starting the server)
/coverage     (gitignored, but contains HTML coverage results automatically generated by running the tests)
/docs             (Contains the auto-generated documentation)
server.js         (The Express server which loads and serves the API)
```

---

### Tests and Coverage

All tests are contained within the `/__tests__` directory, arranged in the same structure as the `/api` directory. The `helper.js` file automatically loads the testing libraries [sinon.js](http://sinonjs.org/) and [should.js](https://shouldjs.github.io/), making them available on the global scope for any of your tests. It also loads and starts the server before running your tests.

Tests are written and run using [mocha](https://mochajs.org/). Code coverage is automatically calculated using [Istanbul](https://github.com/gotwarlost/istanbul), which also generates HTML results pages in the `/__coverage__` directory.

**To run your tests, use the command `npm test`.**

![Image of generated code coverage results](https://raw.githubusercontent.com/jakemmarsh/expressed-boilerplate/master/coverage.png)

---

### Auto-Documentation

Documentation can be auto-generated for your API using [apiDoc](http://apidocjs.com/) if you annotate your controller methods in the correct format. The format and other options can be seen in the apiDocs documentation.

**To generate your docs, use the command `npm run gen-docs`.**

![Image of generated documentation](https://raw.githubusercontent.com/jakemmarsh/expressed-boilerplate/master/docs.png)
