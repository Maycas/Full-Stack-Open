const PersonsForm = ({onInputChange, onSubmit}) => {
  return (
    <form>
      <div>
        name: <input name='name' onChange={onInputChange} />
      </div>
      <div>
        number: <input name='number' onChange={onInputChange} />
      </div>
      <div>
        <button type='submit' onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonsForm