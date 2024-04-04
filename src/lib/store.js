import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultTask = [
  {id: "1", title: "Something 1", state: "TASK_INBOX"},
  {id: "2", title: "Something 2", state: "TASK_INBOX"},
  {id: "3", title: "Something 3", state: "TASK_INBOX"},
  {id: "4", title: "Something 4", state: "TASK_INBOX"},
]

const TaskBoxData = {
  tasks: defaultTask,
  status: "idle",
  error: null
}

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
  const data = await response.json();

  console.log(response.status)
  console.log(data)



  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  console.log(result)

  return result;
})

export const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const {id, newTaskState} = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id)
      if(task >= 0){
        state.tasks[task].state = newTaskState;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      console.log("loading!!!!!!!!!!!!!!")
      state.status = "loading";
      state.error = null;
      state.tasks = []
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log("succeeded!!!!!!!!!!!!!!")
      state.status = "succeeded";
      state.error = null;
      state.tasks = action.payload
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      console.log("rejected!!!!!!!!!!!!!!")
      state.status = "failed";
      state.error = "something went wrong";
      state.tasks = []
    });

  }

})

console.log("1111111111111111111111111111111111")
console.log(TasksSlice.actions)
console.log("22222222222222222222222222222222222")

export const {updateTaskState} = TasksSlice.actions



const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  }
})

export default store;
