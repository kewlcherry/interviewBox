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
      'click .leaveResponse': 'leaveResponse',
      'click .up_vote': 'upVote',
      'click .down_vote': 'undoVote'
    };

    ShowQuestionView.prototype.initialize = function(option) {
      this.model = new InterviewBox.Models.Question({
        id: option['id']
      });
      this.allUsers = option['allUsers'];
      this.currentUser = option['currentUser'];
      return this.on('changeVote', this.refreshVote);
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
          var user;
          user = new InterviewBox.Models.User({
            id: self.model.get('user_id')
          });
          return user.fetch({
            success: function() {
              return $.post('/getVoteCount', {
                question_id: self.model.get('id')
              }, function(data) {
                self.setupTemplate(data, user);
                self.setupVoteBotton();
                self.loadVideo(data);
                self.getAllUserVideo();
                self.getAllResponse();
                return self.getAllQuestionByType();
              });
            }
          });
        }
      });
    };

    ShowQuestionView.prototype.setupTemplate = function(data, user) {
      this.model.set({
        up_vote: data,
        userName: user.get('name')
      });
      $(this.el).html(this.template(this.model.toJSON()));
      return this.$('.questionInfo .timeago').timeago();
    };

    ShowQuestionView.prototype.loadVideo = function(data) {
      var self, video;
      self = this;
      video = new InterviewBox.Views.VideoPlayer({
        model: self.model
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

    ShowQuestionView.prototype.getAllQuestionByType = function() {
      var self;
      self = this;
      this.allTypeQuestions = new InterviewBox.Collections.TypeQuestionsCollection({
        type: this.model.get('questionType')
      });
      return this.allTypeQuestions.fetch({
        success: function() {
          var current;
          current = self.allTypeQuestions.get(self.model.get('id'));
          self.allTypeQuestions.remove(current);
          return self.allTypeQuestions.each(function(question) {
            var videoLink;
            videoLink = videoLink = new InterviewBox.Views.ArchiveLinkView({
              model: question
            });
            return $('.moreQuestions_type').append(videoLink.render().el);
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
      return $('#comment_and_responses').html(responseList.render().el);
    };

    ShowQuestionView.prototype.leaveResponse = function() {
      var recorder, self;
      self = this;
      recorder = new InterviewBox.Views.Recorder({
        model: this.model
      });
      recorder.on('finishedRecording', function() {
        return self.getAllResponse();
      });
      return $('html').prepend(recorder.renderResponseRecorder().el);
    };

    ShowQuestionView.prototype.setupVoteBotton = function() {
      var self;
      self = this;
      return $.post('/checkVote', {
        question_id: this.model.get('id')
      }, function(hasBeenRated) {
        if (hasBeenRated === true) {
          self.$('.vote .up_vote').hide();
          return self.$('.vote .down_vote').show();
        } else {
          self.$('.vote .up_vote').show();
          return self.$('.vote .down_vote').hide();
        }
      });
    };

    ShowQuestionView.prototype.upVote = function() {
      var self;
      self = this;
      return $.post('/upVote', {
        question_id: this.model.get('id')
      }, function(data) {
        self.trigger('changeVote');
        return self.toggleVoteButton();
      });
    };

    ShowQuestionView.prototype.undoVote = function() {
      var self;
      self = this;
      return $.post('/downVote', {
        question_id: this.model.get('id')
      }, function(data) {
        self.trigger('changeVote');
        return self.toggleVoteButton();
      });
    };

    ShowQuestionView.prototype.refreshVote = function() {
      var self;
      self = this;
      return $.post('/getVoteCount', {
        question_id: this.model.get('id')
      }, function(data) {
        return self.$('.voteInfo span').text(data);
      });
    };

    ShowQuestionView.prototype.toggleVoteButton = function() {
      this.$('.vote .up_vote').toggle();
      return this.$('.vote .down_vote').toggle();
    };

    return ShowQuestionView;

  })(Backbone.View);

}).call(this);
