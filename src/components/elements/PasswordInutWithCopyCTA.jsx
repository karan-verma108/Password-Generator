export default function PasswordInputWithCopyCTA({
  password,
  inputRef,
  copyCtaStatus,
  onClick,
}) {
  return (
    <div className='flex gap-3 p-3 items-center shadow-xl rounded-lg border border-slate-200'>
      <input
        type='text'
        ref={inputRef}
        id='generatedPassword'
        name='generatedPassword'
        value={password}
        readOnly
        className='border border-slate-400 p-2 text-lg leading-4 font-normal bg-white'
      />
      <button
        className='relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group cursor-pointer'
        onClick={onClick}
      >
        <span className='absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease'></span>
        <span className='absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease'>
          <span className='absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md'></span>
          <span className='absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md'></span>
        </span>
        <span className='relative text-white'>{copyCtaStatus.label}</span>
      </button>
    </div>
  );
}
