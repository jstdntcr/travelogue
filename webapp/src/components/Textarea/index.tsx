export const Textarea = ({
  name,
  label,
  state,
  setState,
}: {
  name: string;
  label: string;
  state: Record<string, any>;
  setState: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          setState({ ...state, text: e.target.value });
        }}
        value={state.text}
        name={name}
        id={name}
      />
    </div>
  );
};
