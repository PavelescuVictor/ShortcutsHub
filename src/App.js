import './App.css';

function App() {
  return (
    <div className="App">
      <main class="main__wrapper">
        <div class="main__content main__content--hidden">
          <h1>Hello World!</h1>
          <p>
            Current theme source: <strong id="theme-source">System</strong>
          </p>

          <button id="toggle-dark-mode">Toggle Dark Mode</button>
          <button id="reset-to-system">Reset to System Theme</button>
        </div>
      </main>
    </div>
  );
}

export default App;
