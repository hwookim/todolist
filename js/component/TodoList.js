import {EVENT_TYPE, KEY_TYPE} from "../utils/constans.js";

export const TodoList = class {
  constructor({onComplete, onDelete, toggleEdit, onEdit}) {
    this.$todoList = document.querySelector("#todo-list");
    this.completeTodoHandler = onComplete;
    this.deleteTodoHandler = onDelete;
    this.toggleEditingTodoHandler = toggleEdit;
    this.editTodoHandler = onEdit;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.completeTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.deleteTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK,
      this.toggleEditingTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN,
      this.editTodo.bind(this));
  }

  render(items) {
    const template = items.map(item => item.create());
    this.$todoList.innerHTML = template.join("");
  }

  completeTodo(event) {
    const $target = event.target;
    const isComplete = $target.classList.contains("toggle");
    if (isComplete) {
      this.completeTodoHandler(this.getId($target));
    }
  }

  deleteTodo(event) {
    const $target = event.target;
    const isDelete = $target.classList.contains("destroy");
    if (isDelete && confirm("정말 삭제하시겠습니까?")) {
      this.deleteTodoHandler(this.getId($target));
    }
  }

  toggleEditingTodo(event) {
    const $target = event.target;
    const isLabel = $target.classList.contains("label");
    if (isLabel) {
      this.toggleEditingTodoHandler(this.getId($target));
      window.onclick = this.editTodo.bind(this);
    }
  }

  editTodo(event) {
    const $target = event.target;
    const isEdit = $target.classList.contains("edit");
    const isEnter = event.key === KEY_TYPE.ENTER;
    const isESC = event.key === KEY_TYPE.ESC;
    if (isEdit && isEnter) {
      this.editTodoHandler(this.getId($target), $target.value);
      window.onclick = null;
    }
    if (isEdit && isESC) {
      this.editTodoHandler(this.getId($target),
        $target.closest("li").querySelector("label").innerText);
      window.onclick = null;
    }
    if (!isEdit) {
      const $editInput = document.querySelector(".editing .edit");
      this.editTodoHandler(this.getId($editInput),
        $editInput.closest("li").querySelector("label").innerText);
      window.onclick = null;
    }
  }

  getId(target) {
    return target.closest("li").dataset.id;
  }
}