// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  InterviewBox.Views.ResponseList = (function(_super) {

    __extends(ResponseList, _super);

    function ResponseList() {
      return ResponseList.__super__.constructor.apply(this, arguments);
    }

    ResponseList.prototype.template = JST["backbone/templates/lib/response/responseList"];

    ResponseList.prototype.initialize = function(option) {
      this.responses = option['collection'];
      this.current_user = option['currentUser'];
      return this.clear = '<div style="clear:both;"></div>';
    };

    ResponseList.prototype.render = function() {
      $(this.el).html(this.template());
      this.List_a();
      return this;
    };

    ResponseList.prototype.render_b = function() {
      $(this.el).html(this.template());
      this.list_b();
      return this;
    };

    ResponseList.prototype.List_a = function() {
      var self;
      self = this;
      return this.responses.fetch({
        success: function() {
          self.responses.each(function(response) {
            var responseView;
            console.log('ResponseList -> list_a...');
            console.log(self.current_user);
            responseView = new InterviewBox.Views.ArchiveLinkView({
              model: response,
              current_user: self.current_user
            });
            return self.$('.RlistContainer').append(responseView.render_b().el);
          });
          return self.$('.RlistContainer').append(self.clear);
        }
      });
    };

    ResponseList.prototype.list_b = function() {
      var self;
      self = this;
      return this.responses.fetch({
        success: function() {
          self.responses.each(function(response) {
            var responseView;
            responseView = new InterviewBox.Views.ArchiveLinkView({
              model: response
            });
            return self.$('.RlistContainer').append(responseView.render_c().el);
          });
          return self.$('.RlistContainer').append(self.clear);
        }
      });
    };

    return ResponseList;

  })(Backbone.View);

}).call(this);
