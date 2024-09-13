const Filter = ({ onSearchChange }) => {
  return (
    <div>
      Search a name: <input name='search' onChange={onSearchChange} />
    </div>
  );
};

export default Filter;
