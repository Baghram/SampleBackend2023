function errorHandler(data, type) {
  switch (type) {
    case "include":
      return {
        message: `${data} must be Included`,
      };
    case "blank":
      return {
        message: `${data} cannot be blank`,
      };
    case "wrong":
      return {
        message: `wrong ${data}`,
      };
    case "notFound":
      return {
        message: `${data} not found`,
      };
    case "exist":
      return {
        message: `${data} already exist`,
      };

      break;

    default:
      return {
        message: "Internal Server Error",
      };
      break;
  }
}

module.exports = errorHandler;
