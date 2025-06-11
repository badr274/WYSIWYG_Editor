import { EditorState } from "draft-js";

export interface IToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  buttons: {
    label: string;
    style: string;
  }[];
}

const Toolbar = ({
  editorState,
  onToggleInlineStyle,
  buttons,
}: IToolbarProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="toolbar">
      {buttons.map((btn) => {
        const isActive = currentStyle.has(btn.style);
        return (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleInlineStyle(btn.style);
            }}
            className={isActive ? "active" : ""}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
