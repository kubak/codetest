// wait for the page to load
$(function () {
   
   var apiVersion = 'v1';
   
   var urlPrefix = '/api/' + apiVersion;
   
   window.app = {};

   // Main container view
   app.MainContainer = Backbone.View.extend({
      selector : '#mainContainer'
   });
   
   // Single issue model
   app.IssueModel = Backbone.Model.extend({
      urlRoot : urlPrefix + '/issue',
      defaults : {
         states : ['open', 'pending', 'closed']
      }
      // @todo update
      // @todo delete
   });

   // Issue list collection
   app.IssueListCollection = Backbone.Collection.extend({
      url : urlPrefix + '/issue',
      model : app.IssueModel
   });
   
   app.IssueListView = Backbone.View.extend({
      
      templateSelector : '#issueListTemplate',
      selector : '#issueList',
      initialize : function () {
         var that = this;
         // render the base template
         this.template = _.template( $(this.templateSelector).html() );
         app.mainContainer.html( this.template() );
         
         this.$el = $(this.selector);
         this.views = [];
         
         // initialize collection 
         this.collection = new app.IssueListCollection();
         this.collection.fetch({ 
            success : function (collection, response, options) {
               collection.each(function (model) {
                  let view = new app.IssueView(model, that.$el);
                  that.views.push(view);
                  let states = { 
                     'open' : '#issueListOpen', 
                     'pending' : '#issueListPending', 
                     'closed' : '#issueListClosed'
                  };
                  that.$el.find( states[model.get('issueState')] ).append(view.render());
               });
            },
            error : function (collection, response, options) {
               alert('fetching issue list failed');
            }
         });  
         
         
      }
   });
   
   app.IssueView = Backbone.View.extend({
      templateSelector : '#issueTemplate',
      initialize : function (model, container) {
         this.model = model;
         this.container = container;
         this.template = _.template( $(this.templateSelector).html() );
         return this;
      },
      render : function () {
         return this.template(this.model.attributes);
      }
   });

   // Edit issue view
   app.IssueDetailsView = Backbone.View.extend({
      templateSelector : '#issueDetailsTemplate',
      selector : '#issueDetails',
      events : {
         'click #issueDetailsUpdate' : 'updateIssue',
         'click #issueDetailsDelete' : 'deleteIssue',
         'change #issueDetailsState' : 'changeIssueState'
      },
      initialize : function (model) {
         this.model = model;
         this.template = _.template( $(this.templateSelector).html() );
         app.mainContainer.html( this.template(model.attributes) );
         
         this.$el = $(this.selector);
         this.delegateEvents();
      },
      updateIssue : function () {
         this.model.save({
            issueName : this.$('#issueDetailsName').val(),
            issueDescription : this.$('#issueDetailsDescription').val()
         }, { 
            success : function (model, response, options) {
               alert('issue successfully saved');
            },
            error : function (model, response, options) {
               alert('error saving issue');
            }
         });
      },
      deleteIssue : function () {
         if (confirm("Are you sure you want to delete this issue ?")) {
            this.model.destroy({
               success: function(model, response) {
                  alert('issue successfully removed');
                  app.router.navigate('issue', { trigger : true })
               }
            });
         }
      },
      changeIssueState : function () {
         var issueState = this.$('#issueDetailsState');
         if (this.model.get('issueState') === 'pending') {
            if (issueState.val() === 'open') {
               alert('pending issues can\'t be set back to open');
               issueState.val('pending');
            }
         } else if (this.model.get('issueState') === 'closed') {
            alert('closed issues can\'t be set back to open or closed');
            issueState.val('closed');
         }
      }
   });

   // Create new issue view
   app.IssueNewView = Backbone.View.extend({
      selector : '#issueNew',
      templateSelector : '#issueNewTemplate',
      events : {
         'click #issueNewSave' : 'saveIssue'
      },
      initialize : function (model) {
         this.template = _.template( $(this.templateSelector).html() );
         app.mainContainer.html( this.template(model) );
         
         this.$el = $(this.selector);
         this.delegateEvents();
      },
      saveIssue : function () {
         var model = new app.IssueModel();
         model.save({
            issueName : this.$('#issueNewName').val(),
            issueDescription : this.$('#issueNewDescription').val()
         }, {
            success : function (model) {
               alert('issue successfully saved');
               app.router.navigate('issue', { trigger : true });
            },
            error : function () {
               alert('error saving issue');
            }
         });
      }
   });
   
   // Router
   app.Router = Backbone.Router.extend({
		routes: {
         // redirect to issue if no route specified
         '/*': function () {
            this.navigate('issue', { trigger: true, replace: true });
        },

        'issue': 'issueList',
        'issue/new' : 'issueNew',
        'issue(/:id)': 'issueDetails'

      },
      
      issueList : function () {
         // initialize view
         this.currentView && this.currentView.remove();
         this.currentView = new app.IssueListView();
      },
      
      issueNew : function () {
         // initialize view
         let view = new app.IssueNewView();
      },
      
      issueDetails : function (issueID) {
         // initialize model
         var model = new app.IssueModel({ id : issueID });
         
         model.fetch({
            success : function (model) {
               // pass model to view
               new app.IssueDetailsView(model);
            },
            error : function () {
               alert('fetching issue failed');
            }
         });
      }
   });

   // initialize main view
   app.mainContainer = $('#mainContainer'); //new app.MainContainer();
   
   // initialize the router
   app.router = new app.Router();

   // start history
   Backbone.history.start();
});
