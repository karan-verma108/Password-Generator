export default function PasswordLengthRange({ length, onChange }) {
  return (
    <div className='flex gap-3'>
      <input
        type='range'
        min={0}
        max={20}
        value={length}
        step={1}
        className='accent-indigo-800'
        onChange={onChange}
      />
      <p className='text-sm leading-3 font-medium text-black'>
        Length : {length}
      </p>
    </div>
  );
}
