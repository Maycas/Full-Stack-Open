const FilterInput = ({ onSearch }) => {
  return (
    <div>
      Find Countries: <input name='search' onChange={onSearch} />
    </div>
  );
};

export default FilterInput;
