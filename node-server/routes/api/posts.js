const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const mongoose = require('mongoose');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User model
const User = require('../../models/User');
// Load Post model
const Post = require('../../models/Post');

// Load Input validation
const validatePostInputs = require('../../validations/post');
const validateCommentInputs = require('../../validations/comment');

// @route GET api/posts/test
// @desc Tests posts route
// @access public
router.get('/test', (req, res) => res.send({ message: 'posts api reached' }));

// @route GET api/posts
// @desc Gets all posts
// @access public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.sendStatus(404));
});

// @route GET api/posts/:id
// @desc Gets post by Id
// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.sendStatus(404));
});

// @route DELETE api/posts/:id
// @desc Delete post by Id
// @access private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res.sendStatus(401);
            }

            // Delete Post
            Post.findByIdAndRemove(req.params.id)
              .then(() => res.sendStatus(204))
              .catch(err => res.sendStatus(404));
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'no post found for the id' })
          );
      })
      .catch(err => res.status(404).json({ nouser: 'Invalid user id' }));
  }
);

// @route POST api/posts
// @desc Add a post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInputs(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.body.id
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/posts/like/:id
// @desc Add a like
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'user aleady liked this post' });
            } else {
              // Add user id to likes array
              post.likes.unshift({ user: req.user.id });

              post.save().then(post => res.json(post));
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'no post found for the id' })
          );
      })
      .catch(err => res.status(404).json({ nouser: 'Invalid user id' }));
  }
);

// @route POST api/posts/unlike/:id
// @desc Remove a like
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notliked: 'user has not yet liked this post' });
            }
            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            // Splice out of array
            if (removeIndex >= 0) {
              post.likes.splice(removeIndex, 1);

              post.save().then(post => res.json(post));
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: 'no post found for the id' })
          );
      })
      .catch(err => res.status(404).json({ nouser: 'Invalid user id' }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Deletes a comment
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotfound: 'comment for this id does not exist' });
        }
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Delete comment from comments array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: 'no post found for the id' })
      );
  }
);

// @route POST api/posts/comment/:id
// @desc Add a comment
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInputs(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findById(req.user.id).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            name: req.body.name,
            avatar: req.body.name,
            text: req.body.text
          };
          // Add comment to comments array
          post.comments.push(newComment);

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: 'no post found for the id' })
        );
    });
  }
);

module.exports = router;
