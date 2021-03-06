// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  InterviewBox.Views.QuestionList = (function(_super) {

    __extends(QuestionList, _super);

    function QuestionList() {
      return QuestionList.__super__.constructor.apply(this, arguments);
    }

    QuestionList.prototype.template = JST["backbone/templates/lib/question/questionList"];

    QuestionList.prototype.a_template = JST["backbone/templates/lib/question/questionList_a"];

    QuestionList.prototype.b_template = JST["backbone/templates/lib/question/questionList_b"];

    QuestionList.prototype.initialize = function(option) {
      this.questions = option['collection'];
      return this.clear = '<div style="clear:both;"></div>';
    };

    QuestionList.prototype.render = function() {
      $(this.el).html(this.template());
      this.loadByTime();
      return this;
    };

    QuestionList.prototype.render_a = function() {
      $(this.el).html(this.a_template());
      this.loadByType();
      return this;
    };

    QuestionList.prototype.render_b = function() {
      $(this.el).html(this.b_template());
      this.loadByUser();
      return this;
    };

    QuestionList.prototype.loadByTime = function() {
      var self;
      self = this;
      return this.questions.fetch({
        success: function() {
          self.questions.each(function(question) {
            var linkView;
            linkView = new InterviewBox.Views.ArchiveLinkView({
              model: question
            });
            return $('#listByTime').append(linkView.render_a().el);
          });
          return $('#listByTime').append(self.clear);
        }
      });
    };

    QuestionList.prototype.loadByType = function() {
      var self;
      self = this;
      return this.questions.fetch({
        success: function() {
          self.questions.each(function(question) {
            var linkView, selector, type;
            linkView = new InterviewBox.Views.ArchiveLinkView({
              model: question
            });
            type = question.get('questionType');
            selector = $('#byType').find("." + type).find('.content');
            return selector.append(linkView.render_a().el);
          });
          $('#byType .algorithm .content').append(self.clear);
          return $('#byType .technical .content').append(self.clear);
        }
      });
    };

    QuestionList.prototype.loadByUser = function() {
      var self;
      self = this;
      this.questions.fetch({
        success: function() {
          self.questions.each(function(question) {
            var newLink;
            newLink = new InterviewBox.Views.ArchiveLinkView({
              model: question
            });
            return $('#QlistContainer').append(newLink.render_d().el);
          });
          return $('#QlistContainer').append(self.clear);
        }
      });
      return {
        error: function() {
          return console.log("error");
        }
      };
    };

    return QuestionList;

  })(Backbone.View);

}).call(this);
