import useStore from '../../store';

const TimeInput = () => {
  const { time, setTime } = useStore();

  return (
    <div className="w-full md:mr-4 md:w-auto">
      <div className="flex flex-col">
        <label htmlFor="timeInput" className="text-gray-500">
          Your current average
        </label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          id="timeInput"
          type="text"
          placeholder="1:30, 10.23"
          className="max-w-full input-primary"
        ></input>
      </div>
    </div>
  );
};

export default TimeInput;
