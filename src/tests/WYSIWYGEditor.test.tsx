import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WysiwygEditor from "../components/WysiwygEditor";

test("calls onChange when editor content changes via toolbar buttons (Bold, Italic, Underline)", async () => {
  const rawContent = {
    blocks: [
      {
        key: "5g8yu",
        text: "Hello world",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  const handleChange = jest.fn();

  render(<WysiwygEditor value={rawContent} onChange={handleChange} />);

  const boldButton = await screen.findByRole("button", { name: /bold/i });
  await userEvent.click(boldButton);

  const italicButton = await screen.findByRole("button", { name: /italic/i });
  await userEvent.click(italicButton);

  const underlineButton = await screen.findByRole("button", {
    name: /underline/i,
  });
  await userEvent.click(underlineButton);

  expect(handleChange).toHaveBeenCalledTimes(3);
});
