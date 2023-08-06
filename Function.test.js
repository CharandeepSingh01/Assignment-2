const highlightHTMLContent = require("./Function");

describe("highlightHTMLContent", () => {

  it("Nested HTML", () => {
    const htmlContent = "<div><p>Help</p><span>Peoples</span></div>";
    const plainText = "Help Peoples";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 5, end: 11 },
    ];
    const expectedOutput = "<div><p><mark>Help</mark></p><span>Peoples</span></div>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  it("Text Position Out of Bound", () => {
    const htmlContent = "<p>Help Peoples</p>";
    const plainText = "Help Peoples";
    const plainTextPositions = [{ start: 13, end: 25 }];
    const expectedOutput = "<p>Help Peoples</p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  it("For Empty Input", () => {
    const htmlContent = "";
    const plainText = "Help peoples";
    const plainTextPositions = [{ start: 0, end: 12 }];
    const expectedOutput = "";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);

    const htmlContent2 = "<p>Help peoples</p>";
    const plainText2 = "";
    const plainTextPositions2 = [{ start: 0, end: 0 }];
    const expectedOutput2 = "<p>Help peoples</p>";
    expect(
      highlightHTMLContent(htmlContent2, plainText2, plainTextPositions2)
    ).toBe(expectedOutput2);

    const htmlContent3 = "<p>Help peoples</p>";
    const plainText3 = "Help peoples";
    const plainTextPositions3 = [];
    const expectedOutput3 = "<p>Help peoples</p>";
    expect(
      highlightHTMLContent(htmlContent3, plainText3, plainTextPositions3)
    ).toBe(expectedOutput3);
  });

  it("For Invalid Input", () => {
    const htmlContent = 123;
    const plainText = "Help Peoples";
    const plainTextPositions = [{ start: 0, end: 12 }];
    const expectedOutput = 123;
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);

    const htmlContent2 = "<p>Help Peoples</p>";
    const plainText2 = true;
    const plainTextPositions2 = [{ start: 0, end: 12 }];
    const expectedOutput2 = "<p>Help Peoples</p>";
    expect(
      highlightHTMLContent(htmlContent2, plainText2, plainTextPositions2)
    ).toBe(expectedOutput2);
});

  it("Single position", () => {
    const htmlContent = "<p>Help Peoples</p>";
    const plainText = "Help Peoples";
    const plainTextPositions = [{ start: 0, end: 4 }];
    const expectedOutput = "<p><mark>Help</mark> Peoples</p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  it("Multiple Position", () => {
    const htmlContent = "<p>Help Peoples</p>";
    const plainText = "Help Peoples";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 5, end: 12 },
    ];
    const expectedOutput = "<p><mark>Help</mark> <mark>Peoples</mark></p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });
});
