const { getService } = require("./service");
const Logger = require("./logger");

async function getServiceAction(context, payload) {
  try {
    const response = await getService(payload.guid);
    context.dispatch("UPDATE_DATA", response.data);
  } catch (err) {
    Logger.error("[ getServiceAction ]", err);
  }
}

module.exports = {
  getServiceAction,
};
