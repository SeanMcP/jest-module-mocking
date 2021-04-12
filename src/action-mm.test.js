const { getServiceAction } = require("./action-di");

const { getService } = require("./service");
const Logger = require("./logger");
jest.mock("./service");
jest.mock("./logger");

describe("getServiceAction", () => {
  let context, guid;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      dispatch: jest.fn(),
    };

    guid = "foo-guid";
  });

  it("Calls service", () => {
    getServiceAction(context, { guid });

    expect(getService).toHaveBeenCalledTimes(1);
    expect(getService.mock.calls[0][0]).toBe(guid);
  });

  it("When service call succeeds, dispatches action", async () => {
    const data = ["test", "response"];
    getService.mockResolvedValueOnce({ data });
    await getServiceAction(context, { guid });

    expect(context.dispatch).toHaveBeenCalledTimes(1);
    expect(context.dispatch.mock.calls[0][0]).toBe("UPDATE_DATA");
    expect(context.dispatch.mock.calls[0][1]).toEqual(data);
  });

  it("When service call fails, logs message and error", async () => {
    getService.mockRejectedValueOnce(new Error("Test Rejection"));
    await getServiceAction(context, { guid });

    expect(context.dispatch).toHaveBeenCalledTimes(0);
    expect(Logger.error).toHaveBeenCalledTimes(1);
    expect(Logger.error.mock.calls[0]).toHaveLength(2);
    expect(Logger.error.mock.calls[0][0]).toBe("[ getServiceAction ]");
    expect(Logger.error.mock.calls[0][1]).toBeTruthy();
  });
});
