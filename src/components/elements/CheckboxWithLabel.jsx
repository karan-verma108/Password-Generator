export default function CheckboxWithLabel({
  id,
  name,
  label,
  value,
  onChange,
}) {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className='text-lg leading-4 font-medium'>
        {label}
      </label>
    </div>
  );
}
