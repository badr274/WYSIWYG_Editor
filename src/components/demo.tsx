import { useRef, useState } from "react";
import WysiwygEditor from "./WysiwygEditor";
import type { RawDraftContentState } from "draft-js";

const initialContent: RawDraftContentState = {
  blocks: [
    {
      key: "init",
      text: "Hello from controlled editor",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const ControlledDemo = () => {
  const [controlledContent, setControlledContent] =
    useState<RawDraftContentState>(initialContent);

  const uncontrolledRef = useRef<{
    getRawContent: () => RawDraftContentState;
    setRawContent: (value: RawDraftContentState) => void;
  }>(null);

  const [uncontrolledLog, setUncontrolledLog] = useState<string>("");

  const handleLogUncontrolled = () => {
    const content = uncontrolledRef.current?.getRawContent();
    if (content) {
      setUncontrolledLog(JSON.stringify(content, null, 2));
    } else {
      setUncontrolledLog("⚠️ uncontrolledRef.current is undefined");
    }
  };

  const handleUpdateUncontrolled = () => {
    uncontrolledRef.current?.setRawContent({
      blocks: [
        {
          key: "uc1",
          text: "Updated from outside!",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    });
  };

  return (
    <div className="controllers-container">
      {/* Controlled */}
      <div>
        <h3>Controlled Editor</h3>
        <WysiwygEditor
          value={controlledContent}
          onChange={setControlledContent}
        />
        <h4>Controlled JSON Output:</h4>
        <pre>{JSON.stringify(controlledContent, null, 2)}</pre>
      </div>

      {/* Uncontrolled */}
      <div>
        <h3>Uncontrolled Editor</h3>
        <WysiwygEditor ref={uncontrolledRef} />
        <div>
          <button type="button" onClick={handleLogUncontrolled}>
            Log Uncontrolled
          </button>
          <button type="button" onClick={handleUpdateUncontrolled}>
            Set Uncontrolled
          </button>
        </div>
        <h4>Uncontrolled Log Output:</h4>
        <pre>{uncontrolledLog}</pre>
      </div>
    </div>
  );
};

export default ControlledDemo;
