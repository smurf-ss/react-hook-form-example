import { useWatch, Control } from "react-hook-form";

type FieldWatchedProps = {
  control: Control<any>; // any ได้ไม่เอา type ไปใช้ต่อ
  name: string;
};

const FieldWatched = ({ control, name }: FieldWatchedProps) => {
  const field = useWatch({
    control,
    name, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "", // default value before the render
  });
  return (
    <p>
      Watch {name}: {field}
    </p>
  ); // only re-render at the component level, when firstName changes
};

export default FieldWatched;
