const { getService } = require("./service");
const Logger = require("./logger");

function _getDependencies() {
  return {
    getService,
    Logger,
  };
}

async function getServiceAction(context, payload, _ = _getDependencies()) {
  try {
    const response = await _.getService(payload.guid);
    context.dispatch("UPDATE_DATA", response.data);
  } catch (err) {
    _.Logger.error("[ getServiceAction ]", err);
  }
}

module.exports = {
  getServiceAction,
};
