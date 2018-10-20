import mongoose from 'mongoose';
import 'mongoose-type-url';

const advertisementSchema = mongoose.Schema({
  _id: { type: mongoose.SchemaTypes.ObjectId, auto: true },
  offer_msg: {
    type: String,
    required: [true, 'Required offer message'],
    lowercase: true
  },
  offer_graphic_url: {
    type: mongoose.SchemaTypes.Url,
    required: [true, 'Required offer graphic url'],
    lowercase: true
  },
  start_datetime: {
    type: Date,
    required: [true, 'Required start datetime'],
  },
  end_datetime: {
    type: Date,
    required: [true, 'Required end datetime'],
  },
  category: {
    type: String,
    required: [true, 'Required category'],
  }
}, {collection : 'Advertisement'});

let AdvertisementModel = mongoose.model('Advertisement', advertisementSchema);

AdvertisementModel.getAll = () => {
  return AdvertisementModel.find({});
};

AdvertisementModel.getAdvertisementById = (id) => {
  return AdvertisementModel.findById(id);
};

AdvertisementModel.addAdvertisement = (adv) => {
  return adv.save();
};

AdvertisementModel.updateAdvertisementById = (id, params) => {
  return AdvertisementModel.findByIdAndUpdate(id, params);
};

AdvertisementModel.removeAdvertisement = (id) => {
  return AdvertisementModel.remove({_id: id});
};


export default AdvertisementModel;