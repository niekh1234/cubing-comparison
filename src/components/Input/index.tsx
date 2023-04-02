import EventInput from './Event';
import Settings from './Settings';
import TimeInput from './Time';

const Input = () => {
  return (
    <div className="flex flex-wrap md:justify-center">
      <TimeInput></TimeInput>
      <EventInput></EventInput>
      <Settings></Settings>
    </div>
  );
};

export default Input;
