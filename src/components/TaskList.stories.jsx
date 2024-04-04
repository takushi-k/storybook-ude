import TaskList from "./TaskList"
import * as Taskstories from "./Task.stories"
import { Provider } from "react-redux"
import { TasksSlice } from "../lib/store"
import { configureStore } from "@reduxjs/toolkit"

export const MockedState = {
  tasks: [
    { ...Taskstories.Default.args.task, id: "1", title: "Task 1" },
    { ...Taskstories.Default.args.task, id: "2", title: "Task 2" },
    { ...Taskstories.Default.args.task, id: "3", title: "Task 3" },
    { ...Taskstories.Default.args.task, id: "4", title: "Task 4" },
    { ...Taskstories.Default.args.task, id: "5", title: "Task 5" },
    { ...Taskstories.Default.args.task, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null
}

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [
    (story) => (
      <div style={{padding: "3rem"}}>
        {story()}
      </div>
    )
  ],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/
}



const Mockstore = ({taskboxState, children}) => (
  <Provider store={configureStore({
    reducer: {
      taskbox: TasksSlice.reducer,
    },
    preloadedState:{
      taskbox: taskboxState,
    }
  })}>
    {children}
  </Provider>
)


export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
  ]
}

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...MockedState.tasks.slice(0,5),
        {id: 6, title: "Task 6 (pinned)", state: "TASK_PINNED"}
      ];

      return (
        <Mockstore taskboxState={{...MockedState, tasks: pinnedTasks}}>{story()}</Mockstore>
      )
    }
  ]
  // args: {
  //   tasks: [
  //     ...Default.args.tasks.slice(0,5),
  //     {
  //       id: "6",
  //       title: "Task 6 (pinned)",
  //       state: "TASK_PINNED"
  //     }
  //   ]
  // }
}


export const Loading = {
  decorators: [
    (story) =>  (
        <Mockstore taskboxState={{...MockedState, status: "loading"}}>{story()}</Mockstore>
      )
  ]
  // args: {
  //   tasks: [],
  //   loading: true
  // }
}
export const Empty = {
  decorators: [
    (story) =>  (
        <Mockstore taskboxState={{...MockedState, tasks: []}}>{story()}</Mockstore>
      )
  ]
  // args: {
  //   ...Loading.args,
  //   loading: false
  // }
}
