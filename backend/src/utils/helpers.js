exports.returnjson = (statuscode, message, data) => {
  return {
    statuscode: statuscode,
    message: message,
    data: data,
  };
};
