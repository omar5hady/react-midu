import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

interface Props {
  type: SectionType;
  loading?: undefined | boolean;
  onChange: (value: string) => void;
  value: string;
}

const commonStyles = { border: 0, height: "200px", resize: 'none' as React.CSSProperties['resize'] };

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?:boolean }) => {
    if( type === SectionType.From ) return 'Intruducir texto'
    if( loading === true) return 'Cargando...'

    return 'Traducción'
}

const TextArea: React.FC<Props> = ({
  type,
  loading,
  value,
  onChange,
}) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#e9e8e8" };

      const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
      }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      disabled={ type === SectionType.To }
      placeholder={getPlaceholder( {type, loading } )}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextArea;
