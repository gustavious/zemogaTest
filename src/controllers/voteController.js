import {VoteModel as Vote, UserModel as User} from '../models'
import logger from '../core/logger'
import VoteModel from "../models/voteModel";


export const addVote = async (req, res) => {
  if (!req.body.user_id || !req.body.box_id || !req.body.vote) {
    res.status(500)
      .send({error: 'Missing params', required: 'user_id, box_id, vote < UP | DOWN >'});
    return;
  }
  if (req.body.vote !== 'UP' && req.body.vote !== 'DOWN') {
    res.status(500)
      .send({error: 'Wrong vote value', valid_values: 'UP, DOWN'});
    return;
  }
  try {
    await User.getUserById(req.body.user_id);
  } catch (e) {
    res.status(500)
      .send({error: `User id not found: ${req.body.user_id}`});
    return;
  }
  if (await Vote.countBoxVotesByUserId(req.body.user_id, req.body.box_id) >= 3){
    res.status(500)
      .send({error: 'Max number of votes per box reached', box_id: req.body.box_id, user_id: req.body.user_id});
    return;
  }
  const vote = new Vote({
    user_id: req.body.user_id,
    box_id: req.body.box_id,
    vote: req.body.vote,
  });

  try {
    const savedVote = await Vote.addVote(vote);
    logger.info('Adding Vote...');
    res.status(201)
      .send({
        message: `User ${vote.user_id} successfully voted`,
        vote: savedVote,
      });
  }
  catch(err) {
    logger.error('Error in voting: ', err);
    res.status(500)
      .send({error: `Got error during vote creation: ${err}`});
  }
};

export const getVotesByUser = async (req, res) => {
    try {
      await User.getUserById(req.body.user_id);
    } catch (e) {
      res.status(500)
        .send({error: `User id not found: ${req.body.user_id}`});
      return;
    }
  try {
    logger.info('Fetching user votes...');
    const votes = Vote.getVotesByUserId(req.params.id);
    res.status(200)
      .send({
        message: `Votes found for user`,
        votes
      });
  } catch(err) {
    logger.error('Error in getting users: ', err);
    res.status(500)
      .send({error: `Got error during user fetch: ${err}`});
  }
};

export const getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.getAll();
    logger.info('Sending all votes...');
    res.status(200).send(votes);
  }
  catch(err) {
    logger.error('Error in getting all votes: ' + err);
    res.status(500).send({error: `Got error in getAll: ${err}`});
  }
};
