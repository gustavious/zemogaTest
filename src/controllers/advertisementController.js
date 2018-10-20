import {AdvertisementModel as Advertisemnt} from '../models'
import logger from '../core/logger'


export const createAdvertisement = async (req, res) => {
  if (!req.body.offer_msg || !req.body.offer_graphic_url ||
    !req.body.start_datetime || !req.body.end_datetime ||
    !req.body.category) {
    res.status(500)
      .send({error: 'Missing params', required: 'offer_msg, offer_graphic_url, start_datetime, end_datetime, category'});
    return;
  }
  const {offer_msg, offer_graphic_url, start_datetime, end_datetime, category} = req.body;
  const advertisement = new Advertisemnt({
    offer_msg,
    offer_graphic_url,
    start_datetime,
    end_datetime,
    category,
  });
  try {
    const saveAdvertisement = await Advertisemnt.addAdvertisement(advertisement);
    logger.info('Adding Advertisement...');
    res.status(201)
      .send({
        message: `Successfully created a new advertisement metadata`,
        advertisement: saveAdvertisement,
      });
  }
  catch(err) {
    logger.error('Error creating advertisement: ', err);
    res.status(500)
      .send({error: `Got error during advertisement creation: ${err}`});
  }
};

export const getAdvertisement = async (req, res) => {
  try {
    logger.info('Fetching advertisement...');
    const advertisement = await Advertisemnt.getAdvertisementById(req.params.id);
    res.status(200)
      .send({
        message: 'Advertisement found',
        advertisement
      });
  } catch(err) {
    logger.error('Error in getting advertisement: ', err);
    res.status(500)
      .send({error: `Got error during advertisement fetch: ${err}`});
  }
};

export const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisemnt.getAll();
    logger.info('Sending all advertisements...');
    res.status(200).send(advertisements);
  }
  catch(err) {
    logger.error('Error in getting all advertisements: ' + err);
    res.status(500).send({error: `Got error in getAllAdvertisements: ${err}`});
  }
};

export const updateAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisemnt.updateAdvertisementById(req.params.id, req.body);
    if (advertisement == null) {
      res.status(500)
        .send({error: `Advertisement ID not found: ${req.body.id}`});
      return;
    }
    logger.info('Updating advertisement...');
    res.status(200).send(advertisement);
  }
  catch(err) {
    logger.error('Error in updating an advertisement: ' + err);
    res.status(500).send({error: `Got error while updating advertisement: ${err}`});
  }
};

export const deleteAdvertisement = async (req, res) => {
  try{
    const removedAdv = await Advertisemnt.removeAdvertisement(req.params.id);
    if (removedAdv.n === 0) {
      res.status(500)
        .send({error: `Advertisement ID not found: ${req.body.id}`});
      return;
    }
    logger.info('Deleted Advertisement: ' + removedAdv);
    res.status(202).send({
      message: 'Advertisement successfully deleted',
      removedAdvertisement:  removedAdv,
    });
  }
  catch(err) {
    logger.error('Failed to delete advertisement: ' + err);
    res.status(500).send({error: `Got error while deleting advertisement :( ${err}`});
  }
};

export const filterByCategory = async (req, res) => {
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
