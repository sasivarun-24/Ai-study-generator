/**
 * Utility for interfacing with Google's Gemini API (1.5 Flash)
 * and providing a fallback Mock Generator for demo purposes.
 */

// A repository of rich mock data for standard study topics to make the Demo Mode look amazing
const MOCK_DATA_LIBRARY = {
  "react hooks": {
    title: "Understanding React Hooks",
    summary: "React Hooks allow functional components to use state and other React features without writing a class. Introduced in React 16.8, they simplify state sharing and lifecycle logic.",
    content: `# React Hooks: A Comprehensive Guide

React Hooks revolutionized how we write React code. They let you use state and other React features (like lifecycle methods) in functional components, rendering class components largely obsolete.

---

## 1. What are Hooks?
Hooks are JavaScript functions that "hook into" React state and lifecycle features from function components. They do not work inside classes.

### The Rules of Hooks
To use hooks correctly, you **must** follow two strict rules:
1. **Only Call Hooks at the Top Level:** Don't call Hooks inside loops, conditions, or nested functions. This ensures hooks are called in the same order each render.
2. **Only Call Hooks from React Functions:** Call them from React functional components or custom hooks, not regular JavaScript functions.

---

## 2. Core Built-in Hooks

### A. \`useState\`
Used to manage local state inside a functional component.
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### B. \`useEffect\`
Used to perform side effects in functional components (e.g., data fetching, subscriptions, manual DOM mutations). It combines the concepts of \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.
\`\`\`jsx
useEffect(() => {
  console.log("Component mounted or count updated");
  return () => console.log("Cleanup when component unmounts");
}, [count]); // Dependency array
\`\`\`

### C. \`useContext\`
Accepts a context object and returns the current context value, facilitating prop drilling avoidance.

---

## 3. Benefits of Hooks
* **Better Code Reuse:** Custom hooks allow you to extract component logic into reusable functions.
* **Simpler Components:** No need to understand \`this\` binding or manage complex lifecycle configurations.
* **Smaller Bundle Sizes:** Functional components minify better than ES6 classes.
`,
    flashcards: [
      { question: "What are the two main rules of React Hooks?", answer: "1. Only call hooks at the top level (not inside loops or conditions). 2. Only call hooks from React function components or custom hooks." },
      { question: "What hook would you use to store a user's form input locally?", answer: "The useState hook." },
      { question: "What is the purpose of the dependency array in useEffect?", answer: "It controls when the effect runs. If empty [], it runs once on mount. If it contains values, the effect re-runs when those values change." },
      { question: "How do you clean up a subscription or event listener in useEffect?", answer: "By returning a cleanup function from the useEffect callback." },
      { question: "Can hooks be used inside ES6 class components?", answer: "No, hooks can only be used in functional components or custom hooks." }
    ],
    quiz: [
      {
        question: "Which React Hook is used to manage component state?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState",
        explanation: "useState is the primary hook for defining and updating local state in a functional component."
      },
      {
        question: "When does a useEffect hook with an empty dependency array ([]) run?",
        options: ["On every render", "Only when the component unmounts", "Only once after the initial render (mount)", "Never"],
        correctAnswer: "Only once after the initial render (mount)",
        explanation: "An empty dependency array tells React that the effect doesn't depend on any props or state, so it only needs to run once when the component mounts."
      },
      {
        question: "What is a custom hook in React?",
        options: ["A hook imported from a third-party library", "A regular JS function whose name starts with 'use' and calls other hooks", "A lifecycle wrapper for class components", "A specialized hook for styling CSS"],
        correctAnswer: "A regular JS function whose name starts with 'use' and calls other hooks",
        explanation: "Custom hooks allow you to extract component state logic into reusable functions. They must start with 'use' so React can apply Hook rules."
      }
    ]
  },
  "photosynthesis": {
    title: "Deep Dive into Photosynthesis",
    summary: "Photosynthesis is the chemical process by which green plants, algae, and some bacteria convert light energy into chemical energy, creating glucose and oxygen from water and carbon dioxide.",
    content: `# Photosynthesis: Converting Light to Energy

Photosynthesis is the fundamental biological process that powers almost all life on Earth by converting solar energy into food (glucose).

---

## 1. The Chemical Equation
The process uses sunlight, water ($H_2O$), and carbon dioxide ($CO_2$) to produce glucose ($C_6H_{12}O_6$) and oxygen ($O_2$):

$$6CO_2 + 6H_2O + \\text{light energy} \\rightarrow C_6H_{12}O_6 + 6O_2$$

---

## 2. Where Does it Occur?
Photosynthesis takes place inside organelles called **chloroplasts**, located primarily in plant leaf cells.
* **Chlorophyll:** The green pigment inside chloroplasts that absorbs light energy (mostly blue and red wavelengths, reflecting green).
* **Thylakoids:** Disk-like membranes where the light-dependent reactions occur.
* **Stroma:** The fluid-filled space surrounding thylakoids where the light-independent reactions (Calvin Cycle) occur.

---

## 3. The Two Main Stages

### A. Light-Dependent Reactions
* **Location:** Thylakoid membrane.
* **Inputs:** Sunlight, Water ($H_2O$), $NADP^+$, $ADP$.
* **Outputs:** Oxygen ($O_2$ - released as a waste product), $ATP$, $NADPH$.
* **Action:** Sunlight excites electrons in chlorophyll, splitting water molecules ($photolysis$) to generate chemical energy carriers ($ATP$ and $NADPH$).

### B. Light-Independent Reactions (Calvin Cycle)
* **Location:** Stroma.
* **Inputs:** Carbon Dioxide ($CO_2$), $ATP$, $NADPH$.
* **Outputs:** Glucose ($C_6H_{12}O_6$), $NADP^+$, $ADP$.
* **Action:** Uses the energy stored in $ATP$ and $NADPH$ to fix carbon from $CO_2$ into stable sugar molecules.

---

## 4. Key Factors Affecting the Rate
1. **Light Intensity:** Higher intensity increases rate up to a plateau.
2. **CO2 Concentration:** More CO2 speeds up the Calvin Cycle.
3. **Temperature:** Enzymatic reactions are temperature-sensitive; extreme heat denatures enzymes.
`,
    flashcards: [
      { question: "What is the primary green pigment involved in photosynthesis?", answer: "Chlorophyll." },
      { question: "Which organelle is the site of photosynthesis in plant cells?", answer: "The Chloroplast." },
      { question: "What are the raw materials (inputs) needed for photosynthesis?", answer: "Carbon dioxide, water, and sunlight." },
      { question: "Where do the light-independent reactions (Calvin Cycle) take place?", answer: "In the stroma of the chloroplast." },
      { question: "What molecule is split during the light-dependent reactions to release oxygen?", answer: "Water (H2O)." }
    ],
    quiz: [
      {
        question: "What are the primary products of photosynthesis?",
        options: ["Carbon dioxide and water", "Glucose and oxygen", "ATP and NADPH", "Chlorophyll and glucose"],
        correctAnswer: "Glucose and oxygen",
        explanation: "Photosynthesis converts carbon dioxide and water into glucose (food source) and oxygen (byproduct)."
      },
      {
        question: "Which phase of photosynthesis splits water to release oxygen gas?",
        options: ["The Calvin Cycle", "Light-dependent reactions", "The Krebs Cycle", "Glycolysis"],
        correctAnswer: "Light-dependent reactions",
        explanation: "During light-dependent reactions, light energy splits water molecules (photolysis) to extract electrons, releasing oxygen as a byproduct."
      },
      {
        question: "What is the fluid-filled region of a chloroplast called where the Calvin Cycle occurs?",
        options: ["Thylakoid", "Stroma", "Mitochondria", "Granum"],
        correctAnswer: "Stroma",
        explanation: "The stroma is the fluid surrounding the thylakoids inside a chloroplast, hosting the enzymes for the light-independent Calvin Cycle."
      }
    ]
  },
  "sql joins": {
    title: "Mastering SQL Joins",
    summary: "SQL Joins are clauses used to combine records from two or more tables in a relational database based on a related column between them.",
    content: `# SQL Joins: Combining Relational Data

In relational databases, information is organized into multiple tables to reduce redundancy. **Joins** allow us to stitch this scattered data back together during queries.

---

## 1. Visualizing Joins
Think of Joins as Venn Diagrams representing the overlap between two tables (Left Table A and Right Table B).

---

## 2. Core SQL Join Types

### A. INNER JOIN
Returns records that have matching values in **both** tables.
\`\`\`sql
SELECT orders.OrderID, customers.CustomerName
FROM orders
INNER JOIN customers ON orders.CustomerID = customers.CustomerID;
\`\`\`
* *Visual:* The intersection of the two circles.

### B. LEFT (OUTER) JOIN
Returns **all** records from the left table, and the matched records from the right table. If no match is found, NULL values are returned for the right table's columns.
\`\`\`sql
SELECT customers.CustomerName, orders.OrderID
FROM customers
LEFT JOIN orders ON customers.CustomerID = orders.CustomerID;
\`\`\`
* *Use Case:* Finding customers who haven't placed any orders.

### C. RIGHT (OUTER) JOIN
Returns **all** records from the right table, and the matched records from the left table. If no match is found, NULL values are returned for the left table's columns.

### D. FULL (OUTER) JOIN
Returns all records when there is a match in **either** left or right table. Returns NULLs for missing fields on either side.

---

## 3. Best Practices
1. **Always Use Aliases:** Table aliases make complex join queries readable (e.g., \`FROM customers c JOIN orders o\`).
2. **Index Join Columns:** Ensure columns used in the \`ON\` clause (usually foreign keys) are indexed for speed.
3. **Be Specific in SELECT:** Avoid \`SELECT *\` to prevent redundant column names and excessive network payloads.
`,
    flashcards: [
      { question: "What is the difference between INNER JOIN and LEFT JOIN?", answer: "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table, plus matched rows from the right table (unmatched right rows become NULL)." },
      { question: "What will a LEFT JOIN return for right-table columns if no match is found?", answer: "NULL values." },
      { question: "What join returns all records when there is a match in EITHER table?", answer: "FULL OUTER JOIN." },
      { question: "Why is it important to use table aliases in JOIN statements?", answer: "Aliases shorten query lengths and clarify which table columns belong to when both tables share matching column names." },
      { question: "Which column types are most suitable for JOIN conditions?", answer: "Primary keys and Foreign keys (which should be indexed)." }
    ],
    quiz: [
      {
        question: "Which type of JOIN returns only the rows that have matching values in both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"],
        correctAnswer: "INNER JOIN",
        explanation: "INNER JOIN selects records that have matching values in both tables, omitting rows that don't satisfy the join predicate."
      },
      {
        question: "If Table A has 5 rows and Table B has 0 rows, how many rows will an INNER JOIN query return?",
        options: ["5 rows", "0 rows", "10 rows", "Depends on foreign key settings"],
        correctAnswer: "0 rows",
        explanation: "An INNER JOIN requires matching values in both tables. Since Table B is empty, no matches can exist, resulting in 0 rows."
      },
      {
        question: "Which clause is used to specify the matching columns in a JOIN statement?",
        options: ["WHERE", "HAVING", "ON", "USING KEY"],
        correctAnswer: "ON",
        explanation: "The ON clause defines the relationship criteria (join predicate) between the tables, e.g., ON tableA.id = tableB.foreign_id."
      }
    ]
  }
};

