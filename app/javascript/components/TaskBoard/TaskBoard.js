import React, { useEffect, useState } from "react";
import KanbanBoard from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import AddPopup from "forms/AddPopup";
import EditPopup from "forms/EditPopup";
import TaskForm from "forms/TaskForm";
import TasksRepository from "repositories/TasksRepository";
import Task from "components/Task";
import ColumnHeader from "components/ColumnHeader";

import useTasks from "hooks/store/useTasks";

import useStyles from "./useStyles";

const MODES = {
  ADD: "add",
  EDIT: "edit",
  NONE: "none",
};

const TaskBoard = () => {
  const { board, loadBoard } = useTasks();
  const [boardCards, setBoardCards] = useState([]);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const [mode, setMode] = useState(MODES.NONE);
  useEffect(() => loadBoard(), []);

  const styles = useStyles();

  const loadColumn = async (state, page, perPage) => {
    return TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });
  };

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => {
        return {
          ...prevState,
          [state]: { cards: data.items, meta: data.meta },
        };
      });
    });
  };

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => {
        const { cards } = prevState[state];
        return {
          ...prevState,
          [state]: {
            cards: [...cards, ...data.items],
            meta: data.meta,
          },
        };
      });
    });
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(
      ({ to }) => destination.toColumnId === to
    );
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, {
      task: { state: transition.event },
    })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };
  const handleTaskLoad = (id) => {
    return TasksRepository.show(id).then(({ data: { task } }) => task);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const handleTaskDestroy = (task) => {
    return TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  return (
    <div>
      {mode === MODES.ADD && (
        <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />
      )}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => (
          <Task onClick={handleOpenEditPopup} task={card} />
        )}
        renderColumnHeader={(column) => (
          <ColumnHeader column={column} onLoadMore={loadColumnMore} />
        )}
      >
        {board}
      </KanbanBoard>
      <Fab
        className={styles.addButton}
        color="primary"
        aria-label="add"
        onClick={handleOpenAddPopup}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default TaskBoard;
