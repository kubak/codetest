let sql = require('../utils/sql');

class Issue {
   
   constructor () {
      this.sql = sql();
   }
   
   list (callback) {
      let query = 'SELECT issueID, issueName, issueDescription, issueState, issueModifiedDate \
                     FROM issue \
                     ORDER BY issueModifiedDate DESC';
      
      this.sql.execute(query, function (err, result) {
         if (err) {
            console.log(err);
            callback('sql error');
            return;
         }
         callback(err, result);
      });
   }
   
   update (issue, callback) {
      let query = 'UPDATE issue \
                     SET issueName = ?, issueDescription = ?, issueState = ? \
                     WHERE issueID = ? \
                     LIMIT 1;';
      
      let params = [issue.issueName, issue.issueDescription, issue.issueState, issue.issueID];
      
      this.sql.execute(query, params, (err, result) => {
         if (err) {
            console.log(err);
            callback('sql error');
            return;
         }
         this.get(issue.issueID, callback);
      });
   }
   
   get (issueID, callback) {
      
      let query = 'SELECT issueID, issueName, issueDescription, issueState, issueModifiedDate \
                     FROM issue \
                     WHERE issueID = ? \
                     LIMIT 0, 1;';
   
      let params = [issueID];
      
      this.sql.execute(query, params, function (err, result) {
         if (err || typeof result == 'undefined' || typeof result[0] == 'undefined') {
            console.log(err);
            callback('sql error');
            return;
         }
         callback(err, result[0]);
      });
   
   }
   
   remove (issueID, callback) {
      let query = 'DELETE \
                     FROM issue \
                     WHERE issueID = ? \
                     LIMIT 1;';
      
      let params = [issueID];
      
      this.sql.execute(query, params, function (err, result) {
         if (err) {
            console.log(err);
            callback('sql error');
            return;
         }
         callback(err, result);
      });
   }
   
   create (issue, callback) {
      let query = 'INSERT INTO issue (issueName, issueDescription) \
                     VALUES (?, ?);';
      
      let params = [issue.issueName, issue.issueDescription];
      
      this.sql.execute(query, params, (err, result) => {
         if (err) {
            console.log(err);
            callback('sql error');
            return;
         }
         this.get(result.insertId, callback);
      });
   }
   
}

module.exports = Issue;
