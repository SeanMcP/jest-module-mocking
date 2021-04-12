const { getServiceAction } = require("./action-di");

describe("getServiceAction", () => {
  let context, guid, dependencies;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      dispatch: jest.fn(),
    };

    guid = "foo-guid";

    dependencies = {
      getService: jest.fn().mockResolvedValue({ data: [], success: true }),
      Logger: {
        error: jest.fn(),
      },
    };
  });

  it("Calls service", () => {
    getServiceAction(context, { guid }, dependencies);

    expect(dependencies.getService).toHaveBeenCalledTimes(1);
    expect(dependencies.getService.mock.calls[0][0]).toBe(guid);
  });

  it("When service call succeeds, dispatches action", async () => {
    const data = ["test", "response"];
    dependencies.getService.mockResolvedValueOnce({ data });
    await getServiceAction(context, { guid }, dependencies);

    expect(context.dispatch).toHaveBeenCalledTimes(1);
    expect(context.dispatch.mock.calls[0][0]).toBe("UPDATE_DATA");
    expect(context.dispatch.mock.calls[0][1]).toEqual(data);
  });

  it("When service call fails, logs message and error", async () => {
    dependencies.getService.mockRejectedValueOnce(new Error("Test Rejection"));
    await getServiceAction(context, { guid }, dependencies);

    expect(context.dispatch).toHaveBeenCalledTimes(0);
    expect(dependencies.Logger.error).toHaveBeenCalledTimes(1);
    expect(dependencies.Logger.error.mock.calls[0]).toHaveLength(2);
    expect(dependencies.Logger.error.mock.calls[0][0]).toBe(
      "[ getServiceAction ]"
    );
    expect(dependencies.Logger.error.mock.calls[0][1]).toBeTruthy();
  });
});
