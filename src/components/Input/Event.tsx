import useStore from '../../store';

const EventInput = () => {
  const { event, setEvent, table } = useStore();

  if (!table?.rows) {
    return null;
  }

  const events = table.rows.map((row) => ({ key: row.key, title: row.event }));

  return (
    <div className="flex flex-col mr-4">
      <label htmlFor="eventInput" className="text-gray-500">
        Select event
      </label>
      <select
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        id="eventInput"
        className="input-primary"
      >
        {events.map((event) => (
          <option key={event.key} value={event.key}>
            {event.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventInput;
