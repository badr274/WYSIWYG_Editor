import { useState, useEffect } from "react";

import WysiwygEditor from "../components/WysiwygEditor";
import { EditorState, type RawDraftContentState } from "draft-js";
import Toolbar from "../components/Toolbar";
import ControlledDemo from "../components/demo";

interface IToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
}

const HomePage = () => {
  const initialContent: RawDraftContentState = {
    blocks: [
      {
        key: "initial",
        text: "Loading...",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  const [content, setContent] = useState<RawDraftContentState>(initialContent);
  const [loading, setLoading] = useState(true);

  // محاكاة تحميل بيانات من API
  const fakeApiFetch = (): Promise<RawDraftContentState> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          blocks: [
            {
              key: "init",
              text: "Hello World - content loaded asynchronously!",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        });
      }, 1500);
    });

  // محاكاة إرسال بيانات إلى API
  const fakeApiSend = (rawContent: RawDraftContentState): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("Content sent to fake API:", rawContent);
        resolve();
      }, 500);
    });

  useEffect(() => {
    fakeApiFetch().then((fetchedContent) => {
      setContent(fetchedContent);
      setLoading(false);
    });
  }, []);

  const handleChange = (newRawContent: RawDraftContentState) => {
    setContent(newRawContent);
    fakeApiSend(newRawContent);
  };

  const renderCustomToolbar = ({
    editorState,
    onToggleInlineStyle,
  }: IToolbarProps) => {
    const buttons = [
      { label: "Bold", style: "BOLD" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
      { label: "Code", style: "CODE" },
      { label: "Strikethrough", style: "STRIKETHROUGH" },
    ];

    return (
      <Toolbar
        buttons={buttons}
        editorState={editorState}
        onToggleInlineStyle={onToggleInlineStyle}
      />
    );
  };

  if (loading) return <h3>Loading content...</h3>;

  return (
    <>
      <h1>📝 WYSIWYG Editor Demo</h1>
      <div>
        <h2>Render Dynamic Toolbar Props</h2>
        <WysiwygEditor
          value={content}
          onChange={handleChange}
          renderToolbar={renderCustomToolbar}
        />
      </div>
      <div>
        <ControlledDemo />
      </div>
    </>
  );
};

export default HomePage;
