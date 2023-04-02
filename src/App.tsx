import { useEffect } from 'react';
import Input from './components/Input';
import Table from './components/Table';
import useStore from './store';

const App = () => {
  const { loaded, reset, updateRecords, setLoaded } = useStore();

  useEffect(() => {
    if (!loaded) {
      reset();
      setLoaded(true);
    } else {
      updateRecords();
    }
  }, [loaded]);

  return (
    <main className="w-screen min-h-screen bg-indigo-50">
      <section className="max-w-5xl px-2 py-12 mx-auto md:px-4">
        <h1 className="text-3xl font-bold text-center text-transparent text-indigo-500 md:text-4xl lg:text-5xl">
          Ideal average calculator
        </h1>

        <h3 className="text-center text-indigo-400 text-lg mt-4">
          WR times are updated every 24 hours.
        </h3>

        <div className="mt-8 md:mt-12">
          <Input></Input>
        </div>

        <Table></Table>

        <div className="text-center mt-12 text-indigo-800">
          Made with ❤️ by{' '}
          <a href="https://github.com/niekh1234" className="underline">
            niekh1234
          </a>
          <br></br>
          Something wrong? Submit an issue{' '}
          <a className="underline" href="https://github.com/niekh1234/cubing-comparison/issues">
            here
          </a>
        </div>
      </section>
    </main>
  );
};

export default App;
