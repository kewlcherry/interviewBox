// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  InterviewBox.Views.ShowQuestionView = (function(_super) {

    __extends(ShowQuestionView, _super);

    function ShowQuestionView() {
      return ShowQuestionView.__super__.constructor.apply(this, arguments);
    }

    ShowQuestionView.prototype.template = JST["backbone/templates/showQuestion/showQuestion"];

    ShowQuestionView.prototype.events = {
      'click .leaveResponse': 'leaveResponse'
    };

    ShowQuestionView.prototype.initialize = function(option) {
      this.model = new InterviewBox.Models.Question({
        id: option['id']
      });
      this.allUsers = option['allUsers'];
      return this.currentUser = option['currentUser'];
    };

    ShowQuestionView.prototype.render = function() {
      this.setupPage();
      return this;
    };

    ShowQuestionView.prototype.setupPage = function() {
      var self;
      self = this;
      return this.model.fetch({
        success: function() {
          self.loadVideo();
          self.getAllUserVideo();
          return self.getAllResponse();
        }
      });
    };

    ShowQuestionView.prototype.loadVideo = function() {
      var video;
      $(this.el).html(this.template(this.model.toJSON()));
      video = new InterviewBox.Views.VideoPlayer({
        model: this.model
      });
      return $('.playerContainer').append(video.renderVideo().el);
    };

    ShowQuestionView.prototype.getAllUserVideo = function() {
      var self;
      self = this;
      this.allVideo = new InterviewBox.Collections.UserQuestionsCollection({
        userId: this.model.get('user_id')
      });
      return this.allVideo.fetch({
        success: function() {
          var current;
          current = self.allVideo.get(self.model.get('id'));
          self.allVideo.remove(current);
          return self.allVideo.each(function(question) {
            var videoLink;
            videoLink = new InterviewBox.Views.ArchiveLinkView({
              model: question
            });
            return $('.moreQuestions').append(videoLink.render().el);
          });
        }
      });
    };

    ShowQuestionView.prototype.getAllResponse = function() {
      var responseList, responses;
      responses = new InterviewBox.Collections.QResponsesCollection({
        questionId: this.model.get('id')
      });
      responseList = new InterviewBox.Views.ResponseList({
        collection: responses,
        currentUser: this.currentUser
      });
      return $('#comment_and_responses').append(responseList.render().el);
    };

    ShowQuestionView.prototype.leaveResponse = function() {
      var recorder;
      recorder = new InterviewBox.Views.Recorder({
        model: this.model
      });
      return $('html').prepend(recorder.renderResponseRecorder().el);
    };

    return ShowQuestionView;

  })(Backbone.View);

}).call(this);
