import './style.css';
import { added } from './module/add.js';

const addto = document.querySelector('.add');

addto.addEventListener('click', added);