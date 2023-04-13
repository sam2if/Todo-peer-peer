const desc = document.querySelector('.inp');
const lists = document.querySelector('.lists');
const clear = document.querySelector('.clearall');
let complete = false;
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

class Task {
  constructor(desc, complete, index) {
    this.description = desc.value;
    this.complete = false;
    this.index = tasks.length + 1;
  }
}

function removed(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function created(task) {
  const el = document.createElement('div');
  el.innerHTML = `<div class="items">
    <div class="for1">
        <input class="box" type="checkbox" id="vehicle1" name="vehicle1">
        <label class="description" contenteditable>${task.description}</label>
    </div>
    <div class="dots">
    <svg id="edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
      <i class="bi bi-pencil"></i>
      <svg id="trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>
        <svg class="removed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
    </div>
  </div>
  <hr>`;

  const checked = el.querySelector('.box');

  checked.addEventListener('click', () =>  {
    if (checked.checked) {
      task.complete = true;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      task.complete = false;
     localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  })

  const removeBtn = el.querySelector('.removed');
  removeBtn.addEventListener('click', () => {
    const edit = el.querySelector('#edit');
    const trash = el.querySelector('#trash');
    edit.style.display = 'inline-block';
    trash.style.display = 'inline-block';
    removeBtn.style.display = 'none';
    trash.addEventListener('click', () => {
      removed(tasks.indexOf(task));
      el.remove();
    });

    edit.addEventListener('click', () => {
      const descriptionLabel = el.querySelector('.description');
      descriptionLabel.style.border = 'none';
      task.description = descriptionLabel.textContent;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      descriptionLabel.focus();
    });
  });

  const descriptionLabel = el.querySelector('.description');
  descriptionLabel.addEventListener('blur', () => {
    task.description = descriptionLabel.textContent;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  lists.appendChild(el);
}

if (localStorage.getItem('tasks')) {
  tasks.map((task) => {
    created(task);
    return task;
  });
}

function added() {
  let index;
  const obj = new Task(desc, complete, index);

  if (desc.value === '') {
    alert('please add a task');
  } else {
    tasks.push(obj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    created(obj);
    desc.value = '';
    desc.focus();
  }
}

function removeall() {
  tasks = tasks.filter((element, index) => element.complete === false);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.reload();
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

clear.addEventListener('click', removeall);
 

export { tasks, desc, added };


