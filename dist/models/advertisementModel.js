'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
require('mongoose-type-url');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const advertisementSchema = _mongoose2.default.Schema({
  _id: { type: _mongoose2.default.SchemaTypes.ObjectId, auto: true },
  offer_msg: {
    type: String,
    required: [true, 'Required offer message'] },

  offer_graphic_url: {
    type: _mongoose2.default.SchemaTypes.Url,
    required: [true, 'Required offer graphic url'] },

  start_datetime: {
    type: Date,
    required: [true, 'Required start datetime'] },

  end_datetime: {
    type: Date,
    required: [true, 'Required end datetime'] },

  category: {
    type: String,
    required: [true, 'Required category'],
    uppercase: true } },

{ collection: 'Advertisement' });

let AdvertisementModel = _mongoose2.default.model('Advertisement', advertisementSchema);

AdvertisementModel.getAll = () => {
  return AdvertisementModel.find({});
};

AdvertisementModel.getAdvertisementById = id => {
  return AdvertisementModel.findById(id);
};

AdvertisementModel.addAdvertisement = adv => {
  return adv.save();
};

AdvertisementModel.updateAdvertisementById = (id, params) => {
  return AdvertisementModel.findByIdAndUpdate(id, params, { new: true });
};

AdvertisementModel.removeAdvertisement = id => {
  return AdvertisementModel.findByIdAndRemove(id);
};

AdvertisementModel.filterByCategory = category => {
  return AdvertisementModel.find({ category: { $regex: new RegExp(category, "i") } });
};

AdvertisementModel.filterByDateRange = dateFilter => {
  return AdvertisementModel.find(dateFilter);
};exports.default =

AdvertisementModel;