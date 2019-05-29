// keep thread and bead in one table?
// or seperate table?

// case1 : seperate table
let thread = {
  id: 1,
  userId: 1,
  title: "a thread"
};

let bead = {
  id: 1,
  userId: 1,
  title: "a bead",
  content: "blahblah"
};

// case2 : one table
let row_thread = {
  id: 1,
  userId: 1,
  type: "THREAD",
  title: "a thread"
};

let row_bead = {
  id: 2,
  userId: 1,
  type: "BEAD",
  title: "a bead",
  content: "blahblah"
};

// until now, keeping thead and bead in one table is considered to be better solution for the project.

// connect a thread to beads or another threads
let arrow = {
  fromType: "THREAD", // always be thread, maybe
  fromId: 1,
  toType: "BEAD",
  toId: 2,
  order: 0
};

let page = {
  thread: {
    id: 1,
    title: "a thread",
    userId: 1,
    items: [
      // find from arrow table by fromId equal to 1,
      // including bead or thread.
      {
        toType: "BEAD",
        toId: 2,
        order: 0,
        title,
        content,
        userId
      },
      {
        toType: "THREAD",
        toId: 3,
        order: 1,
        title,
        userId,
        // if needed, query once more, from arrow table by fromId equal to 3,
        // including bead or thread.
        items: []
      },
      {
        toType: "BEAD",
        toId: 4,
        order: 2,
        title,
        content,
        userId
      }
    ]
  }
};
