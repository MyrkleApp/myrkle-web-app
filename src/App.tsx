import { useState } from "react";
import "./App.css";

/**
 * *the code below should be run as part of husky setup:
 * npx mrm@2 lint-staged
 *
 * *to update packages to latest:
 * npm i -g npm-check-updates
 * ncu -u
 * npm install
 */

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
