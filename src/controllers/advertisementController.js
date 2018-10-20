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
    start_datetime: new Date(start_datetime).toISOString(),
    end_datetime: new Date(end_datetime).toISOString(),
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
    if (advertisement == null) {
      res.status(404)
        .send({error: `Advertisement ID not found: ${req.params.id}`});
      return;
    }
    res.status(200)
      .send({
        message: 'Advertisement found',
        advertisement
      });
  } catch(err) {
    logger.error('Error in getting advertisement: ', err);
    res.status(404)
      .send({error: 'Got error during advertisement fetch: Advertisement ID not found'});
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
    if (removedAdv == null) {
      res.status(404)
        .send({error: `Advertisement ID not found: ${req.params.id}`});
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
    res.status(404).send({error: 'Got error while deleting advertisement: Advertisement ID not found'});
  }
};

export const filterByCategory = async (req, res) => {
  const {category} = req.params;
  if (!category) {
    res.status(500)
      .send({error: 'Missing params', required: 'category'});
    return;
  }
  try {
    const filteredAdvertisements = await Advertisemnt.filterByCategory(category);
    if (filteredAdvertisements.length === 0){
      res.status(200)
        .send({
          message: `No Advertisements found for category ${category}`,
        });
    }
    res.status(200)
      .send({
        message: `Advertisements found for category ${category}`,
        advertisements: filteredAdvertisements,
      });
  } catch (e) {
    res.status(404)
      .send({error: `No advertisements found for category: ${req.params.category}`});
  }
};

export const filterByDateRange = async (req, res) => {
  const {filter_by, initial_date, final_date} = req.query;
  if (!filter_by || !initial_date || !final_date) {
    res.status(500)
      .send({error: 'Missing query_string params', required: 'filterBy<START|END|BOTH>, initial_date, final_date'});
    return;
  }
  if (filter_by !== 'START' && filter_by !== 'END' && filter_by !== 'BOTH') {
    res.status(500)
      .send({error: 'Wrong value for filter_by', validValues: 'START, END, BOTH'});
    return;
  }
  try {
    let dateFilter = {};
    if (filter_by === 'START'){
      dateFilter = {'start_datetime': {'$gte': initial_date, '$lte': final_date}};
    } else if (filter_by === 'END'){
      dateFilter = {'end_datetime': {'$gte': initial_date, '$lte': final_date}};
    } else {
      dateFilter = {
        'start_datetime': {'$gte': initial_date, '$lte': final_date},
        'end_datetime': {'$gte': initial_date, '$lte': final_date}
      };
    }
    const filteredAdvertisements = await Advertisemnt.filterByDateRange(dateFilter);
    res.status(200)
      .send({
        message: `Advertisements found for range ${initial_date} to ${final_date}`,
        filteredBy: filter_by,
        advertisements: filteredAdvertisements,
      });
  } catch (e) {
    res.status(500)
      .send({error: `Error during filtering: ${e}`});
  }
};
