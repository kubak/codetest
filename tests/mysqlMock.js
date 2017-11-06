module.exports = { 
   createPool: function () {
      return {
         execute : function(query, params, callback) {
            if (typeof params === 'function') { 
               params('error');
               return;
            }
            callback('error');
         }
      };
   }
};
