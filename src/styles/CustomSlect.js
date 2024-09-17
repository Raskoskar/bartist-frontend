export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(6, 1, 63, 0.6)',
    borderColor: '#3f88c5',
    color: '#fff',
    borderRadius: '8px',
    padding: '2px',
    minHeight: '44px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#ccc',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(6, 1, 63, 0.9)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? 'rgba(63, 136, 197, 0.5)'
      : 'transparent',
    color: '#fff',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3f88c5',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#3373a1',
      color: 'white',
    },
  }),
};