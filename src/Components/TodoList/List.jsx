import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteList, addList, updateList } from '../../app/reduxe/FeaturesSlice/TodoSlice';

const List = () => {
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.todo.items);
    const inputRef = useRef();
    const [error, setError] = useState();

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('todoList')) || [];
        if (storedItems.length > 0) {
            storedItems.forEach(item => dispatch(addList(item.text)));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(items));
    }, [items]);

    const handleAdd = () => {
        if (inputValue.trim() === '') {
            setError('This field is requried !');
            return;
        }
        if (editId) {
            dispatch(updateList({ id: editId, newText: inputValue }));
            setEditId(null);
        } else {
            dispatch(addList(inputValue));
        }
        setInputValue('');
        setError('')
        inputRef.current.focus();
    };

    const handleEdit = (item) => {
        setInputValue(item.text);
        setEditId(item.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteList(id));
    };

    return (
        <div className="container m-auto mt-4" style={{ maxWidth: "400px" }}>
            <h4 className="mb-3 text-center">Add Items</h4>
            <div>
                <div className="input-group mb-1">
                    <input ref={inputRef} type="text" className="form-control" placeholder="Enter item" value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (e.target.value.trim() !== '') {
                                setError('');
                            }
                        }} />
                    <button className="btn btn-success" onClick={handleAdd}>
                        {editId ? 'Update' : 'Add'}
                    </button>
                </div>
                <span className='text-danger fw-bold'>{error}</span>
            </div>

            <ul className="list-group">
                {items.map((item) => (
                    <li key={item.id} className="rounded rounded-3 mt-3 border px-2 list-group-item d-flex justify-content-between align-items-center">
                        {item.text}
                        <div className='d-flex gap-2'>
                            <span className="text-success" onClick={() => handleEdit(item)}><FaEdit /></span>
                            <span className='text-danger' onClick={() => handleDelete(item.id)}><RiDeleteBin6Line /></span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
