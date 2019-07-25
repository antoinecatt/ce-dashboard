import {useState} from 'react';

export default initialVal => {
    const [val, setVal] = useState(initialVal);
    const handleChange = e => {
        setVal(e.target.value);
    }
    return [val, handleChange]
}

