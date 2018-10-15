import jwt from "express-jwt";

export const authMiddleware = jwt({
  secret: 'zemoga-secret',
  requestProperty: 'auth',
  getToken: req => {
    const authHeader: ?string = req.header('Authorization');
    if (authHeader != null && authHeader.split(' ')[0].toLowerCase() === 'bearer') {
      return authHeader.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({path: ['/favicon.ico','/users']});

