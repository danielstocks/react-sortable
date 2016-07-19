
describe("drag&drop", function () {
	it("should ckeck drag & drop list", function () {
		browser.url("/");
		browser.pause(1000);
		browser.dragAndDrop("#list0", "#list1");
		browser.pause(1000);
		expect(browser.getText("#list0")).toContain("Crimson")
	})
})