// Fallback generator for topics not explicitly saved in mock library
const generateGenericMock = (topic, material, difficulty) => {
  const cleanTopic = topic || "Pasted Notes Summary";
  const wordCount = material ? material.trim().split(/\s+/).length : 0;
  
  let notesBody = "";
  if (material) {
    notesBody = `## Summary of Provided Notes
We analyzed your provided study text (${wordCount} words) at a **${difficulty.toUpperCase()}** difficulty level.

### Key Points Extracted:
* **Core Theme:** The material concentrates on the fundamental rules and concepts of **${cleanTopic}**.
* **Essential Context:** The user provided details outlining processes, definitions, and applications related to this subject matter.
* **Secondary Takeaway:** Important contextual elements emphasize practical implementations and common mistakes.

### Structured Review of Paste Content:
${material.split('\n').filter(line => line.trim().length > 5).slice(0, 5).map(line => `* ${line.trim()}`).join('\n')}

---
`;
  }

  return {
    title: `Study Guide: ${cleanTopic}`,
    summary: `This is an AI-generated study summary of ${cleanTopic} adapted for the ${difficulty} comprehension tier, designed to help students quickly understand core definitions and details.`,
    content: `# ${cleanTopic} Study Guide (${difficulty} Mode)

Welcome to the structured study guide for **${cleanTopic}**. This study block has been calibrated for **${difficulty}** level comprehension.

---

## 1. Core Definition
**${cleanTopic}** refers to the main processes, paradigms, or subjects of study associated with this topic. In academic terms, understanding this requires analyzing its fundamental components, functions, and relational logic.

### Quick Breakdown
* **Concept Area:** Academic Study Block
* **Primary Scope:** Systems operations, terminology, and historical context.
* **Key Challenge:** Remembering structural properties and interconnections.

---

## 2. Key Concepts & Principles
To grasp the concept of ${cleanTopic}, one should master the following building blocks:

1. **Fundamental Axiom:** The core premise stating that everything in this framework relies on clean inputs and correct configurations.
2. **Operational Loop:** The mechanism that handles transitions, processing steps, or structural dependencies.
3. **Feedback/Outputs:** The resulting behaviors, variables, or items produced by this topic.

${notesBody}
## 3. Practical Study Tips
* **Active Recall:** Cover parts of these notes and try to recite the core definitions aloud.
* **Spaced Repetition:** Re-review this guide tomorrow, in 3 days, and again in a week.
* **Synthesized Learning:** Try to write a short paragraph explaining ${cleanTopic} in your own words.
`,
    flashcards: [
      { question: `What is the primary definition of ${cleanTopic}?`, answer: `It is the main academic subject/process under study, focusing on basic concepts and rules.` },
      { question: `What is a great way to study ${cleanTopic} actively?`, answer: `Utilizing active recall, spaced repetition, and explaining concepts in your own words.` },
      { question: `What is the core premise of ${cleanTopic}?`, answer: `Everything in this structure relies on clean inputs and correct configurations to function.` }
    ],
    quiz: [
      {
        question: `Which of the following best describes the core focus of ${cleanTopic}?`,
        options: ["Structural properties and logical rules", "Arbitrary memorization only", "Physical manipulation of lab gear", "Historical names only"],
        correctAnswer: "Structural properties and logical rules",
        explanation: `Understanding ${cleanTopic} requires looking at the foundational parameters, connections, and structural operations.`
      },
      {
        question: `How should a student use these study cards to optimize retention of ${cleanTopic}?`,
        options: ["Cramming all night", "Spaced repetition and self-testing", "Reading once and closing the app", "Highlighting every single word"],
        correctAnswer: "Spaced repetition and self-testing",
        explanation: "Cognitive science shows that testing yourself at increasing intervals (spaced repetition) yields the strongest long-term memory."
      }
    ]
  };
};

