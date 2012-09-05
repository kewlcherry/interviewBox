// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  InterviewBox.Views.Recorder = (function(_super) {

    __extends(Recorder, _super);

    function Recorder() {
      return Recorder.__super__.constructor.apply(this, arguments);
    }

    Recorder.prototype.template = JST["backbone/templates/lib/video/responseRecorder"];

    Recorder.prototype.a_template = JST["backbone/templates/lib/video/questionRecorder"];

    Recorder.prototype.events = {
      'click .closeRecorder': 'removeRecorder',
      'click #createQuestion .submit': 'createQuestion'
    };

    Recorder.prototype.initialize = function(option) {
      $('html').css("overflow", "hidden");
      this.currentUser = option['currentUser'];
      return console.log(this.model);
    };

    Recorder.prototype.initialize = function() {
      return $('html').css("overflow", "hidden");
    };

    Recorder.prototype.renderResponseRecorder = function() {
      $(this.el).html(this.template());
      this.setupVideoRecorder();
      return this;
    };

    Recorder.prototype.renderQuestionRecorder = function() {
      $(this.el).html(this.a_template());
      this.setupVideoRecorder();
      return this;
    };

    Recorder.prototype.setupVideoRecorder = function() {
      var self;
      self = this;
      return $.post('/generateToken', {}, function(data) {
        return self.setupRecorderManager(data['apiKey'], data['token']);
      });
    };

    Recorder.prototype.setupRecorderManager = function(apiKey, token) {
      var recorderManager, self, template;
      self = this;
      recorderManager = TB.initRecorderManager(apiKey);
      template = '<div id="recorderElement"></div>';
      self.$('.player').html(Mustache.to_html(template, {}));
      this.recorder = recorderManager.displayRecorder(token, "recorderElement", {
        width: 400,
        height: 300
      });
      this.recorder.addEventListener('recordingStarted', function(e) {
        return self.recStartedHandler(e);
      });
      return this.recorder.addEventListener('archiveSaved', function(e) {
        return self.archiveSavedHandler(e);
      });
    };

    Recorder.prototype.recStartedHandler = function(event) {
      return this.recImgData = this.recorder.getImgData();
    };

    Recorder.prototype.archiveSavedHandler = function(event) {
      var archiveId, self;
      self = this;
      archiveId = event.archives[0].archiveId;
      if (this.model === void 0) {
        return self.archiveId_question = archiveId;
      } else {
        return $.post('/newResponse', {
          archiveId: archiveId,
          question_id: self.model.get('id')
        }, function(data) {
          console.log(data);
          self.uploadImage(self.recImgData, archiveId, 'response');
          return self.removeRecorder();
        });
      }
    };

    Recorder.prototype.uploadImage = function(data, id, imageFor) {
      return $.post('/uploadImage', {
        imageData: data,
        archiveId: id,
        imageFor: imageFor
      }, function() {});
    };

    Recorder.prototype.createQuestion = function(e) {
      var self;
      e.preventDefault();
      self = this;
      if (this.archiveId_question === void 0) {
        return alert("please record a video");
      } else {
        return $.post('/createQuestion', {
          title: $('.title').val(),
          archiveId: self.archiveId_question,
          description: $('.description').val(),
          questionType: $('.type').val()
        }, function(newQuestion) {
          self.removeRecorder();
          return self.uploadImage(self.recImgData, newQuestion['archiveId'], 'question');
        });
      }
    };

    Recorder.prototype.removeRecorder = function() {
      $('html').css("overflow", "auto");
      return this.remove();
    };

    return Recorder;

  })(Backbone.View);

}).call(this);