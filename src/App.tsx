import Input from './components/Input';
import Table from './components/Table';

const App = () => {
  return (
    <main className='w-screen h-screen bg-indigo-50'>
      <section className='max-w-5xl px-2 py-12 mx-auto md:px-4'>
        <h1 className='text-3xl font-bold text-center text-transparent text-indigo-500 md:text-4xl lg:text-5xl'>
          Ideal average calculator
        </h1>

        <div className='mt-8 md:mt-16'>
          <Input></Input>
        </div>

        <Table></Table>
      </section>
    </main>
  );
};

export default App;
