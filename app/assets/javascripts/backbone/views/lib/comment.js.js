// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  InterviewBox.Views.Comment = (function(_super) {

    __extends(Comment, _super);

    function Comment() {
      return Comment.__super__.constructor.apply(this, arguments);
    }

    Comment.prototype.template = JST["backbone/templates/lib/comment/eachComment"];

    Comment.prototype.template_a = JST["backbone/templates/lib/comment/commentForm"];

    Comment.prototype.template_b = JST["backbone/templates/lib/comment/commentForm_b"];

    Comment.prototype.events = {
      'keydown textarea': 'enterComment',
      'focusin textarea': 'clearDefaultComment',
      'focusout textarea': 'setDefaultComment',
      'click .comment_b_list_header': 'toggleComments'
    };

    Comment.prototype.initialize = function(option) {
      this.current_user = option['current_user'];
      return this.response = option['response'];
    };

    Comment.prototype.listComments = function() {};

    Comment.prototype.render_a = function() {
      $(this.el).html(this.template_a());
      return this;
    };

    Comment.prototype.render_b = function() {
      var comments, self;
      self = this;
      this.toggle = false;
      comments = new InterviewBox.Collections.ResponseCommentsCollection({
        responseId: this.response.get('id')
      });
      comments.fetch({
        success: function() {
          var msg;
          self.count = comments.length;
          msg = '';
          if (self.count > 1) {
            msg = "Show All (" + self.count + ") Comments";
          }
          if (self.count === 1) {
            msg = "Show comment (" + self.count + ")";
          }
          $(self.el).html(self.template_b({
            showCommentMsg: msg
          }));
          comments.each(function(comment) {
            var user;
            user = new InterviewBox.Models.User({
              id: comment.get('user_id')
            });
            return user.fetch({
              success: function() {
                var uid;
                console.log(comment);
                uid = user.get('uid');
                return $(self.el).find('.comment_b_list_content').append(self.template({
                  uid: uid,
                  content: comment.get('content')
                }));
              }
            });
          });
          if (self.count === 0) {
            $(self.el).html(self.template_b({
              showCommentMsg: ''
            }));
            return self.$('.comment_b_list_header').hide();
          }
        }
      });
      return this;
    };

    Comment.prototype.renderComment = function() {
      $(this.el).html(this.a_template(this.model.toJSON()));
      return this;
    };

    Comment.prototype.toggleComments = function() {
      this.toggle = !this.toggle;
      this.$('.comment_b_list').toggle();
      this.$('.link_msg_1').toggle();
      return this.$('.link_msg_2').toggle();
    };

    Comment.prototype.enterComment = function(e) {
      var content, current_user, response_id;
      if (e.keyCode === 13) {
        e.preventDefault();
        content = this.$('textarea').val();
        current_user = this.current_user.get('id');
        response_id = this.response.get('id');
        this.createNewComment(current_user, response_id, content);
        return this.clearDefaultComment();
      }
    };

    Comment.prototype.createNewComment = function(current_user, response_id, content) {
      var self;
      self = this;
      return $.post('/newComment', {
        current_user: current_user,
        response_id: response_id,
        content: content
      }, function(data) {
        $(self.el).find('.comment_b_list_content').append(self.template({
          uid: self.current_user.get('uid'),
          content: data['content']
        }));
        console.log(self.count);
        if (self.count >= 1) {
          self.count += 1;
          $(self.el).find('.link_msg_1').html("Show All (" + self.count + ") Comments");
        }
        if (self.count === 0) {
          self.count += 1;
          $(self.el).find('.link_msg_1').html("Show comment (" + self.count + ")");
        }
        self.$('.comment_b_list_header').show();
        if (self.toggle === false) {
          return self.toggleComments();
        }
      });
    };

    Comment.prototype.clearDefaultComment = function() {
      return this.$('textarea').val('');
    };

    Comment.prototype.setDefaultComment = function() {
      console.log("..fjdkals");
      return this.$('textarea').val('Enter Your Comment...');
    };

    return Comment;

  })(Backbone.View);

}).call(this);
