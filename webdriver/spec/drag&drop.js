
describe("drag&drop", function () {
	it("should ckeck drag & drop list", function () {
		browser.url("/");
		browser.dragAndDrop("#list0", "#list1");
	})
})
