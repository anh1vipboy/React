import TinyMCEEditor from "@/components/TinyMCEEditor";

const getLabel = (field: any) => {
  const viVn = field.meta.translations?.find(
    (t: any) => t.language === "vi-VN"
  );
  return viVn ? viVn.translation : field.field;
};

export const renderFormField = (
  field: any,
  value: any,
  onChange: (name: string, value: any) => void
) => {
  const label = getLabel(field);
  const name = field.field;
  const interfaceType = field.meta.interface;
  const options = field.meta.options;

  switch (interfaceType) {
    case "input":
      return (
        <div key={name} className="mb-3">
          <label className="form-label">{label}</label>
          <input
            className="form-control"
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
      );

    case "select-dropdown":
      return (
        <div key={name} className="mb-3">
          <label className="form-label">{label}</label>
          <select
            className="form-select"
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {options?.choices?.map((c: any) => (
              <option key={c.value} value={c.value}>
                {c.text}
              </option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div key={name} className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(name, e.target.checked)}
          />
          <label className="form-check-label">{label}</label>
        </div>
      );

    case "datetime":
      return (
        <div key={name} className="mb-3">
          <label className="form-label">{label}</label>
          <input
            type="datetime-local"
            className="form-control"
            value={value || ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
      );

    case "input-rich-text-html":
      return (
        <TinyMCEEditor
          key={name}
          value={value || ""}
          onChange={(content) => onChange(name, content)}
          label={label}
          fieldName={name}
        />
      );

    default:
      return null;
  }
};
