const FilterInput = ({ value, onSearch }) => {
  return (
    <div>
      Find Countries: <input name='search' onChange={onSearch} value={value}/>
    </div>
  );
};

export default FilterInput;
