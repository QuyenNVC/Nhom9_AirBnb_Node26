module.exports = {
  response: (res, payload, statusCode = 200) => {
    res.status(statusCode).json({
      status: "success",
      data: payload,
    });
  },
};