/**
 * Generate Study Guide, Flashcards, and Quizzes from AI or Mock fallback
 * @param {Object} params
 * @param {string} params.topic - Study topic entered by user
 * @param {string} params.material - Pasted notes text (optional)
 * @param {string} params.difficulty - 'beginner' | 'intermediate' | 'advanced'
 * @param {string} params.apiKey - Users Gemini API Key (optional)
 * @returns {Promise<Object>} Object containing { title, summary, content, flashcards, quiz }
 */
export const generateStudyContent = async ({ topic, material, difficulty, apiKey }) => {
  // Simulate network latency (2 seconds) for realistic async UX
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const trimmedTopic = topic ? topic.trim() : "";
  const trimmedMaterial = material ? material.trim() : "";
  
  if (!trimmedTopic && !trimmedMaterial) {
    throw new Error("Please enter a topic or paste study materials first.");
  }

  // If no API Key, fall back to Mock Data
  if (!apiKey || apiKey.trim() === "") {
    const searchKey = trimmedTopic.toLowerCase();
    if (MOCK_DATA_LIBRARY[searchKey]) {
      // Modify difficulty title tag slightly for representation
      const baseMock = JSON.parse(JSON.stringify(MOCK_DATA_LIBRARY[searchKey]));
      baseMock.title += ` (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode)`;
      return baseMock;
    }
    return generateGenericMock(trimmedTopic, trimmedMaterial, difficulty);
  }

  // API Call to Gemini
  const prompt = `
You are a brilliant study assistant and learning designer.
Analyze the following topic or pasted notes and compile a highly structured, premium-tier study package.
Adjust your explanations, vocabulary, and depth based on the selected target difficulty: "${difficulty}".
- 'beginner': Explain like the user is 5 years old (ELI5), use fun analogies, simple vocabulary, and short paragraphs.
- 'intermediate': Standard undergraduate/college student level, balance depth with accessibility.
- 'advanced': Expert/postgraduate level. Detailed, highly technical terminology, edge cases, and in-depth analysis.

Study Input Topic: "${trimmedTopic}"
Study Input Text Material: "${trimmedMaterial}"

You MUST respond with a single, valid JSON object ONLY.
Do NOT wrap the output in markdown codeblocks like \`\`\`json ... \`\`\`. Start with "{" and end with "}".
All keys must be double-quoted. Avoid parsing issues by escaping internal quotes and newlines inside the JSON values.

JSON Schema:
{
  "title": "A short, engaging title for this study session",
  "summary": "A 2-3 sentence TL;DR key summary of the topic.",
  "content": "A highly detailed study guide written in Markdown format. Use headers (#, ##, ###), bold text (**), lists (- or *), code blocks if programming-related, and clean horizontal lines. Make it readable, premium, and structured.",
  "flashcards": [
    {
      "question": "A concise study question testing core recall",
      "answer": "A clear, helpful answer to the question"
    }
  ],
  "quiz": [
    {
      "question": "A multiple-choice quiz question related to the note content",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "A short sentence explaining why this option is correct."
    }
  ]
}

Provide at least 3-5 flashcards and 3 quiz questions. Make sure the 'correctAnswer' exactly matches one of the values in the 'options' array.
`;

  // API Call to Gemini with fallback mechanisms
  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-3.1-flash-lite"];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generation_config: {
              response_mime_type: "application/json"
            }
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API Error (${response.status}): ${errText || 'Connection failed.'}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error("Empty response received from Gemini API. Try again.");
      }

      let cleanJSONText = responseText.trim();
      if (cleanJSONText.startsWith("```json")) {
        cleanJSONText = cleanJSONText.substring(7);
      } else if (cleanJSONText.startsWith("```")) {
        cleanJSONText = cleanJSONText.substring(3);
      }
      if (cleanJSONText.endsWith("```")) {
        cleanJSONText = cleanJSONText.substring(0, cleanJSONText.length - 3);
      }
      cleanJSONText = cleanJSONText.trim();

      const parsedData = JSON.parse(cleanJSONText);
      
      if (!parsedData.title || !parsedData.content || !parsedData.flashcards) {
        throw new Error("Response JSON lacks required study note keys.");
      }

      // Success! Return the data immediately
      return parsedData;
    } catch (err) {
      console.warn(`Model ${model} failed:`, err);
      lastError = err;
      // If the error is a client configuration or auth error (like 400 Bad Request, 403 Forbidden, 401 Unauthorized), 
      // retrying another model won't solve it, so we break immediately.
      if (err.message.includes("400") || err.message.includes("403") || err.message.includes("401")) {
        break;
      }
    }
  }

  // If we reach here, all models failed. We throw the last error, but append diagnostics.
  let debugInfo = "";
  try {
    const modelsResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`
    );
    if (modelsResp.ok) {
      const modelsData = await modelsResp.json();
      const modelNames = modelsData.models?.map(m => m.name.replace('models/', '')) || [];
      if (modelNames.length > 0) {
        debugInfo = ` Available models for this key: ${modelNames.join(', ')}`;
      } else {
        debugInfo = " No models returned for this key.";
      }
    } else {
      debugInfo = ` (ListModels failed: ${modelsResp.status})`;
    }
  } catch (e) {
    console.error("Failed to list models:", e);
  }
  throw new Error((lastError?.message || "Failed to establish contact with Gemini.") + debugInfo);
};
