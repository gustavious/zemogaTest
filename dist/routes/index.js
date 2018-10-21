'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _controllers = require('../controllers');








var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

async app => {
  // Create a new advertisement
  app.post('/advertisement', _controllers.createAdvertisement);
  // Retrieve all advertisements
  app.get('/advertisements', _controllers.getAllAdvertisements);
  // Fetch for advertisements that start and/or end within a specified date range
  app.get('/advertisements/dates', _controllers.filterByDateRange);
  // Fetch advertisements that belong to a category
  app.get('/advertisements/categories/:category', _controllers.filterByCategory);

  app.route('/advertisements/:id')
  // Fetch a specific advertisement
  .get(_controllers.getAdvertisement)
  // Modify an advertisement
  .put(_controllers.updateAdvertisement)
  // Delete an advertisement
  .delete(_controllers.deleteAdvertisement);

  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../UI/index.html'));
  });
};