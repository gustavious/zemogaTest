'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.filterByDateRange = exports.filterByCategory = exports.deleteAdvertisement = exports.updateAdvertisement = exports.getAllAdvertisements = exports.getAdvertisement = exports.createAdvertisement = undefined;var _models = require('../models');
var _logger = require('../core/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const createAdvertisement = exports.createAdvertisement = async (req, res) => {
  if (!req.body.offer_msg || !req.body.offer_graphic_url ||
  !req.body.start_datetime || !req.body.end_datetime ||
  !req.body.category) {
    res.status(500).
    send({ error: 'Missing params', required: 'offer_msg, offer_graphic_url, start_datetime, end_datetime, category' });
    return;
  }
  const { offer_msg, offer_graphic_url, start_datetime, end_datetime, category } = req.body;
  const advertisement = new _models.AdvertisementModel({
    offer_msg,
    offer_graphic_url,
    start_datetime: new Date(start_datetime).toISOString(),
    end_datetime: new Date(end_datetime).toISOString(),
    category });

  try {
    const saveAdvertisement = await _models.AdvertisementModel.addAdvertisement(advertisement);
    _logger2.default.info('Adding Advertisement...');
    res.status(201).
    send({
      message: `Successfully created a new advertisement metadata`,
      advertisement: saveAdvertisement });

  }
  catch (err) {
    _logger2.default.error('Error creating advertisement: ', err);
    res.status(500).
    send({ error: `Got error during advertisement creation: ${err}` });
  }
};

const getAdvertisement = exports.getAdvertisement = async (req, res) => {
  try {
    _logger2.default.info('Fetching advertisement...');
    const advertisement = await _models.AdvertisementModel.getAdvertisementById(req.params.id);
    if (advertisement == null) {
      res.status(404).
      send({ error: `Advertisement ID not found: ${req.params.id}` });
      return;
    }
    res.status(200).
    send({
      message: 'Advertisement found',
      advertisement });

  } catch (err) {
    _logger2.default.error('Error in getting advertisement: ', err);
    res.status(404).
    send({ error: 'Got error during advertisement fetch: Advertisement ID not found' });
  }
};

const getAllAdvertisements = exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await _models.AdvertisementModel.getAll();
    _logger2.default.info('Sending all advertisements...');
    res.status(200).send(advertisements);
  }
  catch (err) {
    _logger2.default.error('Error in getting all advertisements: ' + err);
    res.status(500).send({ error: `Got error in getAllAdvertisements: ${err}` });
  }
};

const updateAdvertisement = exports.updateAdvertisement = async (req, res) => {
  try {
    const advertisement = await _models.AdvertisementModel.updateAdvertisementById(req.params.id, req.body);
    if (advertisement == null) {
      res.status(500).
      send({ error: `Advertisement ID not found: ${req.body.id}` });
      return;
    }
    _logger2.default.info('Updating advertisement...');
    res.status(200).send(advertisement);
  }
  catch (err) {
    _logger2.default.error('Error in updating an advertisement: ' + err);
    res.status(500).send({ error: `Got error while updating advertisement: ${err}` });
  }
};

const deleteAdvertisement = exports.deleteAdvertisement = async (req, res) => {
  try {
    const removedAdv = await _models.AdvertisementModel.removeAdvertisement(req.params.id);
    if (removedAdv == null) {
      res.status(404).
      send({ error: `Advertisement ID not found: ${req.params.id}` });
      return;
    }
    _logger2.default.info('Deleted Advertisement: ' + removedAdv);
    res.status(202).send({
      message: 'Advertisement successfully deleted',
      removedAdvertisement: removedAdv });

  }
  catch (err) {
    _logger2.default.error('Failed to delete advertisement: ' + err);
    res.status(404).send({ error: 'Got error while deleting advertisement: Advertisement ID not found' });
  }
};

const filterByCategory = exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    res.status(500).
    send({ error: 'Missing params', required: 'category' });
    return;
  }
  try {
    const filteredAdvertisements = await _models.AdvertisementModel.filterByCategory(category);
    if (filteredAdvertisements.length === 0) {
      res.status(200).
      send({
        message: `No Advertisements found for category ${category}` });

    }
    res.status(200).
    send({
      message: `Advertisements found for category ${category}`,
      advertisements: filteredAdvertisements });

  } catch (e) {
    res.status(404).
    send({ error: `No advertisements found for category: ${req.params.category}` });
  }
};

const filterByDateRange = exports.filterByDateRange = async (req, res) => {
  const { filter_by, initial_date, final_date } = req.query;
  if (!filter_by || !initial_date || !final_date) {
    res.status(500).
    send({ error: 'Missing query_string params', required: 'filterBy<START|END|BOTH>, initial_date, final_date' });
    return;
  }
  if (filter_by !== 'START' && filter_by !== 'END' && filter_by !== 'BOTH') {
    res.status(500).
    send({ error: 'Wrong value for filter_by', validValues: 'START, END, BOTH' });
    return;
  }
  try {
    let dateFilter = {};
    if (filter_by === 'START') {
      dateFilter = { 'start_datetime': { '$gte': initial_date, '$lte': final_date } };
    } else if (filter_by === 'END') {
      dateFilter = { 'end_datetime': { '$gte': initial_date, '$lte': final_date } };
    } else {
      dateFilter = {
        'start_datetime': { '$gte': initial_date, '$lte': final_date },
        'end_datetime': { '$gte': initial_date, '$lte': final_date } };

    }
    const filteredAdvertisements = await _models.AdvertisementModel.filterByDateRange(dateFilter);
    res.status(200).
    send({
      message: `Advertisements found for range ${initial_date} to ${final_date}`,
      filteredBy: filter_by,
      advertisements: filteredAdvertisements });

  } catch (e) {
    res.status(500).
    send({ error: `Error during filtering: ${e}` });
  }
};