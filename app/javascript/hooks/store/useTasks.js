import { useSelector } from "react-redux";
import { useTasksActions } from "slices/TasksSlice";
import { STATES } from "presenters/TaskPresenter";

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadColumn } = useTasksActions();
  const loadBoard = async () =>
    await Promise.all(STATES.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
  };
};

export default useTasks;
