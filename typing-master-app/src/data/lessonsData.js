// Finger zone mapping for QWERTY keyboard keys
export const QWERTY_FINGER_MAP = {
  // Left Hand
  'q': 'pinky', 'a': 'pinky', 'z': 'pinky', '1': 'pinky', '!': 'pinky',
  'w': 'ring', 's': 'ring', 'x': 'ring', '2': 'ring', '@': 'ring',
  'e': 'middle', 'd': 'middle', 'c': 'middle', '3': 'middle', '#': 'middle',
  'r': 'index', 'f': 'index', 'v': 'index', 't': 'index', 'g': 'index', 'b': 'index', '4': 'index', '$': 'index', '5': 'index', '%': 'index',
  
  // Thumbs
  ' ': 'thumb',

  // Right Hand
  'y': 'index', 'h': 'index', 'n': 'index', 'u': 'index', 'j': 'index', 'm': 'index', '6': 'index', '^': 'index', '7': 'index', '&': 'index',
  'i': 'middle', 'k': 'middle', ',': 'middle', '<': 'middle', '8': 'middle', '*': 'middle',
  'o': 'ring', 'l': 'ring', '.': 'ring', '>': 'ring', '9': 'ring', '(': 'ring',
  'p': 'pinky', ';': 'pinky', ':': 'pinky', '/': 'pinky', '?': 'pinky', '0': 'pinky', ')': 'pinky', '\'': 'pinky', '"': 'pinky', '[': 'pinky', ']': 'pinky'
};

// Beginner Lessons Catalog
export const BEGINNER_LESSONS = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: Home Row - Left Hand (A S D F)',
    targetKeys: ['a', 's', 'd', 'f'],
    fingerTip: 'Left Pinky on A | Left Ring on S | Left Middle on D | Left Index on F',
    text: 'asdf asdf fdas fdas asdf asdf fads fads asdf asdf'
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: Home Row - Right Hand (J K L ;)',
    targetKeys: ['j', 'k', 'l', ';'],
    fingerTip: 'Right Index on J | Right Middle on K | Right Ring on L | Right Pinky on ;',
    text: 'jkl; jkl; ;lkj ;lkj jkl; jkl; klj; klj; jkl; jkl;'
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: Complete Home Row Master (A S D F J K L ;)',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'g', 'h'],
    fingerTip: 'Rest fingers on home row. Extend Left Index to G, Right Index to H.',
    text: 'asdf jkl; asdf jkl; fj dk sl a; gh gh asdfgh jkl;gh fjad ksl; asdf jkl;'
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4: Index Finger Expansion (E R U I)',
    targetKeys: ['e', 'r', 'u', 'i'],
    fingerTip: 'Reach Left Middle UP to E | Left Index UP to R | Right Index UP to U | Right Middle UP to I',
    text: 'fde frf jui jki ed rf uj ik red fur irk red fur irk edrf ujik edrf ujik'
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5: Top Row Keys (Q W T Y O P)',
    targetKeys: ['q', 'w', 't', 'y', 'o', 'p'],
    fingerTip: 'Reach UP from Home Row. Return fingers to rest position after every press!',
    text: 'aqa sws ftf jyj kol ;p; top row type quit port wire type port wire'
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6: Bottom Row Keys (Z X C V B N M)',
    targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    fingerTip: 'Reach DOWN from Home Row. Left Pinky to Z | Ring to X | Middle to C | Index to V/B.',
    text: 'aza sxs dcd fvf jmj knk lbl zxc vbn mnb vcx zxcv bnm zxcvbnm'
  },
  {
    id: 'lesson-7',
    title: 'Lesson 7: First Complete Sentences',
    targetKeys: ['all'],
    fingerTip: 'Combine all rows! Keep rhythm steady and do NOT look down at your hands.',
    text: 'the quick brown fox jumps over the lazy dog. practice makes perfect typing skills.'
  }
];

// Speed Test Text Collections
export const TEST_TEXTS = {
  quotes: [
    "The quick brown fox jumps over the lazy dog. Continuous effort, not strength or intelligence, is the key to unlocking our potential.",
    "Mastering touch typing requires patience, correct finger placement, and consistent daily practice. Keep your posture straight and rhythm steady.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Code is like humor. When you have to explain it, it is bad.",
    "Design is not just what it looks like and feels like. Design is how it works. Innovation distinguishes between a leader and a follower."
  ],
  words: [
    "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us",
    "speed accuracy focus finger rhythm home row keyboard muscle memory progress practice fluency keys ergonomics posture consistency master confidence typing exercise lesson level score",
    "developer software code component system interface function dynamic design state component modular structure reactive logic signal render performance compile script stack web application"
  ],
  code: [
    "const calculateWPM = (chars, seconds) => Math.round((chars / 5) / (seconds / 60));",
    "function renderKeyboard({ activeKey, fingerMap }) { return activeKey ? fingerMap[activeKey] : null; }",
    "import React, { useState, useEffect } from 'react'; export default function App() { return <div>Typing Master</div>; }"
  ]
};

// Word Defense Game Enemy Word List
export const DEFENSE_WORDS = [
  "type", "code", "focus", "speed", "key", "shift", "space", "swift", "react", "matte", "logic", "master",
  "touch", "rhythm", "finger", "home", "row", "flash", "cyber", "system", "input", "matrix", "vector", "orbit"
];
