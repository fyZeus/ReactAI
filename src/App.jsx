import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = document.getElementById("content").value;
    const ai = await requestToGroqAI(content);
    setData(ai);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto"
    >
      <motion.h1
        className="text-4xl text-indigo-500"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ZeusAI
      </motion.h1>
      <motion.form
        className="flex flex-col gap-4 py-4 w-full"
        onSubmit={handleSubmit}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          className="py-2 px-4 text-md rounded-md"
          placeholder="Send a message"
          id="content"
          type="text"
          onKeyPress={handleKeyPress}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </motion.form>
      <motion.div
        className="max-w-full rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: data ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {data ? (
          <SyntaxHighlight
            language="swift"
            style={darcula}
            wrapLongLines={true}
          >
            {data}
          </SyntaxHighlight>
        ) : null}
      </motion.div>
    </motion.main>
  );
}

export default App;
