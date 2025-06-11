import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
  type RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Toolbar from "./Toolbar";

interface IToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
}

interface IWYSIWYGEditorProps {
  value?: RawDraftContentState;
  onChange?: (rawContent: RawDraftContentState) => void;
  className?: string;
  renderToolbar?: (args: IToolbarProps) => React.ReactNode;
}

const DefaultToolbar = ({
  editorState,
  onToggleInlineStyle,
}: IToolbarProps) => {
  const defaultButtons = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ];

  return (
    <Toolbar
      buttons={defaultButtons}
      editorState={editorState}
      onToggleInlineStyle={onToggleInlineStyle}
    />
  );
};

function rawContentStateEqual(
  a?: RawDraftContentState,
  b?: RawDraftContentState
): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

const WysiwygEditor = forwardRef(function WysiwygEditor(
  { className, onChange, renderToolbar, value }: IWYSIWYGEditorProps,
  ref: React.Ref<{
    getRawContent: () => RawDraftContentState;
    setRawContent: (value: RawDraftContentState) => void;
  }>
) {
  const isControlled = value !== undefined && onChange !== undefined;

  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (isControlled && value) {
      try {
        return EditorState.createWithContent(convertFromRaw(value));
      } catch {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (
      isControlled &&
      value &&
      !rawContentStateEqual(
        value,
        convertToRaw(editorState.getCurrentContent())
      )
    ) {
      try {
        const contentState = convertFromRaw(value);
        setEditorState(EditorState.createWithContent(contentState));
      } catch {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [isControlled, value, editorState]);

  const handleEditorChange = useCallback(
    (state: EditorState) => {
      if (isControlled && onChange) {
        onChange(convertToRaw(state.getCurrentContent()));
      }
      setEditorState(state);
    },
    [isControlled, onChange]
  );

  const handleToggleInlineStyle = useCallback(
    (style: string) => {
      handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    },
    [editorState, handleEditorChange]
  );

  // ✅ Expose methods for uncontrolled mode
  useImperativeHandle(ref, () => ({
    getRawContent: () => convertToRaw(editorState.getCurrentContent()),
    setRawContent: (raw) => {
      const contentState = convertFromRaw(raw);
      setEditorState(EditorState.createWithContent(contentState));
    },
  }));

  return (
    <div className={className || "editor-container"}>
      {(renderToolbar || DefaultToolbar)({
        editorState,
        onToggleInlineStyle: handleToggleInlineStyle,
      })}
      <div
        onClick={() => editorRef.current?.focus()}
        className="editor"
        data-testid="editor-container"
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
});

export default WysiwygEditor;
