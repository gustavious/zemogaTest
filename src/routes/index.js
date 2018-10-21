import {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  filterByCategory,
  filterByDateRange,
} from "../controllers";
import path from 'path';

export default async (app) => {
  // Create a new advertisement
  app.post('/advertisement', createAdvertisement);
  // Retrieve all advertisements
  app.get('/advertisements', getAllAdvertisements);
  // Fetch for advertisements that start and/or end within a specified date range
  app.get('/advertisements/dates', filterByDateRange);
  // Fetch advertisements that belong to a category
  app.get('/advertisements/categories/:category', filterByCategory);

  app.route('/advertisements/:id')
    // Fetch a specific advertisement
    .get(getAdvertisement)
    // Modify an advertisement
    .put(updateAdvertisement)
    // Delete an advertisement
    .delete(deleteAdvertisement);

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../UI/index.html'));
  });
}
