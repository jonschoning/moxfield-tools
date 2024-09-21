import { getDeckByName, getDecklist, getDecksByFolder } from ".";

describe.skip("api test", () => {
  it("getDecks should pass", async () => {
    const result = await getDecklist();
    expect(result.decks.length).toBeGreaterThan(0);
  });

  it("getDeckByName should pass", async () => {
    const result = await getDeckByName({ name: "anya_current" });
    expect(result.name).toBe("anya_current");
  });
  it("getDecksByFolder should pass for unnamed folder", async () => {
    const result = await getDecksByFolder();
    const names = result.map((_) => _.name);
    expect(names.length).toBe(13);
  });
  it("getDecksByFolder should pass for named folder", async () => {
    const result = await getDecksByFolder({ folder: "REF" });
    const names = result.map((_) => _.name);
    expect(names.length).toBe(2);
  });
});
